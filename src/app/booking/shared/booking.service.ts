import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookingService {

	constructor (private http: HttpClient) {}

	public createBooking(booking: Booking): Observable<Booking> {
		return this.http.post<Booking>('/api/v1/bookings', booking);
	}
}