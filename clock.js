// function to convert analog to digital clock and vice versa
function analogToDigital() {
    if (document.getElementById('canvas')) {
        if (document.getElementById('canvas').style.display == 'none') {
            document.getElementById('canvas').style.display = 'flex';
            document.getElementById('digital').style.display = 'none';
            document.getElementById('digital24').style.display = 'none';
            document.getElementById('adAlarm').innerHTML = 'Convert to Digital Alarm';
            document.getElementById('digital12to24').style.display = 'none';
        }
        else {
            document.getElementById('canvas').style.display = 'none';
            document.getElementById('digital').style.display = 'flex';
            document.getElementById('adAlarm').innerHTML = 'Convert to Analog Alarm';
            document.getElementById('digital12to24').style.display = 'flex';
            document.getElementById('digital24').style.display = 'none';
            
        }

    }
}

// function to convert 24 hour format to 12 hour format and vice versa
function digitalFormat() {
    if (document.getElementById('digital')) {
        if (document.getElementById('digital').style.display == 'none') {
            document.getElementById('digital').style.display = 'flex';
            document.getElementById('digital24').style.display = 'none';
            document.getElementById('digital12to24').innerHTML = 'Convert to 24 hour format';
            document.getElementById('ampm').style.display = 'flex';
        }
        else {
            document.getElementById('digital').style.display = 'none';
            document.getElementById('digital24').style.display = 'flex';
            document.getElementById('digital12to24').innerHTML = 'Convert to 12 hour format';
            document.getElementById('ampm').style.display = 'none';
            
        }

    }

}

// ************ ANALOG CLOCK*******************
// draw circle
var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    setInterval(drawClock, 1000);

// draw Clock 
    function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    }

// draw Clock face
    function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, 'MidnightBlue');
    grad.addColorStop(0.5, 'MidnightBlue');
    grad.addColorStop(1, 'MidnightBlue');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
    }

// drawing numbers
    function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
    }

    // Calculate the angle of the hour hand
    function drawTime(ctx, radius){
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        //hour
        hour=hour%12;
        hour=(hour*Math.PI/6)+
        (minute*Math.PI/(6*60))+
        (second*Math.PI/(360*60));
        drawHand(ctx, hour, radius*0.5, radius*0.07);
        //minute
        minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
        drawHand(ctx, minute, radius*0.8, radius*0.07);
        // second
        second=(second*Math.PI/30);
        drawHand(ctx, second, radius*0.9, radius*0.02);
    }

    // drawing hour, minute, second hands
    function drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.strokeStyle = "#333";
        ctx.stroke();
        ctx.rotate(-pos);
    }


// audio file for alarm
var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/bells/church_bells_01.wav");
sound.loop = true;

var h2 = document.getElementById('clock');
var h24 = document.getElementById('clock24');

function Time(){
	var date = new Date();
	
	var hours = (12 - (date.getHours()));
	var hour = date.getHours();
	
	var minutes = date.getMinutes();
	
	var seconds = date.getSeconds();
	
	var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';


	//convert military time to standard time

	if (hours < 0) {
		hours = hours * -1;
	} else if (hours == 00) {
		hours = 12;
	} else {
		hours = hour;
	}

	
	h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + " " + ampm;
    h24.textContent = addZero(hour) + ":" + addZero(minutes) + ":" + addZero(seconds);

}

// display current time by the second
var currentTime = setInterval(Time,1000);



/*functions to get hour, min, secs, 
  am or pm, add zero, set alarm time and sound, clear alarm
*/

function addZero(time) {

		return (time < 10) ? "0" + time : time;
	
}

function hoursMenu(){

    var select = document.getElementById('alarmhrs');
    // select.options[select.options.length] = " ";
    // select.clear();

    for (var i=0; i< select.options.length; i++)
    {
        select.options[select.options.length].remove(i);
    }

    // if (document.getElementById('digital24')){
        if (document.getElementById('digital24').style.display == "flex" )
        {
            var hrs = 23;

            for (i=0; i <= hrs; i++) {
                select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
            // console.log(select.options.length);
            }
        }
        else {
            var hrs = 12;

	        for (i=1; i <= hrs; i++) {
                select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
            }
        }
    // }
}
hoursMenu();

function minMenu(){

	var select = document.getElementById('alarmmins');
	var min = 59;

	for (i=0; i <= min; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
minMenu();

function secMenu(){

	var select = document.getElementById('alarmsecs');
	var sec = 59;

	for (i=0; i <= sec; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
secMenu();

// setting an alarm

function alarmSet() {

	var hr = document.getElementById('alarmhrs');
	
	var min = document.getElementById('alarmmins');
	
	var sec = document.getElementById('alarmsecs');
	
	var ap = document.getElementById('ampm');
    

    var selectedHour = hr.options[hr.selectedIndex].value;
    var selectedMin = min.options[min.selectedIndex].value;
    var selectedSec = sec.options[sec.selectedIndex].value;
    var selectedAP = ap.options[ap.selectedIndex].value;

    // console.log(selectedHour);

    var alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + " " + selectedAP;
    console.log('alarmTime:' + alarmTime);

    document.getElementById('alarmhrs').disabled = true;
	document.getElementById('alarmmins').disabled = true;
	document.getElementById('alarmsecs').disabled = true;
    document.getElementById('ampm').disabled = true;

    
   


//when alarmtime is equal to currenttime then play a sound
	var h2 = document.getElementById('clock');

/*function to calcutate the current time 
then compare it to the alarmtime and play a sound when they are equal
*/

setInterval(function(){
	
    var currentTime = h2.textContent;
    var curTime = h24.textContent;
    //  = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + " " + ampm;
	

	if (alarmTime == currentTime || alarmTime == curTime ) {
		sound.play();
		}

},1000);


    console.log('currentTime:' + currentTime);	
    // console.log(h2.textContent);

}

// dismissing an alarm
function alarmClear() {

	document.getElementById('alarmhrs').disabled = false;
	document.getElementById('alarmmins').disabled = false;
	document.getElementById('alarmsecs').disabled = false;
    document.getElementById('ampm').disabled = false;
    
	sound.pause();
}

