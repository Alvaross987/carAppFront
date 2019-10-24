import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Car } from "./car";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    
    const cars: Car[] = [
      { id: 1, name: 'car1', country: 'Spain', brand: 'bmw', registration: new Date('2019-01-01')},
      { id: 2, name: 'car2', country: 'Russia', brand: 'toyota', registration: new Date('2019-02-02')},
      { id: 3, name: 'car3', country: 'Germany', brand: 'audi', registration: new Date('2019-03-03')},
      { id: 4, name: 'car4', country: 'Spain', brand: 'audi', registration: new Date('2019-04-04')}
    ];
    return {cars};
  }

  genId(cars: Car[]): number {
  return cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1;
}
}

