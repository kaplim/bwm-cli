import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService {

	constructor (private http: HttpClient) {}

	public getRentals(): Observable<Rental[]> {
		return this.http.get<Rental[]>('/api/v1/rentals');
	// public getRentals(): Observable<any> {  //<Rental[]> {
	// 	return this.http.get('localhost:3001/api/v1/rentals');
	}

	public getRentalById(rentalId: string): Observable<Rental> {
		return this.http.get<Rental>('/api/v1/rentals/' + rentalId);
	// public getRentalById(rentalId: string): Observable<any> {  //<Rental> {
	// 	return this.http.get('localhost:3001/api/v1/rentals/' + rentalId);
	}

	public getRentalsByCity(city: string): Observable<Rental[]> {
		return this.http.get<Rental[]>(`/api/v1/rentals?city=${city}`);
	}

	public createRental(rental: Rental): Observable<Rental> {
		return this.http.post<Rental>('/api/v1/rentals', rental);
	}

	public getUserRentals(): Observable<Rental[]> {
		return this.http.get<Rental[]>('/api/v1/rentals/manage');
	}

	public deleteRental(rentalId: string): Observable<any> {
		return this.http.delete(`/api/v1/rentals/${rentalId}`);
	}

	public updateRental(rentalId: string, rentalData: any): Observable<Rental> {
		return this.http.patch<Rental>(`/api/v1/rentals/${rentalId}`, rentalData);
	}

	public verifyRentalUser(rentalId: string): Observable<boolean> {
		return this.http.get<boolean>(`/api/v1/rentals/${rentalId}/verify-user`);
	}
}