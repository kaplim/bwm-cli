import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../../booking/shared/booking.model';

@Component({
	selector: 'bwm-manage-rental-booking',
	templateUrl: './manage-rental-booking.component.html',
	styleUrls: ['./manage-rental-booking.component.scss']
})
export class ManageRentalBookingComponent implements OnInit {

	@Input() bookings: Booking[];
	modalRef: any;

	constructor(private modalService: NgbModal) { }

	ngOnInit() {
	}
    
    showBookings(bookingModal) {
        this.modalRef = this.modalService.open(bookingModal);
    }
}
