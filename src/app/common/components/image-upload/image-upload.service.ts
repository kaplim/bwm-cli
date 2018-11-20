import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ImageUrl {
	imageUrl: string;
}

@Injectable()
export class ImageUploadService {

	constructor(private http: HttpClient) {}

	public uploadImage(imageFile: File): Observable<string | any> {
		const formData = new FormData();

		formData.append('image', imageFile);

		return this.http.post<ImageUrl>('/api/v1/image-upload', formData).pipe(
			map(json => {
				//console.log(json.imageUrl);
				return json.imageUrl;
			})
		);
	}
}