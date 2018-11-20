import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ImageUploadComponent } from './image-upload.component';
import { ImageUploadService } from './image-upload.service';

@NgModule({
  declarations: [
    ImageUploadComponent
  ],
  exports: [
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ImageCropperModule
  ],
  providers: [ImageUploadService]
})
export class ImageUploadModule { }