var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    }
});

$(function(){
    $(".tg").click(function(event) {
        event.preventDefault();
        $(this).next('.stg').slideToggle();
    });
});

// MODAL

	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtnCanny");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

	// When the user clicks the button, open the modal 
	
	function open_modal(id_button) {
	    var modal = document.getElementById('myModal');
	    modal.style.display = "block";

	    //canny
	    if (id_button == 0) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
			sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/dd/d1a/group__imgproc__feature.html#ga04723e007ed888ddf11d9ba04e2232de" ></object>';
	    }
	    
	    //Image filtering
	    else if (id_button == 1){
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html"></object>';	
	    }

	    //Blur
	    else if (id_button == 2){
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#ga8c45db9afe636703801b0b2e440fce37"></object>';	
	    }

	    //CVT Color
	    else if (id_button == 3){
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d7/d1b/group__imgproc__misc.html#ga397ae87e1288a81d2363b61574eb8cab"></object>';	
	    }

	    //RGB <-> gray
	    else if (id_button == 4){
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = "RGB <-> GRAY  : ​code​ CV_BGR2GRAY"
		}

	    //RGB <-> HSV
	    else if (id_button == 5){
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = "RGB <-> HSV : ​code  ( CV_BGR2HSV, CV_RGB2HSV, CV_HSV2BGR, CV_HSV2RGB )"	
	    }

	    //RGB <-> HSL
	    else if (id_button == 6){
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = "RGB <-> HLS  : ​code ( CV_BGR2HLS, CV_RGB2HLS, CV_HLS2BGR, CV_HLS2RGB )"
	    }

	    //Feature detection
	    if (id_button == 7) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/dd/d1a/group__imgproc__feature.html" ></object>';
	    }

	    //Morphological Transformations
	    if (id_button == 8) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d9/d61/tutorial_py_morphological_ops.html" ></object>';
	    }

	    //Erode
	    if (id_button == 9) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#gaeb1e0c1033e3f6b891a25d0511362aeb" ></object>';
	    }

	    //Erode
	    if (id_button == 9) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#gaeb1e0c1033e3f6b891a25d0511362aeb" ></object>';
	    }

	    //Dilate
	    if (id_button == 10) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#ga4ff0f3318642c4f469d0e11f242f3b6c"></object>';
	    }

	    //Opening
	    if (id_button == 11) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/2.4/doc/tutorials/imgproc/opening_closing_hats/opening_closing_hats.html#opening" ></object>';
	    }

	    //Closing
	    if (id_button == 12) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#gga7be549266bad7b2e6a04db49827f9f32a68c4b9c6144a30bcd52d1cdf39bb30e1" ></object>';
	    }

	    //Gradient
	    if (id_button == 13) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			//sig.innerHTML = '<p>It is the difference between dilation and erosion of an image. The result will look like the outline of the object.</p><h3>cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)</h3><p> <h3>img : </h3>The source image</p><p><h3>cv2.MORPH_GRADIENT:</h3>Flag indicating the morphological transformation GRADIENT</p><p><h3>Kernel:</h3>This is the kernel we will use to perform the operation. If we do not specify, the default is a simple 3x3 matrix.</p>'; 
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#gga7be549266bad7b2e6a04db49827f9f32a887efd64e82cee95a62f851c7f3b617b"></object>';
		}

	    //TopHat
	    if (id_button == 14) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#gga7be549266bad7b2e6a04db49827f9f32ada67be24f4dce6d7e6c57527f8724f3b" ></object>';
	    }

	    //BlackHat
	    if (id_button == 15) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#gga7be549266bad7b2e6a04db49827f9f32a24d27f56df6b98b1cb92ae8108d4638f" ></object>';
	    }

	    //Face & eyes detection
	    if (id_button == 16) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d7/d8b/tutorial_py_face_detection.html" ></object>';
	    }

	    //Images Transformations
	    if (id_button == 17) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/da/d54/group__imgproc__transform.html" ></object>';
	    }

	    //Resize
	    if (id_button == 18) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d" ></object>';
	    }

	    //Image thresholding
	    if (id_button == 19) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/3.2.0/d7/d4d/tutorial_py_thresholding.html" ></object>';
	    }

	    //Simple thresholding
	    if (id_button == 20) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
			sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d7/d4d/tutorial_py_thresholding.html" ></object>';
	    }

	    //Image matching
	    if (id_button == 21) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
	    	sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/3.2.0/d7/d4d/tutorial_py_thresholding.html"></object>';
	    }

	   	//Scripts
	    if (id_button == 22) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
	    	sig.innerHTML = "Section to save personalized scripts for future usage.";
	    }

	    //Median Blur
	    if (id_button == 23) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
	    	sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#ga564869aa33e58769b4469101aac458f9"></object>';
	    }

	    //GaussianBlur
	    if (id_button == 24) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
	    	sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/trunk/d4/d86/group__imgproc__filter.html#gaabe8c836e97159a9193fb0b11ac52cf1"></object>';
	    }

		//Adaptive thresholding
	    if (id_button == 25) {
	    	document.getElementById('func-text').style.display = 'none';
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
	    	sig.innerHTML = '<object style="height: 400px; width: 100%;" type="text/html" data="http://docs.opencv.org/3.2.0/d7/d4d/tutorial_py_thresholding.html"></object>';
	    }

	    //Extra functions
	    if (id_button == 26) {
	    	var sig = document.getElementById('documentarion-text');
	    	sig.innerHTML = "";
	    	document.getElementById('func-text').removeAttribute('style');
	    }
	}

function downloadImage() {
	var url = document.getElementById("uploadimage").src;
	var name = url.substring(url.lastIndexOf("/") + 1);
	document.getElementById("image_download").setAttribute('download', name);
	document.getElementById("image_download").setAttribute('href', url);
}

// Colour Histogram
function hist(){
	// Get the modal
	var modal = document.getElementById('hist');

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById('img_toExpand');
	var modalImg = document.getElementById("img_01");
	var captionText = document.getElementById("caption");
	img.onclick = function(){
	    modal.style.display = "block";
	    modalImg.src = this.src;
	    captionText.innerHTML = this.alt;
	}
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close_img")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() { 
		modal.style.display = "none";
	}
}