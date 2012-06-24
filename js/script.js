//  --------------APP-VARIABLES---------------------------
var canvas, ctx;
var button;

// --------------HEAD--------------------------------------
var head_centroid_1 = {x:100,y:100};
var head = [];

function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function Triangle(pt1, pt2, pt3){
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.pt3 = pt3;
}

// ---------------DRAW----------------------------
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawCircle(ctx, x, y, radius) { // draw circle function
    ctx.fillStyle = 'rgba(255, 35, 55, 1.0)';

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();

    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.stroke(); // draw border
}

function drawTriangle(ctx, pt1, pt2, pt3) { // draw triangle function
    // ctx.fillStyle = 'rgba(255, 35, 55, 1.0)';

    // ctx.beginPath();
    // ctx.arc(x, y, radius, 0, Math.PI*2, true);
    // ctx.closePath();

    // ctx.fill();

    // ctx.lineWidth = 1;
    // ctx.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    // ctx.stroke(); // draw border
	
	// Set the style properties.
	ctx.fillStyle   = '#f00';
	ctx.strokeStyle = '#000';
	ctx.lineWidth   = 1;

	ctx.beginPath();
	// Start from the top-left point.
	ctx.moveTo(pt1.x, pt1.y); // give the (x,y) coordinates
	ctx.lineTo(pt2.x, pt2.y);
	ctx.lineTo(pt3.x, pt3.y);
	ctx.lineTo(pt1.x, pt1.y);

	// Done! Now fill the shape, and draw the stroke.
	// Note: your shape will not be visible until you call any of the two methods.
	ctx.fill();
	ctx.stroke();
	ctx.closePath();	
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    ctx.beginPath(); // custom shape begin
	
	//--------------------------------------------------circle border
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
	ctx.stroke(); // draw border	

	//--------------------------------------------PLACE HEAD.
	for(var i = 0; i < head.length; i++){
	    if(head[i].radius != undefined)
		   drawCircle(ctx, head[i].x, head[i].y, head[i].radius );
		else if (head[i].pt1 != undefined)
		    drawTriangle(ctx, head[i].pt1, head[i].pt2, head[i].pt3);
	}	
	
}


//----------------------------------------------------------- initialization
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var circleRadius = 15;
    var width = canvas.width;
    var height = canvas.height;

	//-------------------------INITIALIZE-HEAD--------------------------------------------
    head.push(new Circle(head_centroid_1.x-20,head_centroid_1.y-25 , 20));	  //LEar
	head.push(new Circle(head_centroid_1.x+20,head_centroid_1.y-25 , 20));        //REar	
    head.push(new Circle(head_centroid_1.x,head_centroid_1.y+10, 25));	  //Head		
    head.push(new Circle(head_centroid_1.x-10,head_centroid_1.y -3, 12));     //lEye
    head.push(new Circle(head_centroid_1.x+10,head_centroid_1.y-3 , 12));   //rEye
    head.push(new Circle(head_centroid_1.x-10,head_centroid_1.y -3, 1));     //lRetina
    head.push(new Circle(head_centroid_1.x+10,head_centroid_1.y-3 , 1));   //rRetina	
    head.push(new Circle(head_centroid_1.x,head_centroid_1.y+12 , 12)); //nose		
	head.push(new Triangle({x:head_centroid_1.x-10,y:head_centroid_1.y+26}, {x:head_centroid_1.x+10,y:head_centroid_1.y+26}, {x:head_centroid_1.x,y:head_centroid_1.y+33}));  //mouth
		
		
    $('#purchaseButton').click(function(e) { // binding click event
		
		// load background image
		backgroundImage = new Image();
		backgroundImage.src = 'images/stars.jpg';
		backgroundImage.onload = function() {
		}
		backgroundImage.onerror = function() {
			console.log('Error loading the background image.');
		}
		
    });

     setInterval(drawScene, 100); // loop drawScene
});