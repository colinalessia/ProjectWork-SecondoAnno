import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import Class from '../shared/models/Class';
import Teacher from '../shared/models/Teacher';
import Subject from '../shared/models/Subject';
import Classroom from '../shared/models/Classroom';
import Course from '../shared/models/Course';
import ClassService from '../shared/services/class.service';
import TeacherService from '../shared/services/teacher.service';
import SubjectService from '../shared/services/subject.service';
import ClassroomService from '../shared/services/classroom.service';
import CourseService from '../shared/services/course.service';


@Component({
  selector: 'app-add-class-data',
  templateUrl: './add-class-data.component.html'
})

export class AddClassDataComponent implements OnInit{
  form: FormGroup;
  classes: Array<Class>;
  teachers: Array<Teacher>;
  subjects: Array<Subject>;
  classrooms: Array<Classroom>;
  courses: Array<Course>;

  constructor(
    public fb: FormBuilder,
    private classService: ClassService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private courseService: CourseService,

    
    ) {
    this.form = this.fb.group({
      teachers: [''],
      subjects: [''],
      classrooms: [''],
      courses: ['']
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
    
  submit() {
    var _class = new Class();
    var teacher = new Teacher();
    var classroom = new Classroom();
    var subject = new Subject();
    var course = new Course();

    classroom = this.form.get('classrooms').value;
    teacher = this.form.get('teachers').value;
    subject = this.form.get('subjects').value;
    course = this.form.get('courses').value;

    _class.idTeacher = teacher.idTeacher;
    _class.idSubject = subject.idSubject;
    _class.idClassroom = classroom.idClassroom;
    _class.idCourse = course.idCourse;

    //to do implementare per inserire le date
    _class.startTime = new Date("1/19/2016 11:47:52 AM");
    _class.endTime = new Date("1/19/2016 11:47:52 PM");

    this.classService.save(_class).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
