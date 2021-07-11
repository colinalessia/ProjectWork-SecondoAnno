import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//models
import User from '../shared/models/User';
//services
import AuthService from '../shared/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styles: [``]
})

export class LoginComponent implements OnInit {
    
  users: Array<User>;
  loginForm: FormGroup;
  retUrl: string = "login";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.retUrl = params.get('retUrl');
        console.log('LoginComponent/ngOnInit ' + this.retUrl);
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.authService.login(this.f.username.value, this.f.password.value)

    console.log('return to ' + this.retUrl);
    if (this.retUrl != null) {
      this.router.navigate([this.retUrl]);
    } else {
      this.router.navigate(['login']);
    }
  }
}
