import { Component, OnInit, Input, ViewChild, ViewEncapsulation }
    from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';

import { Rental } from '../../shared/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import { AuthService } from '../../../auth/shared/auth.service';

@Component({
    encapsulation: ViewEncapsulation.None,
	selector: 'bwm-rental-detail-booking',
	templateUrl: './rental-detail-booking.component.html',
	styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

    dateFormat = 'YYYY/MM/DD';  //'YYYY-MM-DD';

	@Input() rental: Rental;
    @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;

    newBooking: Booking;
    modalRef: any;
    daterange: any = {};
    bookedOutDates: any[] = [];
    errors: any[] = [];

    options: any = {
        locale: { format: this.dateFormat }, //Booking.DATE_FORMAT}
        alwaysShowCalendars: false,
        opens: 'left',
        autoUpdateInput: false,
        isInvalidDate: this.checkForInvalidDates.bind(this)
    };

	constructor(private helper: HelperService,
        private modalService: NgbModal,
        private bookingService: BookingService,
        private toastr: ToastrService,
        private auth: AuthService) { }
    
    ngOnInit() {
        this.newBooking = new Booking();
        this.getBookedOutDates();
    }

    private checkForInvalidDates(date) {
        return this.bookedOutDates.includes(
            this.helper.formatBookingDate(date, this.dateFormat)) ||
            date.diff(moment(), 'days') < 0;
    }

    private getBookedOutDates() {
        const bookings: Booking[] = this.rental.bookings;

        if (bookings && bookings.length > 0) {
            bookings.forEach((booking: Booking) => {
                const dateRange = this.helper.getBookingRangeOfDates(
                    booking.startAt, booking.endAt, this.dateFormat);
                this.bookedOutDates.push(...dateRange);
                //console.log(this.bookedOutDates);
            });
        }
    }

    private addNewBookedDates(bookingData: any) {
        const dateRange = this.helper.getBookingRangeOfDates(
            bookingData.startAt, bookingData.endAt, this.dateFormat);
        this.bookedOutDates.push(...dateRange);
    }

    private resetDatePicker() {
        this.picker.datePicker.setStartDate(moment());
        this.picker.datePicker.setEndDate(moment());
        this.picker.datePicker.element.val('');
    }

    reserveConfirm(content) {
        this.errors = [];
        this.modalRef = this.modalService.open(content);
    }

    onPaymentConfirmed(paymentToken: any) {
        this.newBooking.paymentToken = paymentToken;
    }

    createBooking() {
        this.newBooking.rental = this.rental;

        this.bookingService.createBooking(this.newBooking).subscribe(
            (bookingData: any) => {
                //console.log(bookingData);
                this.addNewBookedDates(bookingData);
                this.newBooking = new Booking();
                this.modalRef.close();
                this.resetDatePicker();
                this.toastr.success('Booking has been successfully created.' +
                    ' Check your booking detail in Manage Section.',
                    'Success!');
            },
            (errorResponse: any) => {
                this.errors = errorResponse.error.errors;
            }
        );
    }

    selectedDate(value: any, datepicker?: any) {
        this.options.autoUpdateInput = true;
        this.newBooking.startAt =
            this.helper.formatBookingDate(value.start, this.dateFormat);
        this.newBooking.endAt =
            this.helper.formatBookingDate(value.end, this.dateFormat);
        this.newBooking.days = value.end.diff(value.start, 'days');
        this.newBooking.totalPrice =
            this.newBooking.days * this.rental.dailyRate;
    }

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }
}
