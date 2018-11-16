import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { RentalService } from './rental.service';

@Injectable()
export class RentalGuard implements CanActivate {

	constructor(private router: Router,
		private rentalService: RentalService) {}

	canActivate(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> {

		const rentalId: string = route.params.rentalId;

		return this.rentalService.verifyRentalUser(rentalId).pipe(
			map(() => {
				//console.log('user true');
				return true;
			}),
			catchError(() => {
				//console.log('user false');
				this.router.navigate(['/rentals']);
				return of(false);
			}) );
	}
}