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
}