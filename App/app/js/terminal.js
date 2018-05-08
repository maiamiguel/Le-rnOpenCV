
    
console.log("CONSOLA CRIADA")
var con = new SimpleConsole({
	handleCommand: handle_command,
	placeholder: "Enter function name with argument or use help",
	storageID: "simple-console demo"
});

document.getElementById("cli").appendChild(con.element);

con.logHTML(
	"<p>Try entering some code</p>"
);

function handle_command(command){
	var effect_name,parameters;
	console.log(command);
	
	effect_name=command.substr(0,command.indexOf(' '));
	p=command.substr(command.indexOf(' ')+1);
	parameters = p.replace(/\s+/g, '');
	console.log(p);
	console.log(effect_name);
	console.log(parameters);
	var help = false;
	var invalid_command = "Command invalid, please refer to help for information";
	var valid = false;
	var re1='^(\\d+)';	// Integer Number 1
    var re2='(,)?';	// Any Single Character 1
    var re3='(\\d+)$';	// Integer Number 2
	var p = new RegExp(re1+re2+re3,["i"]);
	var p1 = new RegExp(re3,["i"]);
	if(command.match("help")){
		help = true;
		
		var code='<pre style="background-color: #000; color: #FFF;border: transparent;">'
					+'Command help list:\n'
					+'  canny arg1, arg2 - apply a canny effect using arg1 and arg2 as the arguments\n'
					+'  blur arg1, arg2 - apply a blur effect using arg1 and arg2 as the arguments\n'
					+'  medianblur - apply a median blur effect\n'
					+'  gaussianblur - apply a gaussian blur effect\n'
					+'  BGR2GRAY - apply a RGB to Gray effect\n'
					+'  BGR2HSV - apply a RGB to HSV effect\n'
					+'  BGR2HLS - apply a RGB to HLS effect\n'
					+'  erode arg1, arg2 - apply a erode effect using arg1 as the erode argument and arg2 as the number of iterations\n'
					+'  dilate arg1, arg2 - apply a dilate effect using arg1 as the dilate argument and arg2 as the number of iterations\n'
					+'  opening arg1  - apply a opening effect using arg1 as the opening argument\n'
					+'  closing arg1  - apply a closing effect using arg1 as the closing argument\n'
					+'  gradient arg1  - apply a gradient effect using arg1 as the gradient argument\n'
					+'  tophat arg1  - apply a tophat effect using arg1 as the tophat argument\n'
					+'  blackhat arg1  - apply a blackhat effect using arg1 as the blackhat argument\n'
					+'  facedetect - apply a face detection algorithm\n'
					+'  eyedetect - apply a eyes detection algorithm\n'
					+'  resize arg1, arg2 - apply a resize algorithm\n'
					+'  simplethresholding arg1 - apply a image thresholding algorithm\n'
					+'	adaptivethresholding arg 1 - apply an adaptive image thresholding algorithm\n'
					+'</pre>'
		con.logHTML(code);
	}
	else if(command.match("canny")){
		if(parameters.match(p)){
			var canny_myRange_arg1 = parseInt(parameters.substr(0,parameters.indexOf(',')));
			var canny_myRange_arg2 = parseInt(parameters.substr(parameters.indexOf(',')+1));
			if(canny_myRange_arg2 >0 && canny_myRange_arg2<301 && canny_myRange_arg1 >0 && canny_myRange_arg1<301){
				document.getElementById("canny_myRange_arg1").value = canny_myRange_arg1;
				document.getElementById("canny_myRange_arg2").value = canny_myRange_arg2;
				eventFire(document.getElementById('canny'), 'click');
				valid = true;				
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer values between 0 and 300");
			}
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}
	}
	else if (command.match("BGR2GRAY$")){
		eventFire(document.getElementById('gray'), 'click');	
		effect_name = "BGR2GRAY";
		valid = true;
	}
	else if (command.match("BGR2HSV$")) {
		eventFire(document.getElementById('hsv'), 'click');
		effect_name = "BGR2HSV";
		valid = true;
	}
	else if (command.match("BGR2HLS$")) {
		eventFire(document.getElementById('hls'), 'click');
		effect_name = "BGR2HLS";
		valid = true;
	}
	else if (command.match("faceeyedetect$")) {
		eventFire(document.getElementById('faceeyedetect'), 'click');
		effect_name = "faceeyedetect";
		valid = true;
	}
	else if (command.match("eyedetect$")) {
		eventFire(document.getElementById('eyedetect'), 'click');
		effect_name = "eyedetect";
		valid = true;
	}
	else if (command.match("facedetect$")) {
		eventFire(document.getElementById('facedetect'), 'click');
		effect_name = "facedetect";
		valid = true;
	}
	else if (command.match("medianblur$")){
		console.log(document.getElementById("medianblur"));
		eventFire(document.getElementById("medianblur"), 'click');	
		effect_name = "medianblur";
		valid = true;
	}
	else if (command.match("gaussianblur$")){
		eventFire(document.getElementById("gaussianblur"), 'click');	
		effect_name = "gaussianblur";
		valid = true;
	}
	else if(command.match("blur")){
		if(parameters.match(p)){
			var blur_myRange_arg1 = parseInt(parameters.substr(0,parameters.indexOf(',')));
			var blur_myRange_arg2 = parseInt(parameters.substr(parameters.indexOf(',')+1));
			if(blur_myRange_arg2 >0 && blur_myRange_arg2<301 && blur_myRange_arg1 >0 && blur_myRange_arg1<301){
				document.getElementById("blur_myRange_arg1").value = blur_myRange_arg1;
				document.getElementById("blur_myRange_arg2").value = blur_myRange_arg2;
				eventFire(document.getElementById('blur'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer values between 0 and 300");
			}
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}
	}	
	else if(command.match("opening")){
		if(parameters.match(p1)){
			var opening_myRange_arg1 = parseInt(parameters);
			if(opening_myRange_arg1>0 && opening_myRange_arg1<8 && opening_myRange_arg1 % 2 == 1){
				document.getElementById("opening_myRange_arg1").value = opening_myRange_arg1;
				eventFire(document.getElementById('opening'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer odd values values between 1 and 7");
			}
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}			
	}
	else if(command.match("closing")){
		if(parameters.match(p1)){
			var closing_myRange_arg1 = parseInt(parameters);
			if(closing_myRange_arg1>0 && closing_myRange_arg1<8 && closing_myRange_arg1 % 2 == 1){
				document.getElementById("closing_myRange_arg1").value = closing_myRange_arg1;
				eventFire(document.getElementById('closing'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer odd values values between 1 and 7");
			}
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}			
	}
	else if(command.match("gradient")){
		if(parameters.match(p1)){
			var gradient_myRange_arg1 = parseInt(parameters);
			if(gradient_myRange_arg1>0 && gradient_myRange_arg1<8 && gradient_myRange_arg1 % 2 == 1){
				document.getElementById("gradient_myRange_arg1").value = gradient_myRange_arg1;
				eventFire(document.getElementById('gradient'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer odd values values between 1 and 7");
			}			
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}			
	}
	else if(command.match("tophat")){
		if(parameters.match(p1)){
			var tophat_myRange_arg1 = parseInt(parameters);
			if(tophat_myRange_arg1>0 && tophat_myRange_arg1<8 && tophat_myRange_arg1 % 2 == 1){
				document.getElementById("tophat_myRange_arg1").value = tophat_myRange_arg1;
				eventFire(document.getElementById('tophat'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer odd values values between 1 and 7");
			}	
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}			
	}
	else if(command.match("blackhat")){
		if(parameters.match(p1)){
			var blackhat_myRange_arg1 = parseInt(parameters);
			if(blackhat_myRange_arg1>0 && blackhat_myRange_arg1<8 && blackhat_myRange_arg1 % 2 == 1){
				document.getElementById("blackhat_myRange_arg1").value = blackhat_myRange_arg1;
				eventFire(document.getElementById('blackhat'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer odd values values between 1 and 7");
			}	
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}			
	}	
	else if(command.match("erode")){
		if(parameters.match(p)){
			var erode_myRange_arg1 = parseInt(parameters.substr(0,parameters.indexOf(',')));
			var erode_iterations = parseInt(parameters.substr(parameters.indexOf(',')+1));
			if(erode_myRange_arg1>0 && erode_myRange_arg1<8 && erode_myRange_arg1 % 2 == 1 && erode_iterations>0){
				document.getElementById("erode_myRange_arg1").value = erode_myRange_arg1;
				document.getElementById("erode_iterations").value = erode_iterations;
				eventFire(document.getElementById('erode'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer odd values values between 1 and 7 and iterations must be positive");
			}
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}
	}
	else if(command.match("dilate")){
		if(parameters.match(p)){
			var dilate_myRange_arg1 = parseInt(parameters.substr(0,parameters.indexOf(',')));
			var dilate_iterations = parseInt(parameters.substr(parameters.indexOf(',')+1));
			if(dilate_myRange_arg1>0 && dilate_myRange_arg1<8 && dilate_myRange_arg1 % 2 == 1 && dilate_iterations>0){
				document.getElementById("dilate_myRange_arg1").value = dilate_myRange_arg1;
				document.getElementById("dilate_iterations").value = dilate_iterations;
				eventFire(document.getElementById('dilate'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer odd values values between 1 and 7 and iterations must be positive");
			}			
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}
	}
	else if(command.match("resize")){
		if(parameters.match(p)){
			var resize_myRange_arg1 = parseInt(parameters.substr(0,parameters.indexOf(',')));
			var resize_myRange_arg2 = parseInt(parameters.substr(parameters.indexOf(',')+1));
			if(resize_myRange_arg2 >0 && resize_myRange_arg2<6 && resize_myRange_arg1 >0 && resize_myRange_arg1<6){
				document.getElementById("resize_myRange_arg1").value = resize_myRange_arg1;
				document.getElementById("resize_myRange_arg2").value = resize_myRange_arg2;
				eventFire(document.getElementById('resize'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer values between 1 and 5");
			}
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}
	}	
	else if(command.match("simplethresholding")){
		if(parameters.match(p1)){			
			var simplethresholding_myRange_arg1 = parseInt(parameters);
			if(simplethresholding_myRange_arg1>0 && simplethresholding_myRange_arg1<8 && simplethresholding_myRange_arg1 % 2 == 1){
				document.getElementById("simplethresholding_myRange_arg1").value = simplethresholding_myRange_arg1;
				eventFire(document.getElementById('simplethresholding'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be integer odd values values between 1 and 7");
			}
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}			
	}	
	else if(command.match("adaptivethresholding")){
		if(parameters.match(p1)){			
			var adaptivethresholding_myRange_arg1 = parseInt(parameters);
			if(adaptivethresholding_myRange_arg1==0 || adaptivethresholding_myRange_arg1==1){
				document.getElementById("adaptivethresholding_myRange_arg1").value = adaptivethresholding_myRange_arg1;
				eventFire(document.getElementById('adaptivethresholding'), 'click');
				valid = true;
			}
			else{
				valid = false;
				con.logHTML("Arguments must be an integer values 0 or 1");
			}
		}
		else {
			valid = false;
			con.logHTML(invalid_command);
		}			
	}					
	else{
		var err;
		try{
			var result = eval(command);
		}catch(error){
			err = error;
		}
		if(err){
			con.error(err);
		}else{
			con.log(result).classList.add("result");
		}
	}
	if((!help)&& valid){
		$.post("/getScriptCode",{effect_name: effect_name}, function(data){
			console.log(data);
			var code='<pre style="background-color: #000; color: #FFF;border: transparent;">';
			for(line in data.effect){
				code +=data.effect[line].line;
			}
			console.log(code);
			code +='</pre>';
			con.logHTML(code);
	    });	
	}
	
};

function eventFire(el, etype){
	console.log(el);
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}