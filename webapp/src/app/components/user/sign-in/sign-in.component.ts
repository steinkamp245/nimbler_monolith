import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  submitClicked = false;

  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.email])],
    password: ['', Validators.required]
  });

  onSubmit() {
    this.submitClicked = true;
    console.log(this.loginForm.value);
  }

  constructor(private fb: FormBuilder, private userService: UserService) { }


  facebookSignInClicked() {
    this.userService.socialSignIn('facebook');
  }


  googleSignInClicked() {
    this.userService.socialSignIn('google');
  }

}
