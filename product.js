//Write an arrow function which returns the product of two numbers
const product =(a, b) => {
    return a*b;
}
console.log(product(3,4));

// Watch video 6 as well and create a student object
const student = {
    name: 'Max',
    age: 29,
    greet: function()  {
        console.log('Hi I am ' + this.name);
    }
}
student.greet();