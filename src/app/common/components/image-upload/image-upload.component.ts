import { Component, EventEmitter, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ImageUploadService } from './image-upload.service';
import { ToastrService } from 'ngx-toastr';

class FileSnippet {
	static readonly IMAGE_SIZE = { width: 950, height: 720 };
	
	pending: boolean = false;
	status: string = 'INIT';

	constructor(public src: string, public file: File) {}
}

@Component({
	selector: 'bwm-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

	@Output() imageUploaded = new EventEmitter();
	@Output() imageError = new EventEmitter();
	@Output() imageLoadedToContainer = new EventEmitter();
	@Output() croppingCancelled = new EventEmitter();

	selectedFile: FileSnippet;
	imageChangedEvent: any;

	constructor(private imageService: ImageUploadService,
		private toastr: ToastrService) { }

	private onSuccess(imageUrl: string) {
		this.selectedFile.pending = false;
		this.selectedFile.status = 'OK';
		this.imageChangedEvent = null;
		this.imageUploaded.emit(imageUrl);
	}

	private onFail() {
		this.selectedFile.pending = false;
		this.selectedFile.status = 'FAIL';
		this.imageChangedEvent = null;
		this.imageError.emit('');
	}

	imageLoaded() {
		this.imageLoadedToContainer.emit();
	}

	cancelCropping() {
		this.imageChangedEvent = null;
		this.croppingCancelled.emit();
	}

	 // imageCropped(file: File): File | FileSnippet {
		// if (this.selectedFile) {
		// 	return this.selectedFile.file = file;
		// }

		// return this.selectedFile.file = new FileSnippet('', file);
	 // }

	imageCropped(event: any) {
		// console.log(event);
		this.selectedFile = new FileSnippet(event.base64, event.file);
	}

	processFile(event: any) {
		this.selectedFile = undefined;

		const URL = window.URL;
		let file, img;

		if ((file = event.target.files[0]) &&
			(file.type === 'image/png' || file.type === 'image/jpeg')) {
			img = new Image();

			const self = this;
			img.onload = function() {
				if (this.width > FileSnippet.IMAGE_SIZE.width &&
					this.height > FileSnippet.IMAGE_SIZE.height) {
					self.imageChangedEvent = event;
				}
				else {
					const w = FileSnippet.IMAGE_SIZE.width.toString();
					const h = FileSnippet.IMAGE_SIZE.height.toString();
	                self.toastr.error('Minimum width is ' + w +
	                	'. Minimum height is ' + h + '.', 'Error!');
				}
			}
			img.src = URL.createObjectURL(file);
		}
		else {
            this.toastr.error(
            	'Unsupported file type. Only JPEG or PNG type is allowed.',
                'Error!');
		}
	}

	uploadImage() {
		if (this.selectedFile) {
			const reader = new FileReader();

			reader.addEventListener('load', (event: any) => {
				//this.selectedFile.src = event.target.result;

				this.selectedFile.pending = true;
				this.imageService.uploadImage(this.selectedFile.file).subscribe(
					(imageUrl: string) => {
						//console.log(imageUrl);
						this.onSuccess(imageUrl);
					},
					(errorResponse: HttpErrorResponse) => {
						this.toastr.error(errorResponse.error.errors[0].detail,
							'Error!');
						this.onFail();
					});
			});

			reader.readAsDataURL(this.selectedFile.file);
		}
	}
}
