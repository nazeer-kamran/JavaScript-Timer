// global variables
let min; // countdown minutes used for clock
let sec; // countdown seconds used for clock
let intervalVar;
let currStatus;
let twArray;
let twCtr;

// Run function to initialize group member names and variables
// Register button event listeners
function setup() {
    setnames();
    initialize();
    randomBox = document.getElementById("randomBox");
    randomBox.addEventListener("change", changeRandom);
    startButton = document.getElementById("startButton");
    startButton.addEventListener("click", start);
    pauseButton = document.getElementById("pauseButton");
    pauseButton.addEventListener("click", pause);
    resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", reset);
}

// Replace the P99, Last Name and XXX99999
function setnames() {
    document.getElementById("groupNum").innerText = "08052022";
    document.getElementById("student1").innerText = "Last Name - Nazeer Kamran";
    document.getElementById("student2").innerText = "Last Name - Random Student";
}

// Initialize instruction line, textboxes, checkbox and box array
function initialize() {
    currStatus = "W";
    document.getElementById('controlInstruct').innerHTML = 'Create Start Time';

    // ADD CODE HERE

}
// Based upon cuurStatus, start new timer, restart timer or display message
function start() {
    if (!validateTime()) {
        return;
    }
    if (currStatus == "W") {
        sec = document.getElementById('inSeconds').value;
        min = document.getElementById('inMinutes').value;
        document.getElementById('controlInstruct').innerHTML = 'Running';
        currStatus = "R";
        updateTime();


    } else if (currStatus == "P") {
        updateTime();
        document.getElementById('controlInstruct').innerHTML = 'Running';
        currStatus = "R"
    } else if (currStatus == "R") {
        sec = Number(document.getElementById('inSeconds').value);
        min = Number(document.getElementById('inMinutes').value);
        document.getElementById('controlInstruct').innerHTML = 'Reset to Start Over';
        clearInterval(intervalVar);
        updateTime();
    } else {
        alert("Some Error Occured")
    }
}

// Check minutes to see whether it is numeric and in the range 0 to 59
// Do same for seconds	
function validateTime() {
    const mins = document.getElementById('inMinutes').value;
    const secs = document.getElementById('inSeconds').value;
    //console.log((mins > 0 && mins<=59));
    if (isNaN(mins) || isNaN(secs) || !(mins > 0 && mins <= 59) || !(secs > 0 && secs <= 59)) {
        genErrorMsg();
        document.getElementById('inMinutes').value = '';
        document.getElementById('inSeconds').value = '';
        return false;
    }
    document.getElementById('controlInstruct').innerHTML = '';
    return true;
}
// Display error message when minutes or seconds are not valid
// Empty textboxes
function genErrorMsg() {

    document.getElementById('controlInstruct').innerHTML = 'Create Valid Start Time';

}
// Pause - Stop timer and update instructions
function pause() {
    document.getElementById("controlInstruct").innerHTML = "Paused";
    clearInterval(intervalVar);
    currStatus = "P";
}
// Reset - Stop timer; initialize variables, zero out the clock, remove all red boxes
function reset() {
    clearInterval(intervalVar);
    currStatus = "W";
    document.getElementById("controlInstruct").innerHTML = "Create Start Time";
    document.getElementById("time").innerHTML = "00:00";
    document.getElementById('inMinutes').value = '00';
    document.getElementById('inSeconds').value = '00';
    changeBoxStyle(-1);
    // min = 0;
    // sec = 0;
    document.getElementById('randomBox').checked = false;
}

function finish() {
    document.getElementById('controlInstruct').innerHTML = 'Finished';
    clearInterval(intervalVar);
    min = 0;
    sec = 0;
}

// Complete this function only when status is WAITING ("W")
//  When checkbox is checked
//    Randomize minute and second values
//    Set min and sec global variables
//    Format data and populate textboxes
//  When chackbox is NOT checked
//	  Empty textboxes
function changeRandom() {

    document.getElementById('controlInstruct').innerHTML = '';
    // ADD CODE HERE
    if (this.checked) {
        // If Checkbox is checked
        const ranNum1 = Math.floor((Math.random() * 59) + 1);
        const ranNum2 = Math.floor((Math.random() * 59) + 1);
        document.getElementById('inMinutes').value = ranNum1;
        document.getElementById('inSeconds').value = ranNum2;
    } else {
        document.getElementById('inMinutes').value = '';
        document.getElementById('inSeconds').value = '';
        document.getElementById("controlInstruct").innerHTML = "Create Start Time";
    }

}

function changeBoxStyle(boxRed) {
    let boxArr = ["tw11", "tw21", "tw22", "tw12"];
    for (let i = 0; i < boxArr.length; i++) {
        const element = boxArr[i];
        if (i === boxRed) {
            document.getElementById(element).style.background = "red";
            document.getElementById(element).style.display = "block";
        } else {
            document.getElementById(element).style.display = "none";
        }

    }
}

// Function To update Boxes
function timerBoxesUpdate(sec) {
    let redBox = Number(sec % 4);
    changeBoxStyle(redBox);
}


// Check for countdown finish
//  Stop counter and update Instructions
// If not finished
//  Decrement clock time, format clock time and display it
//  Chnage which red box shows
function updateTime() {
    intervalVar = setInterval(function() {

        document.getElementById("time").innerHTML = (min >= 10 ? min : ("0" + min)) + ":" + (sec >= 10 ? sec : "0" + sec);
        sec--;
        timerBoxesUpdate(sec);
        if (currStatus == "R") {
            if (sec == 0) {
                min--;
                sec = 60;
                if (min == -1) {
                    document.getElementById("time").innerHTML = "00:00";
                    finish();
                }
            }
        }
    }, 1000);
}

window.addEventListener("load", setup);