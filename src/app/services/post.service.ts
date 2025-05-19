import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Post, PostCreateInput } from '../data/post';
import { environment } from '../environment/environment';

@Injectable()
export class PostService {
  private postsUrl = `${environment.apiUrl}v1/posts`;

  constructor(private http: HttpClient) {}

  create(post: PostCreateInput): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
      map(posts => posts.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()))
    );
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(this.postsUrl, post).pipe(
      catchError(this.handleError<Post>('update', post))
    );
  }

  delete(post: Post): Observable<boolean> {
    return this.http.delete<boolean>(`${this.postsUrl}/${post.id}`);
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return of(result as T);
    };
  }
}
