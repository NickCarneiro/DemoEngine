
W=window;
M=Math;

// need these
w=c.width=W.innerWidth;
h=c.height=W.innerHeight;

r=0;

// start clean
a.fillStyle = "#000";
a.fillRect(0,0,w,h);
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame 
	|| window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var start = Date.now();

var ctx = c.getContext('2d'); 
ctx.fillStyle = "#fff";  

var x = 0;
var y = 0;
var x_middle = Math.floor(w / 2);
var y_middle = Math.floor(h / 2);

var queue = [];

var particle = function(x_vel, y_vel, fill_style){
	this.x_vel = x_vel;
	this.y_vel = y_vel;
	this.fill_style = fill_style;
	this.x_pos = x_middle;
	this.y_pos = y_middle;
	this.iteration = 0;
	this.period = Math.random();
	this.draw = function(){
		ctx.fillStyle = this.fill_style;
		ctx.fillRect(this.x_pos, this.y_pos, 4, 4);
		var t = Date.now();
		this.x_pos += this.x_vel + 3 * Math.sin(this.period*this.iteration);
		this.y_pos += this.y_vel + 3* Math.sin(this.period*this.iteration);

		this.iteration++;
	}

	

}

var id_count = 0;
var max_particles = 200;
var min_vel = 3;
function render(timestamp) {
	
	ctx.fillStyle = "#000";
	//ctx.fillRect(0,0,w,h);
	while(queue.length < max_particles){

		//add new particle to queue
		var x_vel = 0.1 + Math.random() * 2;
		var y_vel = 0.1 + 3* Math.random() * 2;
		var rand1 = Math.random();
		var rand2 = Math.random();
		if(rand1 < .5){
			x_vel = x_vel *  - 1;

		} 
		if(rand2 < .5){
			y_vel = y_vel *  - 1;

		} 

		if(x_vel < 0 && x_vel > -1* min_vel && y_vel < 0 && y_vel > -1* min_vel){
			x_vel = -1*min_vel;
		}

		if(x_vel > 0 && x_vel < min_vel && y_vel < 0 && y_vel > -1* min_vel){
			x_vel = min_vel;
		}


		
		var fs = '#'+Math.floor(Math.random()*16777215).toString(16);

		var p = new particle(x_vel, y_vel, fs);
		p.id = id_count;
		id_count++;
		//console.log(id_count);
		queue.push(p);
		
	}
	
	//console.log(queue.length);

	var queue_copy = [];
	for(var i = 0; i < queue.length; i++){
		queue[i].draw();
		
		if( (queue[i].x_pos < w && queue[i].x_pos > 0) && ( queue[i].y_pos > 0 && queue[i].y_pos < h ) ){
			//console.log(w + " " + h);
			queue_copy.push(queue[i]);
		}
		
	}

	queue = queue_copy;
	
	requestAnimationFrame(render);
	
}

requestAnimationFrame(render);


