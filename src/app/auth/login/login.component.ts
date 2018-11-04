import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,
	Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'bwm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	errors: any[] = [];
	notifyMessage: string = '';

	constructor(private fb: FormBuilder, private auth: AuthService,
		private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.initForm();

		this.route.params.subscribe((params) => {
			if (params['registered'] === 'success') {
				this.notifyMessage =
					'You have successfully registered, and can login now.';
			}
		})
	}

	initForm() {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern(
				'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
			)]],
			password: ['', Validators.required]
		});
	}

	isInvalidForm(fieldName): boolean {
		return this.loginForm.controls[fieldName].invalid &&
			(this.loginForm.controls[fieldName].dirty ||
			this.loginForm.controls[fieldName].touched);
	}

	login() {
		//console.log(this.loginForm.value);
		this.auth.login(this.loginForm.value).subscribe(
			() => {
				this.router.navigate(['/rentals']);  //, { registered: 'success'}]);
			},
			(errorResponse) => {
				this.errors = errorResponse.error.errors;
			}
		);
	}
}
