import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updatedRequest = this.setUpdatedRequest(request);

    console.log('Before making API call', updatedRequest)

    return next.handle(updatedRequest).pipe(
      tap(
        (event) => {
          // Log HTTP response in case of success
          if (event instanceof HttpResponse) {
            console.log('API call success: ', event)
          }
        },
        (error) => {
          // Log HTTP response in case of error
          if (error instanceof HttpResponse) {
            console.log('API call error: ', error);
          }
        }
      )
    );
  }

  setUpdatedRequest(request: HttpRequest<any>) {
    return request.clone(
      {
        setHeaders: {
          Authorization: "My authorization"
        }
      }
    );
  }
}
