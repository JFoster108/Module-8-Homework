// import classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// create an array of vehicles
const vehicles: Array<Car | Truck | Motorbike> = [];

// Example vehicles
const defaultCar = new Car(
  Cli.generateVin(),
  "blue",
  "Toyota",
  "Camry",
  2021,
  3000,
  130,
);

const defaultTruck = new Truck(
  Cli.generateVin(),
  "red",
  "Ford",
  "F-150",
  2022,
  7000,
  100,
  15000
);

const motorbikeWheels = [
  new Wheel(17, "Michelin"),
  new Wheel(17, "Michelin"),
];
const defaultMotorbike = new Motorbike(
  Cli.generateVin(),
  "black",
  "Harley Davidson",
  "Sportster",
  2021,
  500,
  125,
  motorbikeWheels
);

// Push default vehicles to array
vehicles.push(defaultCar, defaultTruck, defaultMotorbike);

// Create a new instance of the Cli class
const cli = new Cli(vehicles);

// Start the CLI
cli.startCli();

