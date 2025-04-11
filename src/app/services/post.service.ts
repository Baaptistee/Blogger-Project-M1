import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';

import {POSTS, Post, PostCreateInput} from '../data/post';
import {environment} from '../environment/environment';
@Injectable()
export class PostService {
  constructor(private http: HttpClient) { }
  private postsUrl = `${environment.apiUrl}v1/posts`;

  create(post: PostCreateInput): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(this.postsUrl, post)
      .pipe(
        catchError(this.handleError<Post>('update', post))
      );
  }

  delete(post: Post): Observable<boolean> {
    return this.http.delete<boolean>(`${this.postsUrl}/${post.id}`);
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error); // log to console
      return of(result as T); // fallback value
    };
  }
}
