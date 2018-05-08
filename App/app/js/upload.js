var images = [];
var imageshold = [];
var g = [];
var custom = [];
var func = [];
var nFunc = 0;

$(document).ready(function(){
    $.get("/getCustomScriptList", function(data, status){
        if(data.custom_name == "nocustomScript"){
            console.log(data.custom_name);
        }
        else{
            for(line in data){
                var idx;
                if(custom.length < 10) idx = '0'+custom.length;
                else idx = custom.length;
                $('#newScriptsLocation').append('<div class="row form-group" >'
                                                    +'<div class="col-xs-1"></div>'
                                                    +'<div class="col-xs-6">'
                                                    +   '<label style="color: #FFFFFF" id="script_name_label'+idx+'">'+data[line].custom_name+'</label>'
                                                    +'</div>'
                                                    +'<div class="col-xs-2">'
                                                    +   '<div>'
                                                    +       '<form name="myForm">'
                                                    +           '<i id="custom'+idx+'" class="custom fa fa-arrow-circle-o-right fa-2x" aria-hidden="true" style="font-size: x-large"></i>'
                                                    +       '</form>'
                                                    +   '</div>'
                                                    +' </div>'
                                                +'</div>');            
                custom.push(data[line].effects);
                console.log("CUSTOM");
                console.log(custom);       
            }
        }
    });
    $.get("/getAddedFunctions", function(data, status){
        if(data.functionInputName == "noaddedFunctions"){
            console.log(data.functionInputName);
        }
        else{
            for(line in data){
                var idx;
                console.log("getAddedFunctions SUCESS");
                if(nFunc < 10) idx = '0'+nFunc;
                else idx = nFunc;                
                $('#addedFunctions').append('<div class="row form-group" >'
                                                    +'<div class="col-xs-1"></div>'
                                                    +'<div class="col-xs-6">'
                                                    +   '<label style="color: #FFFFFF" id="addedfunction'+idx+'">'+data[line].functionInputName+'</label>'
                                                    +'</div>'
                                                    +'<div class="col-xs-2">'
                                                    +   '<div>'
                                                    +       '<form name="myForm">'
                                                    +           '<i id="func'+idx+'" class="func fa fa-arrow-circle-o-right fa-2x" aria-hidden="true" style="font-size: x-large"></i>'
                                                    +       '</form>'
                                                    +   '</div>'
                                                    +'</div>'
                                                    +'<div class="col-xs-10" id="functionArgs'+idx+'">'
                                                    +'</div>'
                                                +'</div>'); 
                for (var y = 1; y<= data[line].functionInputNumbArgs; y++){
                    $('#functionArgs'+idx).append('<div class="col-xs-8 form-group">'
                        +'Arg'+y+':'
                        +'<input style="max-width: 100%" type="text" id="func'+idx+'Arg'+y+'" value="1" name="Arg'+y+'">'
                        +'</div>');
                }                          
                var f = {"name": data[line].functionInputName, "functionInputNumbArgs": data[line].functionInputNumbArgs, "filelocation": data[line].functionfilelocation};
                console.log(func);
                func.push(f);
                nFunc++;     
            }
        }
    });    
    $('#submitNewFunc').on({
        'click':function(e){
            console.log("########## submitNewFunc ##########");
            var functionInputName = document.getElementById('functionInputName').value;
            var functionInputNumbArgs = parseInt(document.getElementById('functionInputNumbArgs').value,10);
            var uploadfile = document.getElementById('functionInputFile').files[0];
            console.log(functionInputName + " : "+functionInputNumbArgs);
            console.log(uploadfile);
            var idx;

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log("submitNewFunc SUCESS");
                    if(nFunc < 10) idx = '0'+nFunc;
                    else idx = nFunc;
                    $('#addedFunctions').append('<div class="row form-group" >'
                                                    +'<div class="col-xs-1"></div>'
                                                    +'<div class="col-xs-6">'
                                                    +   '<label style="color: #FFFFFF" id="addedfunction'+idx+'">'+functionInputName+'</label>'
                                                    +'</div>'
                                                    +'<div class="col-xs-2">'
                                                    +   '<div>'
                                                    +       '<form name="myForm">'
                                                    +           '<i id="func'+idx+'" class="func fa fa-arrow-circle-o-right fa-2x" aria-hidden="true" style="font-size: x-large"></i>'
                                                    +       '</form>'
                                                    +   '</div>'
                                                    +'</div>'
                                                    +'<div class="col-xs-10" id="functionArgs'+idx+'">'
                                                    +'</div>'
                                                +'</div>');

                    for (var y = 1; y<= functionInputNumbArgs; y++){
                        $('#functionArgs'+idx).append('<div class="col-xs-8 form-group">'
                            +'Arg'+y+':'
                            +'<input style="max-width: 100%" type="text" id="func'+idx+'Arg'+y+'" value="1" name="Arg'+y+'">'
                            +'</div>');
                    }
                    var f = {"name": functionInputName, "functionInputNumbArgs": functionInputNumbArgs, "filelocation": xhr.responseText};
                    console.log(func);
                    func.push(f);
                    nFunc++;
                }
            }
            xhr.open('post', '/submitNewFunc', true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader('X-Filename', uploadfile.name);
            xhr.setRequestHeader('functionInputName', functionInputName);
            xhr.setRequestHeader('functionInputNumbArgs', functionInputNumbArgs);
            xhr.send(uploadfile);              
        }
    });
    $('#addedFunctions').on('click', 'i',function(e){
        var uploadfile = images[0].file;
        $("#carousel").css('visibility','visible');
        $("#image").css("opacity","0.5");
        $('#loading').append('<img src="images/loading.gif" style="position:absolute"/>');
        target_id = e.target.id.toString().slice(-2);
        var idx = parseInt(target_id);
        console.log(parseInt(target_id));
        var effect = JSON.parse(JSON.stringify(images[0].effect));
        var nArgs = parseInt(func[idx].functionInputNumbArgs);
        var s = func[idx];
        s['functionArgs']=[];
        if(idx < 10) index = '0'+idx;
        console.log(index);
        for (var i = 1; i<= nArgs; i++){
            console.log('func'+index+'Arg'+i);
            s.functionArgs.push(parseInt(document.getElementById('func'+index+'Arg'+i).value));
        }
        console.log(s.functionArgs);
        effect.push(s);
        var script = {"file": uploadfile, "effect": effect};
        console.log(script);
        // Set up the request.
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {

                var response = JSON.parse(xhr.responseText);
                console.log(response);
                if(response.altered_filename != "ERROR"){
                    var galleryscript = {"src": document.getElementById('uploadimage').src, "images": images[0]};
                    g.unshift(galleryscript);
                    console.log(g);            
                    document.getElementById("loading").innerHTML ='';
                    $("#image").css("opacity","1");
                    if($('#uploadimage').attr("src") != null){
                        updateGallery();
                    }
                    images.unshift(script);
                    console.log(images);                     

                    $("#uploadimage").attr("src",response.altered_filename);
                    $("#img_toExpand").attr("src",response.hist_dest);

                    var xhr1 = new XMLHttpRequest();
                    var url = '/viewScript';
                    xhr1.onload = function () {
                        document.getElementById('view_script').textContent = xhr1.responseText;
                    };
                    xhr1.open('GET', url);
                    xhr1.setRequestHeader('X-Filename', response.script_name);
                    xhr1.send();                           
                }
                else{
                    alert(response.hist_dest);
                    document.getElementById("loading").innerHTML ='';
                    $("#image").css("opacity","1");
                }
            }
        }
        xhr.open('post', '/upload', true);
        xhr.setRequestHeader("Content-type", "image/png", "application/json");
        xhr.setRequestHeader('X-Filename', uploadfile.name);
        xhr.setRequestHeader('info', JSON.stringify(script));
        xhr.send(uploadfile);      
    });    
    $('.slide #removeFromGallery').on({
        'click': function(e){
            console.log('removeFromGallery');
            var x = e.target.className.slice(-5).charAt(0);
            console.log(e);
            var idx = parseInt(x);
            g.splice(idx,1);
            $('.galleryImg'+(idx)+'btns').css('visibility','hidden');
            $('.galleryImg'+(idx)+'btns').children().css('visibility','hidden');
            for(idx = 9; idx>=0; idx--){
                var galleryImg = "galleryImg" + "0" + idx;
                
                if(typeof g[idx] != 'undefined'){
                    
                    document.getElementById(galleryImg).src = g[idx].src;
                    console.log("updateGallery : "+idx);
                    $('.galleryImg'+(idx)+'btns').css('visibility','visible');
                    $('.galleryImg'+(idx)+'btns').children().css('visibility','visible');
                    
                }
                else{
                    galleryImg = "#"+galleryImg;
                    $(galleryImg).attr('src','');
                    $('.galleryImg'+(idx)+'btns').css('visibility','hidden');
                    $('.galleryImg'+(idx)+'btns').children().css('visibility','hidden');
                }
            }
        }
    });
    $('#saveToHistoryMain').on({
        'click': function(e){
            console.log('saveToHistoryMain');
            var uploadfile = images[0].file;
            
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log("saveToHistoryMain SUCESS")
                }
            }
            xhr.open('post', '/saveToHistory', true);
            xhr.setRequestHeader("Content-type", "image/png", "application/json");
            xhr.setRequestHeader('X-Filename', uploadfile.name);
            xhr.setRequestHeader('info', JSON.stringify(images[0]));
            xhr.send(uploadfile);  
            
        }
    });
    $('.slide #saveToHistory').on({
        'click': function(e){
            console.log('saveToHistory');
            var x = e.target.className.slice(-5).charAt(0);
            console.log(e);
            var idx = parseInt(x);
            console.log(idx);
            console.log(g);
            var uploadfile = g[idx].images.file;

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    console.log("saveToHistory SUCESS")
                }
            }
            xhr.open('post', '/saveToHistory', true);
            xhr.setRequestHeader("Content-type", "image/png", "application/json");
            xhr.setRequestHeader('X-Filename', uploadfile.name);
            xhr.setRequestHeader('info', JSON.stringify(g[idx].images));
            xhr.send(uploadfile);  
        }
    });
    $('.slide img').on({
        'click': function(e){
            index = parseInt(e.target.id.slice(-2));
            var galleryscript = {"src": document.getElementById('uploadimage').src, "images": images[0]};
            console.log(e);
            console.log("THE INDEX OF GALLERY CLICKED IS "+index);
            images.unshift(g[index].images);
            g.unshift(galleryscript);
            makeImage();
        }
    });
    $('#undo').on({
        'click': function(e){
            if(images.length > 1){
                imageshold.unshift(images[0]);
                images.splice(0,1);
                if(images[0].effect)
                makeImage();
            }
            console.log("undo = ");
        }
    });
    $('#redo').on({
        'click': function(e){
            if(imageshold.length > 0){
                images.unshift(imageshold[0]);
                imageshold.splice(0,1);           
                makeImage();
            }
            console.log("redo i = ");
        }
    });

    $("#createCustomScript").on({
        'click': function(e){
            var custom_name = prompt("Please add a name to your custom script");
            if(custom_name != null && custom_name != ""){
                var idx;
                if(custom.length < 10) idx = '0'+custom.length;
                else idx = custom.length;
                $('#newScriptsLocation').append('<div class="row form-group" >'
                                                    +'<div class="col-xs-1"></div>'
                                                    +'<div class="col-xs-6">'
                                                    +   '<label style="color: #FFFFFF" id="script_name_label'+idx+'"></label>'
                                                    +'</div>'
                                                    +'<div class="col-xs-2">'
                                                    +   '<div>'
                                                    +       '<form name="myForm">'
                                                    +           '<i id="custom'+idx+'" class="custom fa fa-arrow-circle-o-right fa-2x" aria-hidden="true" style="font-size: x-large"></i>'
                                                    +       '</form>'
                                                    +   '</div>'
                                                    +' </div>'
                                                +'</div>');
                document.getElementById('script_name_label'+idx).innerHTML = custom_name;
                var script_lines = document.getElementById('view_script').innerHTML;
                console.log(script_lines);
                var e = {'effect':[]};
                $.post("/createCustomScript",{script_lines: script_lines, name:custom_name}, function(data){
                    console.log(data);
                    var ef = data.effect;
                    for( x in ef){
                        console.log(ef[x]);
                        e.effect.push(ef[x]);
                    }
                });
                custom.push(e);
                console.log("CUSTOM");
                console.log(custom);                
                
            }else{
                alert("Please enter a name for the custom script");
            }
        }
    });

    $('#newScriptsLocation').on('click', 'i',function(e){
            var uploadfile = images[0].file;
            $("#carousel").css('visibility','visible');
            $("#image").css("opacity","0.5");
            $('#loading').append('<img src="images/loading.gif" style="position:absolute"/>');
            target_id = e.target.id.toString().slice(-2);
            var idx = parseInt(target_id);
            console.log(parseInt(target_id));
            var effect = JSON.parse(JSON.stringify(images[0].effect));
            var galleryscript = {"src": document.getElementById('uploadimage').src, "images": images[0]};
            g.unshift(galleryscript);
            console.log(custom[idx].effect);
            effect.push.apply(effect,custom[idx].effect);
            console.log(effect);
            var script = {"file": uploadfile, "effect": effect};
            images.unshift(script);
            console.log(images); 

            // Set up the request.
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    document.getElementById("loading").innerHTML ='';
                    $("#image").css("opacity","1");
                    if($('#uploadimage').attr("src") != null){
                        updateGallery();
                    }
                    var response = JSON.parse(xhr.responseText);
                    console.log(response);
                    $("#uploadimage").attr("src",response.altered_filename);
                    $("#img_toExpand").attr("src",response.hist_dest);
                    var xhr1 = new XMLHttpRequest();
                    var url = '/viewScript';
                    xhr1.onload = function () {
                        document.getElementById('view_script').textContent = xhr1.responseText;
                    };
                    xhr1.open('GET', url);
                    xhr1.setRequestHeader('X-Filename', response.script_name);
                    xhr1.send();   
                }
            }
           
            xhr.open('post', '/upload', true);
            xhr.setRequestHeader("Content-type", "image/png", "application/json");
            xhr.setRequestHeader('X-Filename', uploadfile.name);
            xhr.setRequestHeader('info', JSON.stringify(images[0]));
            xhr.send(uploadfile);

    });

    $('.uploadbutton').on({
        'click': function(e){
            var uploadfile = images[0].file;
            $("#carousel").css('visibility','visible');
            $("#image").css("opacity","0.5");
            $('#loading').append('<img src="images/loading.gif" style="position:absolute"/>');
            console.log("TARGET --> "+e.target.id.toString());
            var effect = JSON.parse(JSON.stringify(images[0].effect));

            if(e.target.id.toString() == "canny"){
                console.log("canny");
                effect.push(
                    {"name": "canny",
                     "arg1": document.getElementById("canny_myRange_arg1").value,
                     "arg2": document.getElementById("canny_myRange_arg2").value,
                    });                
            }
            else if(e.target.id.toString() == "blur"){
                console.log("blur");
                effect.push(
                    {"name": "blur",
                     "arg1": document.getElementById("blur_myRange_arg1").value,
                     "arg2": document.getElementById("blur_myRange_arg2").value,
                    });               
            }
            else if(e.target.id.toString() == "closing"){
                console.log("closing");
                effect.push(
                    {"name": "closing",
                     "arg1": document.getElementById("closing_myRange_arg1").value,
                    });
            }
            else if(e.target.id.toString() == "opening"){
                console.log("opening");
                effect.push(
                    {"name": "opening",
                     "arg1": document.getElementById("opening_myRange_arg1").value,
                    });
            }
            else if(e.target.id.toString() == "gradient"){
                console.log("gradient");
                effect.push(
                    {"name": "gradient",
                     "arg1": document.getElementById("gradient_myRange_arg1").value,
                    });
            }         
            else if(e.target.id.toString() == "tophat"){
                console.log("tophat");
                effect.push(
                    {"name": "tophat",
                     "arg1": document.getElementById("tophat_myRange_arg1").value,
                    });
            }           
            else if(e.target.id.toString() == "blackhat"){
                console.log("blackhat");
                effect.push(
                    {"name": "blackhat",
                     "arg1": document.getElementById("blackhat_myRange_arg1").value,
                    });
            }

            else if(e.target.id.toString() == "gray"){
                console.log("gray");
                effect.push(
                      {"name": "gray"});                
            }
            else if(e.target.id.toString() == "hsv"){
                console.log("hsv");                
                effect.push(
                      {"name": "hsv"});              
            }
            else if(e.target.id.toString() == "hls"){
                console.log("hls");                
                effect.push(
                      {"name": "hls"});              
            }
            else if(e.target.id.toString() == "erode"){
                console.log("erode");                
                effect.push(
                    {"name": "erode",
                     "arg1": document.getElementById("erode_myRange_arg1").value,
                     "arg2": document.getElementById("erode_iterations").value,
                    });             
            }
            else if(e.target.id.toString() == "dilate"){
                console.log("dilate");
                effect.push(
                    {"name": "dilate",
                     "arg1": document.getElementById("dilate_myRange_arg1").value,
                     "arg2": document.getElementById("dilate_iterations").value,
                    });
            }           
            else if(e.target.id.toString() == "faceeyedetect"){
                console.log("faceeyedetect");
                effect.push(
                    {"name": "faceeyedetect"});
            }
            else if(e.target.id.toString() == "eyedetect"){
                console.log("eyedetect");
                effect.push(
                    {"name": "eyedetect"});
            }
            else if(e.target.id.toString() == "facedetect"){
                console.log("facedetect");
                effect.push(
                    {"name": "facedetect"});
            }
            else if(e.target.id.toString() == "medianblur"){
                console.log("medianblur");                
                effect.push(
                    {"name": "medianblur"});              
            }
            else if(e.target.id.toString() == "gaussianblur"){
                console.log("gaussianblur");                
                effect.push(
                    {"name": "gaussianblur"});              
            }
            else if(e.target.id.toString() == "resize"){
                console.log("resize");
                effect.push(
                    {"name": "resize",
                     "arg1": document.getElementById("resize_myRange_arg1").value,
                     "arg2": document.getElementById("resize_myRange_arg2").value,
                    });                
            }
            else if(e.target.id.toString() == "simplethresholding"){
                console.log("simplethresholding");
                effect.push(
                    {"name": "simplethresholding",
                     "arg1": document.getElementById("simplethresholding_myRange_arg1").value,
                    });                
            }
            else if(e.target.id.toString() == "adaptivethresholding"){
                console.log("adaptivethresholding");
                effect.push(
                    {"name": "adaptivethresholding",
                     "arg1": document.getElementById("adaptivethresholding_myRange_arg1").value,
                    });                
            }        
            var script = {"file": uploadfile, "effect": effect};


            // Set up the request.
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {

                    var response = JSON.parse(xhr.responseText);
                    console.log(response);
                    if(response.altered_filename != "ERROR"){
                        var galleryscript = {"src": document.getElementById('uploadimage').src, "images": images[0]};
                        g.unshift(galleryscript);
                        console.log(g);            
                        document.getElementById("loading").innerHTML ='';
                        $("#image").css("opacity","1");
                        if($('#uploadimage').attr("src") != null){
                            updateGallery();
                        }
                        images.unshift(script);
                        console.log(images);                     

                        $("#uploadimage").attr("src",response.altered_filename);
                        $("#img_toExpand").attr("src",response.hist_dest);

                        var xhr1 = new XMLHttpRequest();
                        var url = '/viewScript';
                        xhr1.onload = function () {
                            document.getElementById('view_script').textContent = xhr1.responseText;
                        };
                        xhr1.open('GET', url);
                        xhr1.setRequestHeader('X-Filename', response.script_name);
                        xhr1.send();                           
                    }
                    else{
                        alert(response.hist_dest);
                        document.getElementById("loading").innerHTML ='';
                        $("#image").css("opacity","1");
                    }
                    
                    
                }
            }
           
            xhr.open('post', '/upload', true);
            xhr.setRequestHeader("Content-type", "image/png", "application/json");
            xhr.setRequestHeader('X-Filename', uploadfile.name);
            xhr.setRequestHeader('info', JSON.stringify(script));
            xhr.send(uploadfile);
        }
        
    });
    $('.uploadbuttonMatch').on({
        'click': function(e){
            var uploadfile = images[0].file;
            var matchfile = match;
            $("#carousel").css('visibility','visible');
            $("#image").css("opacity","0.5");
            $('#loading').append('<img src="images/loading.gif" style="position:absolute"/>');
            console.log("TARGET --> "+e.target.id.toString());
            var effect = JSON.parse(JSON.stringify(images[0].effect));
            var galleryscript = {"src": document.getElementById('uploadimage').src, "images": images[0]};
            g.unshift(galleryscript);       
            

            // Set up the request.
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var xhr1 = new XMLHttpRequest();
                    var url = '/upload';
                    var response1 = xhr.responseText;
                    xhr1.onreadystatechange = function () {
                        if (xhr1.readyState == XMLHttpRequest.DONE){
                            var response = JSON.parse(xhr1.responseText);
                            console.log(response);
                            document.getElementById("loading").innerHTML ='';
                            $("#image").css("opacity","1");
                            if($('#uploadimage').attr("src") != null){
                                updateGallery();
                                $("#uploadimage").attr("src",response.altered_filename);
                                $("#img_toExpand").attr("src",response.hist_dest);
                                document.getElementById('view_script').textContent = 'matching;';
                            }
                        }
                    };
                    var script = {"file": uploadfile, "effect":[{"name": "matching", "matchImg":matchfile.name, "method": e.target.id.toString()}]}
                    images.unshift(script);
                    console.log(script);
                    console.log(images);
                    xhr1.open('post', url, true);
                    xhr1.setRequestHeader("Content-type", "image/png", "application/json");
                    xhr1.setRequestHeader('X-Filename', uploadfile.name);
                    xhr1.setRequestHeader('info', JSON.stringify(script));
                    xhr1.send(uploadfile);
                }
            }
            xhr.open('post', '/uploadMatch', true);
            xhr.setRequestHeader("Content-type", "image/png");
            xhr.setRequestHeader('X-Filename', matchfile.name);
            xhr.send(matchfile);
        }
        
    });
    $('#fileinputMatch').on({       
       'change': function(e){
            var file =  this.files[0];
            match = file;
            previewImageMatch(file);
        }
    });
    $('#fileinput').on({       
       'change': function(e){
            $('#saveToHistoryMain').css('visibility','visible');
            $('#saveToHistoryMain').children().css('visibility','visible');
            var file =  this.files[0];
            var script = {"file": file, "effect":[{"name": "none"}]};
            if(document.getElementById("uploadimage") !== null){
                var galleryscript = {"src": document.getElementById('uploadimage').src, "images": images[0]};
                g.unshift(galleryscript);
                $("#carousel").css('visibility','visible');
            }
            images.unshift(script);          
            previewImage(file, false);
            updateGallery();            
            document.getElementById('view_script').textContent = "No script uploaded";
        }
    });
    $('#dropzone').on({
        'drop': function(e){
            $('#saveToHistoryMain').css('visibility','visible');
            $('#saveToHistoryMain').children().css('visibility','visible');
            e.preventDefault();
            e.stopPropagation();          
            var file =  e.originalEvent.dataTransfer.files[0];
            var script = {"file": file, "effect":[{"name": "none"}]};
            if(document.getElementById("uploadimage") !== null){
                var galleryscript = {"src": document.getElementById('uploadimage').src, "images": images[0]};
                g.unshift(galleryscript);
                $("#carousel").css('visibility','visible');
            }            
            images.unshift(script);
            console.log(images);
            previewImage(file, false);
            updateGallery();
        },
        'dragover': function(e){
            e.preventDefault();
            e.stopPropagation();
            console.log('dragover');
            this.className = 'dropzone dragover';
        },
        'dragleave': function(){
            this.className = 'dropzone';

            return false;           
        },
    });
    $('#script_input').on({
        'change': function(e){
            console.log("#script_input");
            var file = this.files[0];
            script = file
            console.log(file.name);
            if(file==null)
                window.alert("FAILED!");
            uploadScript(file);
        }
    });
    $('#view_script').on({
        'change': function(e){
            console.log("#view_script");
            viewScript(script);
        }
    });
    $('#script_apply').on({
        'click': function(e){
            console.log("#script_apply");
            applyScript();
        }
    });
});

function makeImage(){
    console.log('makeImage');
    var uploadfile = images[0].file;
    console.log(images[0].effect.length);
    if(images[0].effect.length > 1){
        $("#image").css("opacity","0.5");
        $('#loading').append('<img src="images/loading.gif" style="position:absolute"/>');
        // Set up the request.
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if($('#uploadimage').attr("src") != null){
                    document.getElementById("loading").innerHTML ='';
                    $("#image").css("opacity","1");
                    updateGallery();
                }
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                $("#uploadimage").attr("src",response.altered_filename);
                $("#img_toExpand").attr("src",response.hist_dest);
                var xhr1 = new XMLHttpRequest();
                var url = '/viewScript';
                xhr1.onload = function () {
                    document.getElementById('view_script').textContent = xhr1.responseText;
                };
                xhr1.open('GET', url);
                xhr1.setRequestHeader('X-Filename', response.script_name);
                xhr1.send();
            }
        }
        xhr.open('post', '/upload', true);
        xhr.setRequestHeader("Content-type", "image/png", "application/json");
        xhr.setRequestHeader('X-Filename', uploadfile.name);
        xhr.setRequestHeader('info', JSON.stringify(images[0]));
        xhr.send(uploadfile);          
    }
    else{
        previewImage(uploadfile,true);
        updateGallery();
        document.getElementById('view_script').textContent = "Image has no script\nassociated";
    } 
}


function previewImageMatch(file) {
    console.log('previewImageMM');
    var gallery = document.getElementById("imageMatch");
    var imageType = /image.*/;

    if (!file.type.match(imageType)) {
        throw "File Type must be an image";
    }
    document.getElementById("imageMatch").innerHTML ='';
    
    var thumb = document.createElement("div");
    thumb.classList.add('thumbnail'); // Add the class thumbnail to the created div
    thumb.id = "uploadthumbnailMatch";

    var img = document.createElement("img");
    img.file = file;
    img.id = "uploadimageMatch";
    thumb.appendChild(img);
    gallery.appendChild(thumb);

    // Using FileReader to display the image content
    var reader = new FileReader();
    reader.onload = (function(aImg) { 
        return function(e) {
            aImg.src = e.target.result;
        };
    })(img);
    reader.readAsDataURL(file);
}

function previewImage(file,undoredo) {
    console.log('previewImage');
    var gallery = document.getElementById("image");
    var imageType = /image.*/;

    if (!file.type.match(imageType)) {
        throw "File Type must be an image";
    }
    document.getElementById("image").innerHTML ='';
    
    var thumb = document.createElement("div");
    thumb.classList.add('thumbnail'); // Add the class thumbnail to the created div
    thumb.id = "uploadthumbnail";

    var img = document.createElement("img");
    img.file = file;
    img.id = "uploadimage";
    thumb.appendChild(img);
    gallery.appendChild(thumb);

    // Using FileReader to display the image content
    var reader = new FileReader();
    reader.onload = (function(aImg) { 
        return function(e) {
            aImg.src = e.target.result;
        };
    })(img);
    reader.readAsDataURL(file);
}

function updateGallery(){
    console.log('updateGallery');

    for(idx = 9; idx>=0; idx--){
        var galleryImg = "galleryImg" + "0" + idx;
        
        if(typeof g[idx] != 'undefined'){
            
            document.getElementById(galleryImg).src = g[idx].src;
            console.log("updateGallery : "+idx);
            $('.galleryImg'+(idx)+'btns').css('visibility','visible');
            $('.galleryImg'+(idx)+'btns').children().css('visibility','visible');
            
        }
        else{
            galleryImg = "#"+galleryImg;
            $(galleryImg).attr('src','');
        }
        
        
    }
}

function uploadScript(file){
    console.log("uploadScript()");
    var url = '/scriptUpload';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("Script uploaded successfully");
        }
    };
    xhr.setRequestHeader('X-Filename', file.name);
    xhr.send(file);
    viewScript(file);
}

function viewScript(file){ 
    console.log("viewScript()");
    var xhr = new XMLHttpRequest();
    var url = '/viewScript';
    xhr.onload = function () {
        document.getElementById('view_script').textContent = this.responseText;
    };
    xhr.open('GET', url);
    xhr.setRequestHeader('X-Filename', file.name);
    xhr.send();
}

function applyScript(){
    var url = '/applyScript';
    $("#carousel").css('visibility','visible');
    var uploadfile = images[0].file;
    $("#image").css("opacity","0.5");
    $('#loading').append('<img src="images/loading.gif" style="position:absolute"/>');
    var galleryscript = {"src": document.getElementById('uploadimage').src, "images": images[0]};
    g.unshift(galleryscript);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("Script applied to image successfully");
            document.getElementById("loading").innerHTML ='';
            $("#image").css("opacity","1");
            if($('#uploadimage').attr("src") != null){
                updateGallery();
            }
            var response = JSON.parse(xhr.responseText);
            $("#uploadimage").attr("src",response.altered_filename);
            $("#img_toExpand").attr("src",response.hist_dest);
            console.log(response.script_info);
            var effect = JSON.parse(JSON.stringify(images[0].effect));
            for(x in response.script_info){
                console.log(response.script_info[x]);
                effect.push(response.script_info[x]);
            }
            var newimg = {"file": uploadfile, "effect": effect};
            console.log(newimg);
            images.unshift(newimg);
        }
    };
    xhr.open('post', url, true);
    xhr.setRequestHeader("Content-type", "image/png", "application/json");
    xhr.setRequestHeader('X-Filename', uploadfile.name);
    xhr.setRequestHeader('info', JSON.stringify(images[0]));
    xhr.send(uploadfile);  
}  
