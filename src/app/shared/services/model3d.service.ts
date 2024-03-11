import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Model3d } from '../models/model3d';

export type CreateModel3dDto = {
  name: string;
  amount: number;
};

@Injectable({
  providedIn: 'root',
})
export class Model3dService {
  private apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  createModel3d(model3dDto: CreateModel3dDto) {
    return this.http.post<{ insertedId: string }>(
      `${this.apiUrl}models/upload`,
      model3dDto
    );
  }

  createFiles(formData: FormData) {
    return this.http.post<{ insertedIds: string[] }>(
      `${this.apiUrl}models/upload/files`,
      formData
    );
  }

  loadModels3d(page: number) {
    return this.http.get<Model3d[]>(`${this.apiUrl}models/${page}`);
  }

  loadModel3dFile(id: string, ext:string){
    
  }
}
