import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'bwm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private auth: AuthService) { }

  logout() {
  	this.auth.logout();
  	this.router.navigate(['/login']);
  }

  isAuthenticated() {
  	return this.auth.isAuthenticated();
  }
}
