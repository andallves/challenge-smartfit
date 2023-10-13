import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from './interfaces/location.interface';
import { GetUnitsService } from './services/get-units.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService) {}

  onSubmit() {
    this.unitService.getFilteredUnits().subscribe(
      units => this.unitsList = units
    );
    this.showList.next(true);
  }
}
