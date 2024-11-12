/** Example 1 */

// function Animal(name) {
//   this.name = name;
// }

// Animal.prototype.speak = function () {
//   console.log(this.name + " makes a noise.");
// };

// function Dog(name, breed) {
//   Animal.call(this, name);
//   this.breed = breed;
// }

// Dog.prototype = Object.create(Animal.prototype);

// Dog.prototype.bark = function () {
//   console.log(this.name + " barks!");
// };

// var myDog = new Dog("Rex", "German Shepherd");
// myDog.speak();
// myDog.bark();

/** Example 2 */

// function Animal(name) {
//   this.name = name;
// }

// Animal.prototype.speak = function () {
//   console.log(this.name + " makes a noise.");
// };

// const animal = new Animal("Fishy");
// animal.speak = function () {
//   console.log(this.name + " makes a bubbling noise.");
// };

// const animal2 = new Animal("Birdy");
// animal2.speak = function () {
//   console.log(this.name + " makes an aeolian noise.");
// };

// animal.speak();
// animal2.speak();

/** Example 3 */
// function Vehicle(make, model) {
//   this.make = make;
//   this.model = model;
// }

// Vehicle.prototype.start = function () {
//   console.log(this.make + " " + this.model + " is starting.");
// };

// function Car(make, model, doors) {
//   Vehicle.call(this, make, model);
//   this.doors = doors;
// }

// Car.prototype = Object.create(Vehicle.prototype);

// Car.prototype.honk = function () {
//   console.log(this.make + " " + this.model + " honks!");
// };

// var myCar = new Car("Toyota", "Corolla", 4);
// myCar.start(); // Expected: "Toyota Corolla is starting."
// myCar.honk(); // Expected: "Toyota Corolla honks!"
