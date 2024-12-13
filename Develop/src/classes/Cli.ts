// Import required modules and classes
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  startCli(): void {
    console.log("Welcome to the Vehicle Management CLI!");
    this.mainMenu();
  }

  async mainMenu(): Promise<void> {
    let exit = false;
    while (!exit) {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "menuOption",
          message: "Choose an option:",
          choices: [
            "Create a New Vehicle",
            "Select an Existing Vehicle",
            "Exit",
          ],
        },
      ]);

      switch (answers.menuOption) {
        case "Create a New Vehicle":
          await this.createVehicle();
          break;
        case "Select an Existing Vehicle":
          await this.selectVehicle();
          break;
        case "Exit":
          exit = true;
          console.log("Goodbye!");
          break;
      }
    }
  }

  async createVehicle(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "vehicleType",
        message: "Select the type of vehicle to create:",
        choices: ["Car", "Truck", "Motorbike"],
      },
    ]);

    switch (answers.vehicleType) {
      case "Car":
        await this.createCar();
        break;
      case "Truck":
        await this.createTruck();
        break;
      case "Motorbike":
        await this.createMotorbike();
        break;
    }
  }

  async createCar(): Promise<void> {
    const answers = await inquirer.prompt([
      { type: "input", name: "color", message: "Enter color:" },
      { type: "input", name: "make", message: "Enter make:" },
      { type: "input", name: "model", message: "Enter model:" },
      { type: "input", name: "year", message: "Enter year:" },
      { type: "input", name: "weight", message: "Enter weight (lbs):" },
      { type: "input", name: "topSpeed", message: "Enter top speed (mph):" },
    ]);

    const car = new Car(
      Cli.generateVin(),
      answers.color,
      answers.make,
      answers.model,
      parseInt(answers.year),
      parseInt(answers.weight),
      parseInt(answers.topSpeed),
    );

    this.vehicles.push(car);
    console.log("Car created successfully!");
  }

  async createTruck(): Promise<void> {
    const answers = await inquirer.prompt([
      { type: "input", name: "color", message: "Enter color:" },
      { type: "input", name: "make", message: "Enter make:" },
      { type: "input", name: "model", message: "Enter model:" },
      { type: "input", name: "year", message: "Enter year:" },
      { type: "input", name: "weight", message: "Enter weight (lbs):" },
      { type: "input", name: "topSpeed", message: "Enter top speed (mph):" },
      {
        type: "input",
        name: "towingCapacity",
        message: "Enter towing capacity (lbs):",
      },
    ]);

    const truck = new Truck(
      Cli.generateVin(),
      answers.color,
      answers.make,
      answers.model,
      parseInt(answers.year),
      parseInt(answers.weight),
      parseInt(answers.topSpeed),
      parseInt(answers.towingCapacity)
    );

    this.vehicles.push(truck);
    console.log("Truck created successfully!");
  }

  async createMotorbike(): Promise<void> {
    const answers = await inquirer.prompt([
      { type: "input", name: "color", message: "Enter color:" },
      { type: "input", name: "make", message: "Enter make:" },
      { type: "input", name: "model", message: "Enter model:" },
      { type: "input", name: "year", message: "Enter year:" },
      { type: "input", name: "weight", message: "Enter weight (lbs):" },
      { type: "input", name: "topSpeed", message: "Enter top speed (mph):" },
      { type: "input", name: "wheelDiameter", message: "Enter wheel diameter:" },
    ]);

    const wheels = [
      new Wheel(parseInt(answers.wheelDiameter), "Default"),
      new Wheel(parseInt(answers.wheelDiameter), "Default"),
    ];

    const motorbike = new Motorbike(
      Cli.generateVin(),
      answers.color,
      answers.make,
      answers.model,
      parseInt(answers.year),
      parseInt(answers.weight),
      parseInt(answers.topSpeed),
      wheels
    );

    this.vehicles.push(motorbike);
    console.log("Motorbike created successfully!");
  }

  async selectVehicle(): Promise<void> {
    if (this.vehicles.length === 0) {
      console.log("No vehicles available. Create one first.");
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "vehicleVin",
        message: "Select a vehicle:",
        choices: this.vehicles.map(
          (vehicle) =>
            `${vehicle.vin} -- ${vehicle.make} ${vehicle.model} (${vehicle.year})`
        ),
      },
    ]);

    const selectedVehicle = this.vehicles.find(
      (vehicle) => `${vehicle.vin}` === answers.vehicleVin.split(" -- ")[0]
    );

    if (selectedVehicle) {
      console.log(`You selected: ${selectedVehicle.make} ${selectedVehicle.model}`);
      await this.performActions(selectedVehicle);
    }
  }

  async performActions(vehicle: Car | Truck | Motorbike): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: [
          "Print details",
          "Start vehicle",
          "Accelerate",
          "Decelerate",
          "Stop vehicle",
          ...(vehicle instanceof Motorbike ? ["Do a wheelie"] : []),
          ...(vehicle instanceof Truck ? ["Tow a vehicle"] : []),
          "Exit",
        ],
      },
    ]);

    switch (answers.action) {
      case "Print details":
        vehicle.printDetails();
        break;
      case "Start vehicle":
        vehicle.start();
        break;
      case "Accelerate":
        vehicle.accelerate(10);
        break;
      case "Decelerate":
        vehicle.decelerate(10);
        break;
      case "Stop vehicle":
        vehicle.stop();
        break;
      case "Do a wheelie":
        if (vehicle instanceof Motorbike) vehicle.wheelie();
        break;
      case "Tow a vehicle":
        if (vehicle instanceof Truck) await this.findVehicleToTow(vehicle);
        break;
      case "Exit":
        return;
    }

    await this.performActions(vehicle);
  }

  async findVehicleToTow(truck: Truck): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "towTarget",
        message: "Choose a vehicle to tow:",
        choices: this.vehicles
          .filter((v) => v !== truck)
          .map(
            (v) =>
              `${v.vin} -- ${v.make} ${v.model} (${v.weight} lbs)`
          ),
      },
    ]);

    const towTarget = this.vehicles.find(
      (v) => `${v.vin}` === answers.towTarget.split(" -- ")[0]
    );

    if (towTarget) truck.tow(towTarget);
  }
}

// Export the Cli class
export default Cli;

