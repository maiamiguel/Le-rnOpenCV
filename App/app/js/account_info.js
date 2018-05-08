

$(document).ready(function(){
	
	$.get("/info", function(data, status){
        $(".name_identifier").html(' ' + data.firstname + ' ' + data.lastname + ' ');
    });
    
	$.get("/accountinfo", function(data, status){
        $("#username_id").html(' ' + data.username + ' ');
        $("#User_mail").html(' ' + data.email + ' ');
    });
});

function goBack() {
	window.history.back();
}