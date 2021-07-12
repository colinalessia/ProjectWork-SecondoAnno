//modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

//models
import Lesson from '../shared/models/Lesson';
import Teacher from '../shared/models/Teacher';

//services
import TeacherService from '../shared/services/teacher.service';
import SubjectService from '../shared/services/subject.service';
import ClassroomService from '../shared/services/classroom.service';
import CourseService from '../shared/services/course.service';
import LessonService from '../shared/services/lesson.service';
import Subject from '../shared/models/Subject';
import Classroom from '../shared/models/Classroom';
import Course from '../shared/models/Course';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { Timezone } from '@syncfusion/ej2-angular-schedule';



@Component({
  selector: 'control-content',
  templateUrl: './add-class-data-form.component.html'
})

export class AddClassDataFormComponent implements OnInit {
  form: FormGroup;
  classes: Array<Lesson>;
  teachers: Array<Teacher>;
  subjects: Array<Subject>;
  classrooms: Array<Classroom>;
  courses: Array<Course>;



  public value: Date;
  @ViewChild('date1', { static: true })
  public myDate1: DateTimePickerComponent;
  public date1: Object = new Date();
  @ViewChild('date2', { static: true })
  public myDate2: DateTimePickerComponent;
  public date2: Object = new Date();

  public startTime = "9:00 AM";
  public endTime = "7:00 PM";
 
  constructor(
    public fb: FormBuilder,
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private courseService: CourseService,


  ) {
    this.value = new Date();
    this.form = this.fb.group({
      teachers: [''],
      subjects: [''],
      classrooms: [''],
      courses: [''],
      startTime: [''],
      endTime: ['']
    })
  }
  ngOnInit() {
    //GET teacher
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data;
      console.log(this.teachers);
    });

    //GET subject
    this.subjectService.getAll().subscribe(data => {
      this.subjects = data;
      console.log(this.subjects);
    });

    //GET classroom
    this.classroomService.getAll().subscribe(data => {
      this.classrooms = data;
      console.log(this.classrooms);
    });

    //GET course
    this.courseService.getAll().subscribe(data => {
      this.courses = data;
      console.log(this.courses);
    });

  }
  public onOpen(args) {
    if ((<any>this.myDate1).popupObject) {
      let elementCollection: any = (<any>this.myDate1).popupObject.element.querySelectorAll(".e-datetimepicker.e-popup .e-list-parent.e-ul li");
      let flag: boolean = true;
      for (var i = 0; i < elementCollection.length; i++) {
        let value: string = elementCollection[i].getAttribute('data-value');
        if (this.startTime === value || this.endTime === value) {
          flag = !flag;
        }
        if (flag) {
          elementCollection[i].remove();
        }
      }
    }
    if ((<any>this.myDate2).popupObject) {
      let elementCollection: any = (<any>this.myDate2).popupObject.element.querySelectorAll(".e-datetimepicker.e-popup .e-list-parent.e-ul li");
      let flag: boolean = true;
      for (var i = 0; i < elementCollection.length; i++) {
        let value: string = elementCollection[i].getAttribute('data-value');
        if (this.startTime === value || this.endTime === value) {
          flag = !flag;
        }
        if (flag) {
          elementCollection[i].remove();
        }
      }
    }
  }
  submit() {
    var lesson = new Lesson();

    lesson.idTeacher = this.form.get('teachers').value;
    lesson.idSubject = this.form.get('subjects').value;
    lesson.idClassroom = this.form.get('classrooms').value;
    lesson.idCourse = this.form.get('courses').value;


    let timezone: Timezone = new Timezone();

    let newStartDate = new Date(this.form.get('startTime').value);
    let startDate = timezone.removeLocalOffset(newStartDate);

    let newEndDate = new Date(this.form.get('endTime').value);
    let EndDate = timezone.removeLocalOffset(newEndDate);

    lesson.startTime = startDate;
    lesson.endTime = EndDate;

    console.log(lesson.startTime);
    this.lessonService.save(lesson).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    alert("Lesson inserted")
    this.form.reset();
  }
}
