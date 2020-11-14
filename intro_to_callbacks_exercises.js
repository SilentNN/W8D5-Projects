class Clock {
    constructor(){
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
        let date = new Date();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.printTime();
        setInterval(this._tick.bind(this), 1000);
    }

    printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    //     if (this.seconds < 10) {
    //         console.log(`${this.hours}:${this.minutes}:0${this.seconds}`);
    //     } else if (this.minutes < 10) {
    //         console.log(`${this.hours}:0${this.minutes}:${this.seconds}`);
    //     } else if  (this.hours < 10 ) {
    //         console.log(`0${this.hours}:${this.minutes}:${this.seconds}`);
    //     } else {
    //     console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
    // }
        let seconds;
        let minutes;
        let hours;

        if (this.seconds <10 ) {
            seconds = `0${this.seconds}`;
        } else {
            seconds = this.seconds;
        }
        if (this.minutes <10 ) {
            minutes = `0${this.minutes}`;
        } else {
            minutes = this.minutes;
        }
        if (this.hours <10 ) {
            hours = `0${this.hours}`;
        } else {
            hours = this.hours;
        }
    
        console.log(`${hours}:${minutes}:${seconds}`);
    }

    _tick(){
    // 1. Increment the time by one second.
    // 2. Call printTime.
        this.seconds++;
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
        }
        if (this.minutes === 60) {
            this.minutes = 0;
            this.hours++;
        }
        if (this.hours === 24) this.hours = 0;
        this.printTime();
    }
}

// c = new Clock;

// const readline = require('readline');

// const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

function addNumbers(sum, numsLeft, completionCallback) {
    
    if (numsLeft > 0){
        reader.question("Please input a number", number => {
            let n = parseInt(number)
            sum = sum + n;
            console.log(sum);
            addNumbers(sum, --numsLeft, completionCallback);
        });
    } else {
        completionCallback(sum);
        reader.close();
    }
    
}

// .load intro_to_callbacks_exercises.js

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
    reader.question(`Is ${el1} greater than ${el2}?`, input => {
        if (input === "yes") {
            callback(true);
            // askIfGreaterThan(el1, el2, callback)
        } else if (input === "no") {
            callback(false);
            // askIfGreaterThan(el1, el2, callback)
        } else {
            askIfGreaterThan(el1, el2, callback)
        }
    });
}

// askIfGreaterThan(2, 5, (input) => `${input}`)

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1){
        askIfGreaterThan(arr[i], arr[i + 1], isGreaterThan => {
            if (isGreaterThan){
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                madeAnySwaps = true;
            }
            innerBubbleSortLoop(arr, ++i, madeAnySwaps, outerBubbleSortLoop);
        })
    }else{
        outerBubbleSortLoop(madeAnySwaps);
    }
}

// innerBubbleSortLoop([1,5,4,2], 0);

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
    if (madeAnySwaps){
        innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    }else{
        sortCompletionCallback(arr);
    }
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop(true);

}

// absurdBubbleSort([3, 2, 1], function(arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

Function.prototype.myBind = function(context) {
    const that = this;
    return function() { that.apply(context) };
}

// class Lamp {
//     constructor() {
//         this.name = "a lamp";
//     }
// }
  
// const turnOn = function() {
// console.log("Turning on " + this.name);
// };

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"

Function.prototype.myThrottle = function(interval) {
    let that = this;
    let tooSoon = false;
    let output = function () {
        if (tooSoon === false) {
            tooSoon = true;
            setTimeout(() => {
                tooSoon = false;
            }, interval);
            that.apply(this, arguments);
        }
    };
    return output;
}

// class Neuron {
//     fire() {
//       console.log("Firing!");
//     }
//   }
  
//   const neuron = new Neuron();
//   // When we create a new Neuron,
//   // we can call #fire as frequently as we want
  
//   // The following code will try to #fire the neuron every 10ms. Try it in the console:
//   const interval = setInterval(() => {
//     neuron.fire();
//   }, 10);
  
//   // You can use clearInterval to stop the firing:
//   clearInterval(interval);
  
//   // Using Function#myThrottle, we should be able to throttle
//   // the #fire function of our neuron so that it can only fire
//   // once every 500ms:
  
//   neuron.fire = neuron.fire.myThrottle(500);

Function.prototype.myDebounce = function(interval) {
    let timer;
    const that = this;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            that.apply(this, arguments);
        }, interval);
    };
};



class SearchBar {
    constructor() {
        this.query = "";

        this.type = this.type.bind(this);
        this.search = this.search.bind(this);
    }

    type(letter) {
        this.query += letter;
        this.search();
    }

    search() {
        console.log(`searching for ${this.query}`);
    }
}

const searchBar = new SearchBar();

const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
};

searchBar.search = searchBar.search.myDebounce(500);
queryForHelloWorld();