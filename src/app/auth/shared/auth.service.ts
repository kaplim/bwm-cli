import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
//import * as jwt from 'jsonwebtoken';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
	exp: number = 0;
	username: string = '';
}

@Injectable()
export class AuthService {
	private decodedToken;

	constructor (private http: HttpClient) {
		this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) ||
			new DecodedToken();
	}

	private saveToken(token: string): string {
		//this.decodedToken = jwt.decode(token);
		this.decodedToken = jwt.decodeToken(token);

		localStorage.setItem('bwm_auth', token);
		localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

		return token;
	}

	private getExpiration() {
		return moment.unix(this.decodedToken.exp);
	}

	public register(userData: any): Observable<any> {
		return this.http.post('/api/v1/users/register', userData);
	}

	public login(userData: any): Observable<any> {
		return this.http.post('/api/v1/users/auth', userData).pipe(
			map((token: any) => { return this.saveToken(token) })
		);
	}

	public logout() {
		localStorage.removeItem('bwm_auth');
		localStorage.removeItem('bwm_meta');

		this.decodedToken = new DecodedToken();
	}

	public getUsername() {
		return this.decodedToken.username;
	}

	public getUserId() {
		return this.decodedToken.userId;
	}

	public isAuthenticated(): boolean {
		return moment().isBefore(this.getExpiration());
	}

	public getAuthToken() {
		return localStorage.getItem('bwm_auth');
	}
}