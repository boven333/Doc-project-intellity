// Step 1: Define the callback function
function greet(name) {
    return 'Hello, ' + name + '!';
 }

 function pushCars(cars) {
    return "this is " + cars + " Speed limit 50km/h"
 }
 
 // Step 2: Define a function that accepts a callback
 function processUserInput(callback) {
     const name = document.getElementById('nameInput').value;
     const cars = document.getElementById('CarsInput').value;
     // Step 3: Execute the callback function and get the result
     const result1 = callback(name);
     const result2 = callback(cars);
     // Display the result in the HTML element
     document.getElementById('callback1').innerHTML = result1;
     document.getElementById('callback2').innerHTML = result2;
 }
 
 // Step 4: No need to call the function directly here, it will be called via the button click
 