import { Component, OnInit } from '@angular/core';

import { PaymentService } from '../../payment/shared/payment.service';
import { BookingService } from '../../booking/shared/booking.service';
import { Booking } from '../../booking/shared/booking.model';

@Component({
	selector: 'bwm-manage-booking',
	templateUrl: './manage-booking.component.html',
	styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

	bookings: Booking[];
	payments: any[];

	constructor(private bookingService: BookingService,
		private paymentService: PaymentService) { }

	ngOnInit() {
		this.bookingService.getUserBookings().subscribe(
			(bookings: Booking[]) => {
				this.bookings = bookings;
				//console.log(this.bookings);
			},
			() => {

			});

		this.getPendingPayments();
	}

	getPendingPayments() {
		this.paymentService.getPendingPayments().subscribe(
			(payments: any) => {
				console.log(payments);
				this.payments = payments;
			},
			() => {

			});
	}

	acceptPayment(payment) {
		this.paymentService.acceptPayment(payment).subscribe(
			(json) => {
				//console.log(json);
				payment.status = 'paid';
			},
			(err) => {}
		);
	}

	declinePayment(payment) {
		this.paymentService.declinePayment(payment).subscribe(
			(json) => {
				payment.status = 'declined';
			},
			(err) => {}
		);
	}
}
