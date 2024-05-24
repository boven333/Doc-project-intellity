var myObject = [{
    name: "John",
    age: 30,
    city: "New York"
}];

var num = 1;
var str = "Bowen";
var nell = undefined;

// Call the function
document.getElementById('output1').innerHTML = obChecker(nell);

console.log(typeof('output1'));

function obChecker(obj) {
    if (typeof obj === "object") {
        return "Object > String = " + JSON.stringify(obj);
    } else if (typeof obj === "undefined" ) {
        return "Undefiend > Null = " + "null";
    } else {
        return "Common type = " + typeof(obj) + " " +  obj;
    }
}
