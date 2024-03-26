// Example function
function greet(message) {
  console.log(message, this.name);
}

// Object with a name property
const person = {
  name: 'John'
};
const person2 = {
  name: 'ff'
};
// Using call
greet.call(person, 'Hello'); // Output: Hello John

// Using apply
greet.apply(person, ['Hi']); // Output: Hi John

// Using bind
const greetJohn = greet.bind(person2);
greetJohn('Hola'); // Output: Hola John
