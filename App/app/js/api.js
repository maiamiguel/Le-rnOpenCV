
$(document).ready(function(){
    $.get("/info", function(data, status){
        $(".name_identifier").html(' ' + data.firstname + ' ' + data.lastname + ' ');
    });
    $('#help').on({
        'click':function(e){
            var popup = document.getElementById("myPopup1");
            popup.classList.toggle("show");
            setTimeout(function(){
                var popup2 = document.getElementById("myPopup2");
                popup2.classList.toggle("show");
            }, 2000);
            setTimeout(function(){
                var popup3 = document.getElementById("myPopup3"); 
                popup3.classList.toggle("show");
            }, 3000);
            setTimeout(function(){
                var popup4 = document.getElementById("myPopup4"); 
                popup4.classList.toggle("show");
            }, 4500);
            setTimeout(function(){
                var popup5 = document.getElementById("myPopup5"); 
                popup5.classList.toggle("show");
            }, 5500);

            setTimeout(function(){
                var popup = document.getElementById("myPopup1");
                popup.classList.toggle("hide");
                var popup2 = document.getElementById("myPopup2");
                popup2.classList.toggle("show");
                var popup3 = document.getElementById("myPopup3"); 
                popup3.classList.toggle("show");
                var popup4 = document.getElementById("myPopup4"); 
                popup4.classList.toggle("show");
                var popup5 = document.getElementById("myPopup5"); 
                popup5.classList.toggle("show");
            }, 10000);
        }
    });
    $("#menu1").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo1").collapse('show');
    });
    $("#menu2").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo2").collapse('show');
    });
    $("#menu3").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo3").collapse('show');    
    });
    $("#menu4").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo4").collapse('show');    
    });
    $("#menu5").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo5").collapse('show');    
    });
    $("#menu6").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo6").collapse('show');    
    });
    $("#menu7").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo7").collapse('show');    
    });
    $("#menu8").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo8").collapse('show');    
    });
    $("#menu9").click(function(e){
        for(var i = 1; i<=9; i++) $("#toggleDemo"+i).collapse('hide');
        $("#toggleDemo9").collapse('show');    
    });
    // SLIDERS ----------------------------------------

    $("#show_slide_canny").click(function() {
        $("#canny_slider").toggle();
    });

    $("#show_slide_blur").click(function() {
        $("#blur_slider").toggle();
    });
    $("#show_slide_resize").click(function() {
        $("#resize_slider").toggle();
    });

    //Image Thresholding
    $("#show_slide_simplethresholding").click(function() {
        $("#simplethresholding_slider").toggle();
        $("#adaptivethresholding_slider").hide();
    });
    $("#show_slide_adaptivethresholding").click(function() {
        $("#adaptivethresholding_slider").toggle();
        $("#simplethresholding_slider").hide();
    });

    // Morphological Transformations

    $("#show_slide_erode").click(function() {
        $("#erode_slider").toggle();
        $("#dilate_slider").hide();
        $("#opening_slider").hide();
        $("#gradient_slider").hide();
        $("#tophat_slider").hide();
        $("#blackhat_slider").hide();
        $("#closing_slider").hide();
    });

    $("#show_slide_dilate").click(function() {
        $("#dilate_slider").toggle();
        $("#erode_slider").hide();
        $("#opening_slider").hide();
        $("#gradient_slider").hide();
        $("#tophat_slider").hide();
        $("#blackhat_slider").hide();
        $("#closing_slider").hide();        
    });

    $("#show_slide_opening").click(function() {
        $("#opening_slider").toggle();
        $("#erode_slider").hide();
        $("#dilate_slider").hide();
        $("#gradient_slider").hide();
        $("#tophat_slider").hide();
        $("#blackhat_slider").hide();
        $("#closing_slider").hide();        
    });
    $("#show_slide_closing").click(function() {
        $("#closing_slider").toggle();
        $("#erode_slider").hide();
        $("#dilate_slider").hide();
        $("#gradient_slider").hide();
        $("#tophat_slider").hide();
        $("#blackhat_slider").hide();
        $("#opening_slider").hide();       
    });

    $("#show_slide_gradient").click(function() {
        $("#gradient_slider").toggle();
        $("#erode_slider").hide();
        $("#dilate_slider").hide();
        $("#opening_slider").hide();
        $("#tophat_slider").hide();
        $("#blackhat_slider").hide();      
        $("#closing_slider").hide();        
    });

    $("#show_slide_tophat").click(function() {
        $("#tophat_slider").toggle();
        $("#erode_slider").hide();
        $("#dilate_slider").hide();
        $("#opening_slider").hide();
        $("#gradient_slider").hide();
        $("#blackhat_slider").hide();
        $("#closing_slider").hide();        
    });

    $("#show_slide_blackhat").click(function() {
        $("#blackhat_slider").toggle();
        $("#erode_slider").hide();
        $("#dilate_slider").hide();
        $("#opening_slider").hide();
        $("#gradient_slider").hide();
        $("#tophat_slider").hide();
        $("#closing_slider").hide();        
    });
 
});

function validateScript() {
    var script_lines = document.getElementById('view_script').innerHTML;
    console.log("script_lines ------->>>>>>>>>>>>> "+script_lines);
    if (script_lines == "No script uploaded" || script_lines == "Image has no script\n"+"associated")
        return false;
    else
        return true;
}