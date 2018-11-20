import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
	selector: 'bwm-rental-create',
	templateUrl: './rental-create.component.html',
	styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

	newRental: Rental;
	rentalCategories = Rental.CATEGORIES;
	errors: any[] = [];

	constructor(private rentalService: RentalService,
		private router: Router) { }

	ngOnInit() {
		this.newRental = new Rental();
		this.newRental.shared = false;
	}

	handleImageUpload(imageUrl: string) {
		this.newRental.image = imageUrl;
	}

	handleImageError() {
		this.newRental.image = '';  //undefined;
	}

	createRental() {
		//console.log(this.newRental);
		this.rentalService.createRental(this.newRental).subscribe(
			(rental: Rental) => {
				//console.log(rental);
				this.router.navigate([`/rentals/${rental._id}`]);
			},
			(errorResponse: HttpErrorResponse) => {
				this.errors = errorResponse.error.errors;
			});
	}
}
