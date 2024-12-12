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
  []
);

const defaultTruck = new Truck(
  Cli.generateVin(),
  "red",
  "Ford",
  "F-150",
  2022,
  7000,
  100,
  [],
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

// Updated CLI class (CLI.ts)
class Cli {
  private vehicles: Array<Car | Truck | Motorbike>;

  constructor(vehicles: Array<Car | Truck | Motorbike>) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  startCli(): void {
    console.log("Welcome to the Vehicle Management CLI!");
    this.mainMenu();
  }

  async mainMenu(): Promise<void> {
    const prompt = require("prompt-sync")();
    let exit = false;

    while (!exit) {
      console.log("\nMain Menu:");
      console.log("1. Create a New Vehicle");
      console.log("2. Select an Existing Vehicle");
      console.log("3. Exit");

      const choice = prompt("Choose an option: ");
      switch (choice) {
        case "1":
          await this.createVehicle();
          break;
        case "2":
          await this.selectVehicle();
          break;
        case "3":
          exit = true;
          console.log("Goodbye!");
          break;
        default:
          console.log("Invalid choice. Please try again.");
      }
    }
  }

  async createVehicle(): Promise<void> {
    const prompt = require("prompt-sync")();
    console.log("\nVehicle Types: 1. Car 2. Truck 3. Motorbike");
    const type = prompt("Select the type of vehicle to create: ");

    const vin = Cli.generateVin();
    const color = prompt("Enter the vehicle color: ");
    const make = prompt("Enter the vehicle make: ");
    const model = prompt("Enter the vehicle model: ");
    const year = parseInt(prompt("Enter the vehicle year: "));
    const weight = parseInt(prompt("Enter the vehicle weight: "));
    const maxSpeed = parseInt(prompt("Enter the vehicle max speed: "));

    let vehicle;
    switch (type) {
      case "1": // Car
        vehicle = new Car(vin, color, make, model, year, weight, maxSpeed, []);
        break;
      case "2": // Truck
        const cargoCapacity = parseInt(prompt("Enter the cargo capacity: "));
        vehicle = new Truck(vin, color, make, model, year, weight, maxSpeed, [], cargoCapacity);
        break;
      case "3": // Motorbike
        const wheelSize = parseInt(prompt("Enter the wheel size: "));
        const wheels = [new Wheel(wheelSize, "Default"), new Wheel(wheelSize, "Default")];
        vehicle = new Motorbike(vin, color, make, model, year, weight, maxSpeed, wheels);
        break;
      default:
        console.log("Invalid type. Returning to main menu.");
        return;
    }

    this.vehicles.push(vehicle);
    console.log("Vehicle created successfully!");
  }

  async selectVehicle(): Promise<void> {
    const prompt = require("prompt-sync")();
    console.log("\nSelect an Existing Vehicle:");

    if (this.vehicles.length === 0) {
      console.log("No vehicles available. Create a new vehicle first.");
      return;
    }

    this.vehicles.forEach((vehicle, index) => {
      console.log(`${index + 1}. ${vehicle.make} ${vehicle.model} (${vehicle.year})`);
    });

    const choice = parseInt(prompt("Enter the number of the vehicle to select: ")) - 1;
    if (choice >= 0 && choice < this.vehicles.length) {
      const selectedVehicle = this.vehicles[choice];
      console.log(`You selected: ${selectedVehicle.make} ${selectedVehicle.model}`);
      await this.performAction(selectedVehicle);
    } else {
      console.log("Invalid selection. Returning to main menu.");
    }
  }

  async performAction(vehicle: Car | Truck | Motorbike): Promise<void> {
    const prompt = require("prompt-sync")();
    console.log("\nActions: 1. Start 2. Stop 3. Honk");
    const action = prompt("Select an action: ");

    switch (action) {
      case "1":
        console.log(`${vehicle.make} ${vehicle.model} is now running.`);
        break;
      case "2":
        console.log(`${vehicle.make} ${vehicle.model} is now stopped.`);
        break;
      case "3":
        console.log(`${vehicle.make} ${vehicle.model} honked its horn!`);
        break;
      default:
        console.log("Invalid action.");
    }
  }
}

