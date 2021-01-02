import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { user } from './user.model';



export interface AuthresponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  // user = new Subject<user>();
  // token: string = null;
  user = new BehaviorSubject<user>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {

    return this.http.post<AuthresponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo5sK1scpb4Mm79XAXzmaSyowzraoq3m4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn);
    }));

  }

  login(email: string, password: string) {
    return this.http.post<AuthresponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo5sK1scpb4Mm79XAXzmaSyowzraoq3m4',
    {
      email: email,
      password: password,
      returnSecireToken: true
    }
    ).pipe(catchError(this.handleError));;
  }

  private handleAuthentication(email: string, userId: string,token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime()+ expiresIn *1000);
      const User = new user(email, userId, token, expirationDate);
      this.user.next(User);
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured'
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
        case'EMAIL_EXITS':
          errorMessage = 'This email exists already';
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later';
          break;
    }
    return throwError(errorMessage);
  }

}
