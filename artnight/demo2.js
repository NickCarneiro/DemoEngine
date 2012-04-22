
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
	this.width = 4;
	this.height = 4;
	this.draw = function(){
		ctx.fillStyle = this.fill_style;
		ctx.fillRect(this.x_pos, this.y_pos, this.width, this.height);
		var t = Date.now();
		this.x_pos += this.x_vel + 3 * Math.sin(this.period*this.iteration);
		this.y_pos += this.y_vel + 3* Math.sin(this.period*this.iteration);

		this.iteration++;
	}

	

}

var id_count = 0;
var max_particles = 200;
var min_vel = 3;
var last_render = Date.now();
var draw_rate = 2;
function render(timestamp) {
	if(Date.now() - last_render < draw_rate){
		requestAnimationFrame(render);
		return;
	}
	ctx.fillStyle = "#000";
	//ctx.fillRect(0,0,w,h);
	while(queue.length < max_particles){
		var magnitude = 5;
		//add new particle to queue
		var theta = 360 * Math.random();
		var x_vel = magnitude * Math.cos(theta);
		var y_vel = magnitude * Math.sin(theta);
		
		var fs = '#'+Math.floor(Math.random()*16777215).toString(16);

		var p = new particle(x_vel, y_vel, fs);
		p.id = id_count;
		p.width = 10* Math.sin(id_count);
		p.height = 10* Math.sin(id_count);
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
	last_render = Date.now();
}

requestAnimationFrame(render);


