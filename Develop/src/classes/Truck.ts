import Vehicle from "./Vehicle.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";

class Truck extends Vehicle {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  towingCapacity: number;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    towingCapacity: number
  ) {
    super();
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;
  }

  overrideprintDetails(): void {
    super.printDetails();
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
  }

  tow(vehicle: Car | Motorbike): void {
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`Towing ${vehicle.make} ${vehicle.model}...`);
    } else {
      console.log(`Cannot tow ${vehicle.make} ${vehicle.model}. Exceeds capacity.`);
    }
  }
}

export default Truck;

