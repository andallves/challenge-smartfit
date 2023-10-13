import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../interfaces/units-response.interface';
import { Location } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  readonly urlApi = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private filteredUnits$: Observable<Location[]> = this.filteredUnitsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.urlApi).subscribe((data) => {
      this.allUnitsSubject.next(data.locations);
      this.filteredUnitsSubject.next(data.locations);
    });
  }

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  getFilteredUnits(): Observable<Location[]> {
    return this.filteredUnits$;
  }

  setFilteredUnits(value: Location[]) {
    this.filteredUnitsSubject.next(value);
  }
}
