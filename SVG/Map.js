// JavaScript Document

//var Map;

function TrackingMotor(id,x,y,canvas,parent){
	this.id = id;
	this.x = x;
	this.y = y;
	this.canvas = canvas;
	this.parent = parent;
	
	this.renderTrackingMotor = function () {
		id=this.id;	
			eval("tm_path"+this.id+" = this.canvas.map.circle(this.x,this.y,5);");
			eval("tm_path"+this.id).attr({
				id:this.id,
				 fill: '#ccf',
				 stroke: '#333',
				 "stroke-width": '1'
				});
			eval("tm_path"+this.id).node.onmouseover = function(){
				eval("tm_path"+id).animate({fill: "#ccf"},200);
			}
			eval("tm_path"+this.id).node.onmouseout = function(){
				eval("tm_path"+id).animate({fill: "#fff"},200);
			}		
	}
	this.warning = function (){
		id =this.id;
		eval("tm_path"+this.id).animate({fill: "#ff0"},200);	
		
		eval("tm_path"+this.id).node.onmouseover = function(){
			eval("tm_path"+id).animate({fill: "#ff0"},200);
		}
		eval("tm_path"+this.id).node.onmouseout = function(){
			eval("tm_path"+id).animate({fill: "#ff0"},200);
		}
	}
	this.alarm = function (){
		id =this.id;
		this.parent.warning();
		eval("tm_path"+this.id).animate({fill: "#f00"},200);	
		
		eval("tm_path"+this.id).node.onmouseover = function(){
			eval("tm_path"+id).animate({fill: "#f00"},200);
		}
		eval("tm_path"+this.id).node.onmouseout = function(){
			eval("tm_path"+id).animate({fill: "#f00"},200);
		}

	}


}

function Transformer(id){
	this.id = id;
}

function Inverter(id){
	this.id = id;
}

function Skid(id,x,y,canvas,parent,address){
	this.id = id;
	this.x = x;
	this.y = y;
	this.canvas = canvas;	
	this.parent = parent;	
	this.address = address;	

	this.inverters = new Array();
	this.transformers = new Array();
	this.trackingMotors = new Array();

	this.addInverter = function (id){
		//Add Lookup Information
		address = this.address+".inverters["+this.inverters.length+"]";
		this.canvas.lookupArray.push([id,address]);

		inverter = new Inverter(id);
		this.inverters.push(inverter);
	}

	this.addTransformer = function (id){
		//Add Lookup Information
		address = this.address+".transformers["+this.transformers.length+"]";
		this.canvas.lookupArray.push([id,address]);

		trx = new Transformer(id);
		this.transformers.push(trx);
	}
	
	this.addTrackingMotor = function (id,x,y){
		//Add Lookup Information
		address = this.address+".trackingMotors["+this.trackingMotors.length+"]";
		this.canvas.lookupArray.push([id,address]);

		motor = new TrackingMotor(id,x,y,this.canvas,this);
		this.trackingMotors.push(motor);
	}

	this.enlarge = function () {
		
	}
	
	this.renderSkid = function(){
		id=this.id;	
			eval("is_path"+this.id+" = this.canvas.map.rect(this.x,this.y,13,5);");
			eval("is_path"+this.id).attr({
				id:this.id,
				 fill: '#666',
				 stroke: 'none',
				 "stroke-width": '0'
				});
			eval("is_path"+this.id).node.onmouseover = function(){
				eval("is_path"+id).animate({fill: "#000"},200);
			}
			eval("is_path"+this.id).node.onmouseout = function(){
				eval("is_path"+id).animate({fill: "#666"},200);
			}
			
			for(i=0;i < this.trackingMotors.length; i++){
				this.trackingMotors[i].renderTrackingMotor();
			}

		
	}
	this.warning = function (){
		id =this.id;
		this.parent.warning();
		eval("is_path"+this.id).animate({fill: "#fc3"},200);	
		
		eval("is_path"+this.id).node.onmouseover = function(){
			eval("is_path"+id).animate({fill: "#f90"},200);
		}
		eval("is_path"+this.id).node.onmouseout = function(){
			eval("is_path"+id).animate({fill: "#fc3"},200);
		}
	}
	this.alarm = function (){
		id =this.id;
		this.parent.warning();
		eval("is_path"+this.id).animate({fill: "#f00"},200);	
		
		eval("is_path"+this.id).node.onmouseover = function(){
			eval("is_path"+id).animate({fill: "#f00"},200);
		}
		eval("is_path"+this.id).node.onmouseout = function(){
			eval("is_path"+id).animate({fill: "#f00"},200);
		}
	}
}

function TrackingArea (id, points, canvas, parent, address) {
	this.id = id;
	this.points = points;
	this.canvas = canvas;
	this.parent = parent;
	this.address = address;
	
	this.skids = new Array();

	this.addSkid = function (id,x,y){
		//Add Lookup Information
		address = this.address+".skids["+this.skids.length+"]";
		this.canvas.lookupArray.push([id,address]);

		skid = new Skid(id,x,y,this.canvas,this,address);
		this.skids.push(skid);
	}
	
	this.renderTrackingArea = function(){
		id=this.id;	
			eval("ta_path"+this.id+" = this.canvas.map.path(fixPoints(this.points));");
			eval("ta_path"+this.id).attr({
				id:this.id,
				 fill: '#eee',
				 stroke: 'none',
				 "stroke-width": '0'
				});
			eval("ta_path"+this.id).node.onmouseover = function(){
				eval("ta_path"+id).animate({fill: "#ccf"},200);
			}
			eval("ta_path"+this.id).node.onmouseout = function(){
				eval("ta_path"+id).animate({fill: "#eee"},200);
			}
			
			for(i=0;i < this.skids.length; i++){
				this.skids[i].renderSkid();
			}
			
		
	}
	this.warning = function (){
		id =this.id;
		eval("ta_path"+this.id).animate({fill: "#ffd"},200);	
		
		eval("ta_path"+this.id).node.onmouseover = function(){
			eval("ta_path"+id).animate({fill: "#ff9"},200);
		}
		eval("ta_path"+this.id).node.onmouseout = function(){
			eval("ta_path"+id).animate({fill: "#ffc"},200);
		}
	}
	this.alarm = function (){
		id =this.id;
		eval("ta_path"+this.id).animate({fill: "#fcc"},200);	
		
		
		eval("ta_path"+this.id).node.onmouseover = function(){
			eval("ta_path"+id).animate({fill: "#faa"},200);
		}
		eval("ta_path"+this.id).node.onmouseout = function(){
			eval("ta_path"+id).animate({fill: "#fcc"},200);
		}
		
	
	}
}


function Block(id,points,parent,address) {
	this.id = id;
	this.points = points;
	this.parent = parent;
	this.address = address;
	this.trackingAreas = new Array();
	
	this.addTrackingArea = function (id,points){
		//Add Lookup Information
		address = this.address+".trackingAreas["+this.trackingAreas.length+"]";
		this.parent.lookupArray.push([id,address]);
		
		area = new TrackingArea(id,points,this.parent,this,address);
		this.trackingAreas.push(area);
	}
	
	this.renderBlock = function() {
		id=this.id;
		//address = 
		
		//this.parent.lookupArray.push([this.id,]);
			eval("block_path"+this.id+" = this.parent.map.path(fixPoints(this.points));");
			eval("block_path"+this.id).attr({
				id:this.id,
				 fill: '#fff',
				 stroke: '#000000',
				 "stroke-width": '2',
				 "stroke-dasharray": '1,10,1'
				});
			/*eval("block_path"+this.id).node.onmouseover = function(){
				eval("block_path"+id).animate({fill: "#ccf"},200);
			}
			eval("block_path"+this.id).node.onmouseout = function(){
				eval("block_path"+id).animate({fill: "#fff"},200);
			}
			*/
			for(i=0;i < this.trackingAreas.length; i++){
				this.trackingAreas[i].renderTrackingArea();
			}
			
		
	}
	this.warning = function (){
		id =this.id;
		eval("block_path"+this.id).animate({fill: "#ffc"},200);	
		
		eval("block_path"+this.id).node.onmouseover = function(){
			eval("block_path"+id).animate({fill: "#ff9"},200);
		}
		eval("block_path"+this.id).node.onmouseout = function(){
			eval("block_path"+id).animate({fill: "#ffc"},200);
		}
	}
	this.alarm = function (){
		id =this.id;
		eval("block_path"+this.id).animate({fill: "#fcc"},200);	
		
		eval("block_path"+this.id).node.onmouseover = function(){
			eval("block_path"+id).animate({fill: "#faa"},200);
		}
		eval("block_path"+this.id).node.onmouseout = function(){
			eval("block_path"+id).animate({fill: "#fcc"},200);
		}
	}
}

function Map(id,canvas,width,height){
	this.id = id;
	this.canvas = canvas;
	this.height = height;
	this.width = width;
	this.lookupArray = new Array();
	
	this.map = Raphael(canvas,width,height);
	this.blocks = new Array();
	this.block_paths = new Array();
	this.addBlock = function (id,points){
		//Add lookup info
		address = this.id+".blocks["+this.blocks.length+"]";
		this.lookupArray.push([id,address]);
		
		block = new Block(id,points,this,address);
		this.blocks.push(block);
	}
	
	this.renderMap = function(){
		for(var i=0; i < this.blocks.length; i++){
			console.log(i);
			this.blocks[i].renderBlock();

		}
		
	}
	
	this.findDevice = function (text) {
		for(var i=0; i < this.lookupArray.length; i++){
			if(this.lookupArray[i][0] == text){
				return this.lookupArray[i][1];
				var found = true;
			}
		}
		
		if (!found){
			return "No device with id '"+text+"' was found.";
		}
	}
	
	/*this.sendAlarm = function(device){
		address = this.findDevice(device);
		eval(address+".alarm()");		
	}*/
}


	
function fixPoints(pointArr){
	var newPoints;
	var returnString = '';
	newPoints = pointArr.split(" ");
	for(i=0;i < newPoints.length;i++){
		if(newPoints[i] != 'M' && newPoints[i] != 'z'){
			coords = newPoints[i].split(',');
			newX = Math.round(coords[0]) - 625;
			newY = Math.round(coords[1]) - 875;
			writePoint = newX +" "+ newY;
			if(i == 0){
				returnString = "M ";
			}else{
				returnString = returnString + " L ";
			}
			returnString = returnString + writePoint;
		}
	}
	returnString = returnString + " z";
	return returnString;
}