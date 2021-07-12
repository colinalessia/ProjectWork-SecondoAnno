import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { of } from 'rxjs';
//models
import User from '../models/User';
//services
import UserService from '../services/user.service';

@Injectable()
export default class AuthService { 
 
  private isloggedIn: boolean;
  private userRole: string;
  users: Array<User>;

  constructor(private userService: UserService) {
    this.isloggedIn=false;
  }
 
  login(userEmail: string, userPassword:string) {
  
    this.userService.getAll().subscribe(data => {
      this.users = data;
      console.log(this.users);
      for (let user of this.users) {
        if (user.userEmail == userEmail && user.userPassword == userPassword) {
          if (user.userRole == "admin") {
            alert("Admin permissions unlocked")
            this.isloggedIn = true;
            this.userRole = user.userRole;
            return of(this.isloggedIn);
          }
          
        }
      }
    });
        
  }
 
  isUserLoggedIn(): boolean {
      return this.isloggedIn;
  }
 
  isAdminUser(): boolean {
    if (this.userRole == 'admin') {
      return true; 
    }
    return false;
  }
    
  logoutUser(): void{
      this.isloggedIn = false;
  }
} 
