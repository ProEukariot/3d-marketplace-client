import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
})
export class ModelDetailsComponent implements OnInit {
  public id!: string;
  private apiUrl = environment.apiUrl;
  public modelUrl!: string;
  public data!:Blob;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.modelUrl = `${this.apiUrl}models/download/${this.id}/file`;
  }
}
