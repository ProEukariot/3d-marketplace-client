import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntercextionListenerDirective } from 'src/app/shared/directives/intercextion-listener.directive';
import { Model3d } from 'src/app/shared/models/model3d';
import { Model3dService } from 'src/app/shared/services/model3d.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  page = 1;
  uploadedModels: Model3d[] = [];

  isFetching: boolean = false;

  @ViewChild(IntercextionListenerDirective)
  intercextionListenerDirective!: IntercextionListenerDirective;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly models3dService: Model3dService
  ) {}

  ngOnInit(): void {
    this.models3dService.loadUsersModels3d(this.page).subscribe((items) => {
      this.uploadedModels = items;
    });
  }

  onCardClick(id: string) {
    this.router.navigate(['explore', id]);
  }

  onScroll() {
    this.isFetching = true;
    this.models3dService.loadModels3d(++this.page).subscribe((items) => {
      this.uploadedModels.push(...items);
      this.isFetching = false;

      if (items.length < 1) {
        this.intercextionListenerDirective.unsubscribe();
      }
    });
  }
}
