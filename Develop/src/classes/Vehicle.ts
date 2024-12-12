// Vehicle class that implements Driveable interface
class Vehicle {
  started: boolean;
  currentSpeed: number;

  // Constructor for the Vehicle class
  constructor() {
    this.started = false;
    this.currentSpeed = 0;
  }

  // Method to print vehicle details
  printDetails(): void {
    console.log(`Started: ${this.started}`);
    console.log(`Current Speed: ${this.currentSpeed} mph`);
  }

  // Method to start the vehicle
  start(): void {
    this.started = true;
    console.log("Vehicle started.");
  }

  // Method to accelerate the vehicle
  accelerate(change: number): void {
    // Check if the vehicle is started
    if (this.started) {
      this.currentSpeed += change;
      console.log(`Accelerated to ${this.currentSpeed} mph.`);
    } else {
      console.log("Start the vehicle first.");
    }
  }

  // Method to decelerate the vehicle
  decelerate(change: number): void {
    // Check if the vehicle is started
    if (this.started) {
      this.currentSpeed = Math.max(0, this.currentSpeed - change);
      console.log(`Decelerated to ${this.currentSpeed} mph.`);
    } else {
      console.log("Start the vehicle first.");
    }
  }

  // Method to stop the vehicle
  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log("Vehicle stopped.");
  }

  // Method to turn the vehicle
  turn(direction: string): void {
    // Check if the vehicle is started
    if (this.started) {
      console.log(`Turned ${direction}.`);
    } else {
      console.log("Start the vehicle first.");
    }
  }

  // Method to reverse the vehicle
  reverse(): void {
    // Check if the vehicle is started
    if (this.started) {
      console.log("Reversed.");
    } else {
      console.log("Start the vehicle first.");
    }
  }
}

// Export the Vehicle class
export default Vehicle;

