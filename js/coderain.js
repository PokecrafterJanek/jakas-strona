var canvas = document.querySelector('canvas'), context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

var fontSize = 25;
var columns = canvas.width / fontSize, lines = canvas.height / fontSize;

var drops = [];
for (var i = 0; i < columns; i++) {
	drops[i] = 1;
}

function printRedirect() { //Ten syf się nie wywoluje z jakiejs przyczyny

	document.getElementById("canvas").style.display = "none";

}

setTimeout(printRedirect, 1000); //I to jest wina tego gowna

function draw() {

  	context.fillStyle = 'rgba(0, 0, 0, .1)';
  	context.fillRect(0, 0, canvas.width, canvas.height);

  	for (var i = 0; i < drops.length; i++) {
		var text = letters[Math.floor(Math.random() * letters.length)];
		context.fillStyle = '#0f0';
		context.fillText(text, i * fontSize, drops[i] * fontSize);
		drops[i]++;

		if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
			drops[i] = 0;
		}
		
  	}

}

setInterval(draw, 55);