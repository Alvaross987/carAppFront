import { Brand } from './brand';
import { Country } from './country';


export class Car {
    id: number;
    brand: Brand;
    country: Country;
    registration: Date;
    color: String;
    model: String;
    carsComponents: String[];

}
