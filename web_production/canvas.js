var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var canvasWidth = c.width;
var canvasHeight = c.height;

var firstPath = new Path.Circle({
	center: [canvasWidth / 2 , canvasHeight / 2 ],
	radius: 250
});

firstPath.strokeColor = '#cad6dd';
