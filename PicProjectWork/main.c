/*
 * File:   main.c
 * Author: Lorenzo Canton
 *
 * Created on 30 giugno 2021, 11.31
 */


// DEVCFG3
#pragma config USERID = 0xFFFF          // Enter Hexadecimal value (Enter Hexadecimal value)

// DEVCFG2
#pragma config FPLLIDIV = DIV_2         // PLL Input Divider (2x Divider)
#pragma config FPLLMUL = MUL_20         // PLL Multiplier (20x Multiplier)
#pragma config UPLLIDIV = DIV_12        // USB PLL Input Divider (12x Divider)
#pragma config UPLLEN = OFF             // USB PLL Enable (Disabled and Bypassed)
#pragma config FPLLODIV = DIV_1         // System PLL Output Clock Divider (PLL Divide by 1)

// DEVCFG1
#pragma config FNOSC = PRIPLL           // Oscillator Selection Bits (Primary Osc w/PLL (XT+,HS+,EC+PLL))
#pragma config FSOSCEN = ON             // Secondary Oscillator Enable (Enabled)
#pragma config IESO = ON                // Internal/External Switch Over (Enabled)
#pragma config POSCMOD = HS             // Primary Oscillator Configuration (HS osc mode)
#pragma config OSCIOFNC = ON            // CLKO Output Signal Active on the OSCO Pin (Enabled)
#pragma config FPBDIV = DIV_8           // Peripheral Clock Divisor (Pb_Clk is Sys_Clk/8)
#pragma config FCKSM = CSDCMD           // Clock Switching and Monitor Selection (Clock Switch Disable, FSCM Disabled)
#pragma config WDTPS = PS1048576        // Watchdog Timer Postscaler (1:1048576)
#pragma config FWDTEN = OFF             // Watchdog Timer Enable (WDT Disabled (SWDTEN Bit Controls))

// DEVCFG0
#pragma config DEBUG = OFF              // Background Debugger Enable (Debugger is disabled)
#pragma config ICESEL = ICS_PGx2        // ICE/ICD Comm Channel Select (ICE EMUC2/EMUD2 pins shared with PGC2/PGD2)
#pragma config PWP = OFF                // Program Flash Write Protect (Disable)
#pragma config BWP = OFF                // Boot Flash Write Protect bit (Protection Disabled)
#pragma config CP = OFF                 // Code Protect (Protection Disabled)

#include <xc.h>
#include <sys/attribs.h>

#define FunctionSet8Bit_CMD 0x3C //8bit mode, 2 lines, 5x8 font
#define FunctionSet4Bit_CMD 0x2C //4bit mode, 2 lines, 5x8 font
#define SetDisplay_CMD 0x0C //Display ON, cursor off, cursor blinking off
#define EntryModeSet_CMD 0x06 //Write left to right, entire display shift off
#define Clear_CMD 0x01
#define ShiftCursorLeft_CMD 0x10
#define ShiftCursorRight_CMD 0x14
#define ShiftDisplayLeft_CMD 0x18
#define ShiftDisplayRight_CMD 0x1C
#define Row1_CMD 0x80
#define Row2_CMD 0xC0
#define Row3_CMD 0x90
#define Row4_CMD 0xD0

#define ADDR 2

char count = 0;
char i = 0;
char k = 0;
char length;
char temp;
char temp2[5];

char data[200];
char pos = 0;
char aula[5];
char docente[20];
char materia[50];
char durata[5];

char rec = 0;
char second = 0;
int minutes = 0;

void initUart();
void initTimer3();
void split();
void convert();
void printAll();
void freeClass();
void delay();
void printString(char *str);
void goToRow(char n);
void initLCD();
void clearLCD();
void sendCommand(char rs, char rw, char db7, char db6, char db5, char db4);
void sendConfig(char databits);
void sendConfigSinglePulse(char databits);
void sendLetter(char databits);
void pulseE();

void main(void) {
    initTimer3();
    initUart();
    initLCD();
    
    freeClass();
        
    while(1){
        if(rec){
            split();
            printAll();
            rec = 0;
        }
    }
    return;
}

void delay(unsigned long int n)
{
    unsigned long int x = 2000;
    while(n--)
    {
        int x;
        for(x = 0; x < 2000; x++);
    }
}

void initUart(){
    
    TRISDbits.TRISD6 = 0;
    LATDbits.LATD6 = 0;
    
    U1BRG = 65;
    
    U1MODEbits.PDSEL = 0;
    U1MODEbits.STSEL = 0;
    
    IEC0bits.U1RXIE = 1;
    IPC6bits.U1IP = 7;
    IPC6bits.U1IS = 0;
    U1STAbits.URXISEL = 0;
    
    U1STAbits.URXEN = 1;
    U1MODEbits.ON = 1;
    
    INTCONSET = _INTCON_MVEC_MASK;
    __builtin_enable_interrupts();
}

void initTimer3(){
    T3CONbits.TON = 0;                  
    T3CONbits.TCKPS = 7;                
    
    PR3 = 39062;                       
    TMR3 = 0;                           
    
    IPC3bits.T3IP = 7;                  
                                      
    IFS0bits.T3IF = 0;
    IEC0bits.T3IE = 1;
}

void __ISR(_UART_1_VECTOR, IPL7SRS) UartInterrupt(void){
    
    temp = U1RXREG;
    data[count] = temp;
    count++;
    if(temp == '$'){
        rec = 1;
        length = count;
        count = 0;
        T3CONbits.TON = 1;
    }
    
    IFS0bits.U1RXIF = 0;  
}

void __ISR(_TIMER_3_VECTOR, IPL7SRS) T3Interrupt(void){
    if(second == 60){
        minutes--;
        printAll();
        second = 0;
        if(minutes == 0){
            freeClass();
            T3CONbits.TON = 0;
        }
    }
    
    second++;
    IFS0bits.T3IF = 0;
}

void split(){
    for(i = 0; i < length-1; i++){
        switch (pos)
        {
            case 0:
                if(data[i] == '*'){
                    pos++;
                    aula[k] = '\0'; 
                    k = 0;
                } else{
                    aula[k] = data[i];
                    k++;
                }
                break;
            case 1:
               if(data[i] == '*'){
                    pos++;
                    docente[k] = '\0'; 
                    k = 0;
                } else{
                    docente[k] = data[i];
                    k++;
                }
                break;
            case 2:
                if(data[i] == '*'){
                    pos++;
                    materia[k] = '\0'; 
                    k = 0;
                } else{
                    materia[k] = data[i];
                    k++;
                }
                break;
            case 3:
                durata[k] = data[i];
                k++;
                break;    
        }   
    }
    convert(durata);
    pos = 0;
    k = 0;
}

void printAll(){
    clearLCD();
    printString("Aula: ");
    printString(aula);
    goToRow(2);
    printString(docente);
    goToRow(3);
    printString(materia);
    goToRow(4);
    printString("Scadenza: ");
    itoa(temp2, minutes, 10);
    printString(temp2);
    printString("min");
}

void convert(char *arr[]){
    minutes = arr[0] - '0';
    minutes *= 60;
}

void freeClass(){
    clearLCD();
    goToRow(1);
    printString("AULA LIBERA");
}

void initLCD(){
    TRISD = 0x00;
    TRISB = 0x00;
    PORTD = 0;
    PORTB = 0;
    
    delay(500);
    
    sendConfigSinglePulse(FunctionSet8Bit_CMD>>4);
    sendConfigSinglePulse(FunctionSet8Bit_CMD>>4);
    sendConfigSinglePulse(FunctionSet8Bit_CMD>>4);
    sendConfigSinglePulse(FunctionSet4Bit_CMD>>4);
    
    sendConfig(FunctionSet4Bit_CMD);
    
    sendConfig(SetDisplay_CMD);
    
    sendConfig(EntryModeSet_CMD);
    
    sendConfig(Clear_CMD);
}

void sendByte(char a, char b, char c, char d, char e, char f, char g, char h){
    sendCommand(1,0,a,b,c,d);
    sendCommand(1,0,e,f,g,h);
}

void sendCommand(char rs, char rw, char db7, char db6, char db5, char db4){
    PORTD = 0;
    PORTB = 0;
    PORTDbits.RD4 = rs;
    PORTDbits.RD5 = rw;
    PORTDbits.RD6 = db7;
    PORTDbits.RD7 = db6;
    PORTDbits.RD8 = db5;
    PORTDbits.RD11 = db4;
    pulseE();
    if(rs == 1)
        delay(1);
    else
        delay(5);
    return;
}

void sendConfig(char databits){
    sendCommand(0, 0, databits>>7&1, databits>>6&1, databits>>5&1, databits>>4&1);
    sendCommand(0, 0, databits>>3&1, databits>>2&1, databits>>1&1, databits&1);
}

void sendConfigSinglePulse(char databits){
    sendCommand(0, 0, databits>>3&1, databits>>2&1, databits>>1&1, databits&1);
}

void sendLetter(char databits){
    sendCommand(1, 0, databits>>7&1, databits>>6&1, databits>>5&1, databits>>4&1);
    sendCommand(1, 0, databits>>3&1, databits>>2&1, databits>>1&1, databits&1);
}

void goToRow(char n){
    switch(n){
        case 1: sendConfig(Row1_CMD);
                break;
        case 2: sendConfig(Row2_CMD);
                break;
        case 3: sendConfig(Row3_CMD);
                break;
        case 4: sendConfig(Row4_CMD);
                break;
        default: break;
    }
}

void clearLCD(){
    sendConfig(Clear_CMD);
}

void printString(char *str){
    char i = 0;
    while (str[i] != '\0') {
        sendLetter(str[i]);
        i++;
    }
}

void pulseE(){
    delay(5);
    PORTBbits.RB14 = 0;
    delay(5);
    PORTBbits.RB14 = 1;
    delay(5);
    PORTBbits.RB14 = 0;
    
    return;
}