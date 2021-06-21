//modules
import { Component, OnInit } from '@angular/core';
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

  constructor(
    public fb: FormBuilder,
    private lessonService: LessonService,
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
    var lesson = new Lesson();

    lesson.idTeacher = this.form.get('teachers').value;
    lesson.idSubject = this.form.get('subjects').value;
    lesson.idClassroom = this.form.get('classrooms').value;
    lesson.idCourse = this.form.get('courses').value;

    //to do implementare per inserire le date
    lesson.startTime = new Date("1/19/2016 11:47:52 AM");
    lesson.endTime = new Date("1/19/2016 11:47:52 PM");

    this.lessonService.save(lesson).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
