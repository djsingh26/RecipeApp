import { ViewContainerRef } from '@angular/core';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';

import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective

  constructor(private authService: AuthService
            , private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver
              ) {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
      // this.authService.login(email, password).subscribe(
      //   resData => {
      //     console.log(resData);
      //     this.isLoading = false;
      //   },
      //   errorMessage => {
      //     console.log(errorMessage);
      //     this.error = errorMessage;
      //     this.isLoading = false;
      //   }
      // );
    } else {
      authObs = this.authService.signup(email, password);

    // this.authService.signup(email,password).subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     // switch(errorRes.error.error.message) {
    //     //   case 'EMAIL_EXISTS':
    //     //     this.error = 'The email address is already in use by another account.';
    //     //     break;
    //       // case 'OPERATION_NOT_ALLOWED':
    //       //   this.error = 'Password sign-in is disabled for this project.';
    //       //   break;
    //       // case 'TOO_MANY_ATTEMPTS_TRY_LATER':
    //       //   this.error = 'We have blocked all requests from this device due to unusual activity. Try again later';
    //       //   break;
    //     // }
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    )


    form.reset();
  }

  onHandleError() {
    this.error = null;
  }


  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
      );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    hostViewContainerRef.createComponent(alertCmpFactory)
  }


}
