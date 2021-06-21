import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Lesson from '../models/Lesson';


export default class LessonService {
  public lessonUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.lessonUrl = this.baseUrl + 'api/Lessons';
  }

  getAll(): Observable<Array<Lesson>> {
    return this.http.get<Array<Lesson>>(this.lessonUrl);
  }

  get(id: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.lessonUrl}/${id}`);
  }

  save(lesson: Lesson): Observable<Lesson> {
    let result: Observable<Lesson>;
    if (lesson.idLesson) {
      result = this.http.put<Lesson>(
        `${this.lessonUrl}/${lesson.idLesson}`,
        lesson
      );
    } else {
      result = this.http.post<Lesson>(this.lessonUrl, lesson);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.lessonUrl}/${id.toString()}`);
  }
}
