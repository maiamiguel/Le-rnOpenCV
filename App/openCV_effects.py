#!/usr/bin/python
# coding= utf-8

import sys
import cv2
import os, os.path
import numpy as np
import time
import Image


def createEffect(info,destination):

	try:
		## Leitura da imagem
		hist_color = True
		originalImg = destination
		image = cv2.imread(destination,cv2.IMREAD_UNCHANGED)
		extension = os.path.splitext(destination)[1]
		destination = (destination.rsplit('/',1)[0]+"/"+destination.rsplit('/',1)[1].rsplit('.',1)[0])
		for i in info['effect']:
			print i
			print i['name']
			if i['name'] == "none":
				processed = image				
				## Effects
				## Canny
			elif i['name'] == "canny":
				processed = cv2.Canny(image,float(i['arg1']),float(i['arg2']))
				##CvtColor
			elif i['name'] == "hsv":
				processed = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
			elif i['name'] == "gray":

				processed = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
			elif i['name'] == "hls":
				processed = cv2.cvtColor(image, cv2.COLOR_BGR2HLS)
				## Blur
			elif i['name'] == "blur":
				processed = cv2.blur(image,(int(i['arg1']),int(i['arg2'])))
				# Morfological operations
				# In these functions the kernel is calculated through 2 odd parameters 
				# with a range from 3 to 15
				## Erode 
			elif i['name'] == "erode":
			    kernel = np.ones((int(i['arg1']),int(i['arg1'])),np.uint8)
			    iterations = int(i['arg2'])
			    processed = cv2.erode(image,kernel,iterations)
				##	Dilate
			elif i['name'] == "dilate":
			    kernel = np.ones((int(i['arg1']),int(i['arg1'])),np.uint8)
			    iterations = int(i['arg2'])
			    processed = cv2.dilate(image,kernel,iterations)
				## opening, erode seguido de um dilate
			elif i['name'] == "opening":
			    kernel = np.ones((int(i['arg1']),int(i['arg1'])),np.uint8)
			    processed = cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)
				## closing, dilate seguido de um erode
			elif i['name'] == "closing":
			    kernel = np.ones((int(i['arg1']),int(i['arg1'])),np.uint8)
			    processed = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
				## gradient
			elif i['name'] == "gradient":
			    kernel = np.ones((int(i['arg1']),int(i['arg1'])),np.uint8)
			    processed = cv2.morphologyEx(image, cv2.MORPH_GRADIENT, kernel)
				## top hat
			elif i['name'] == "tophat":
			    kernel = np.ones((int(i['arg1']),int(i['arg1'])),np.uint8)
			    processed = cv2.morphologyEx(image, cv2.MORPH_TOPHAT, kernel)
				## black hat
			elif i['name'] == "blackhat":
			    kernel = np.ones((int(i['arg1']),int(i['arg1'])),np.uint8)
			    processed = cv2.morphologyEx(image, cv2.MORPH_BLACKHAT, kernel)
			
				## Face Detection
			elif i['name'] == "facedetect":
				processed = faceDetect(image)

				## Face Detection
			elif i['name'] == "eyedetect":
				processed = eyeDetect(image)

				## Face Detection
			elif i['name'] == "faceeyedetect":
				processed = faceeyeDetect(image)

				################################################# added ############################

				## Median Blur
			elif i['name'] == "medianblur":
				processed = cv2.medianBlur(image,5)

				## Gaussian Blur
			elif i['name'] == "gaussianblur":
				processed = cv2.GaussianBlur(image,(5,5),0)

				## Resize
			elif i['name'] == "resize":
				x = int(i['arg1'])	#	multiplicar x 
				y = int(i['arg2'])	#	multiplicar y
				processed= cv2.resize(image,None,fx=x, fy=y, interpolation = cv2.INTER_CUBIC)

				#Simple thresholding,  code[x] .. x e o argumento de entrada que escolhe o codigo dentro do array
			elif i['name'] == "simplethresholding":
				hist_color = False
				image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
				code = [cv2.THRESH_BINARY, cv2.THRESH_BINARY_INV, cv2.THRESH_TRUNC, cv2.THRESH_TOZERO, cv2.THRESH_TOZERO_INV]
				
				tmp = int(i['arg1'])

				mp, processed = cv2.threshold(image,127,255,code[tmp]) # code[x]  x argumento de entrada
				#Adaptive thresholding,  code[x] .. x e o argumento de entrada que escolhe o codigo dentro do array
			elif i['name'] == "adaptivethresholding":
				hist_color = False
				image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
				code = [cv2.ADAPTIVE_THRESH_MEAN_C, cv2.ADAPTIVE_THRESH_GAUSSIAN_C]
				tmp = int(i['arg1'])

				processed = cv2.adaptiveThreshold(image,255,code[tmp], cv2.THRESH_BINARY,11,2)
			elif i['name'] == "matching":
				hist_color = False

				current_dir = os.path.dirname(os.path.abspath(__file__))+"/app/uploads"
				matchImg = os.path.join(current_dir, str(i['matchImg']))
				method = str(i['method'])
				print "MAtchingIMG: "+matchImg
				print "OriginalIMG: "+originalImg
				processed = matching(originalImg,matchImg,method)
			else:
				hist_color = False
				argv = i['functionArgs']
				argvString = ""
				for arg in argv:
				    if arg != ',':
				        argvString += ' '+str(arg)
				
				print "\nargvString: "+ argvString
				codelocal = str(i['filelocation'])
				current_dir1 = os.path.dirname(os.path.abspath(__file__))
				print current_dir1
				print codelocal
				print "python "+current_dir1+str(i['filelocation'])+" "+originalImg+" "+originalImg+"addedFunc"+extension+argvString				
				os.system("python "+current_dir1+str(i['filelocation'])+" "+originalImg+" "+originalImg+"addedFunc"+extension+argvString)


				processed = cv2.imread(originalImg+"addedFunc"+extension,cv2.IMREAD_UNCHANGED)
				#returnjson = '{"path" : "'+str("/app/uploads/"+originalImg+"addedFunc.jpg")+'"}'
				#returnmessage = json.loads(returnjson)
				#print returnmessage
				#cherrypy.response.headers["Content-Type"] = "application/json"				
			######################################################################################

		

			image = processed
			print processed
			destination = destination +i['name']
			print destination
			millis = int(round(time.time() * 1000))

			destination = destination+str(millis)+extension
		
		## Escrita da imagem
		cv2.imwrite(destination,processed)

		if(is_grey_scale(destination)):
			print "is_grey_scale"
			hist_color = False
		else:
			hist_color = is_b_or_w(processed)

		print "HIST_COLOR"+str(hist_color)

		if(hist_color):
			# # histograma cores
			h = np.zeros((300,256,3))
			 
			bins = np.arange(256).reshape(256,1)
			color = [ (255,0,0),(0,255,0),(0,0,255) ]
			 
			for ch, col in enumerate(color):
			    hist_item = cv2.calcHist([processed],[ch],None,[256],[0,255])
			    cv2.normalize(hist_item,hist_item,0,255,cv2.NORM_MINMAX)
			    hist=np.int32(np.around(hist_item))
			    pts = np.column_stack((bins,hist))
			    cv2.polylines(h,[pts],False,col)
			
			millis = int(round(time.time() * 1000))
			h=np.flipud(h)
			his_dest = 'app/images/histogram_color'+str(millis)+'.jpg'
			cv2.imwrite(his_dest,h) 
			his_dest = his_dest.split('/', 1)[1]
		else:
			## histograma preto e branco
			h = np.zeros((300,256,3))
			 
			bins = np.arange(256).reshape(256,1)
			color = [ (255,255,255) ]
			 
			for ch, col in enumerate(color):
			    hist_item = cv2.calcHist([processed],[0],None,[256],[0,255])
			    cv2.normalize(hist_item,hist_item,0,255,cv2.NORM_MINMAX)
			    hist=np.int32(np.around(hist_item))
			    pts = np.column_stack((bins,hist))
			    cv2.polylines(h,[pts],False,col)

			millis = int(round(time.time() * 1000))
			h=np.flipud(h)
			his_dest = 'app/images/histogram_blackwhite'+str(millis)+'.jpg'
			cv2.imwrite(his_dest,h) 
			his_dest = his_dest.split('/', 1)[1]
		
		

	except cv2.error as e:
		
		return None,None
		
	return (destination.rsplit('/',1)[1],his_dest)

def faceDetect(img):
	face_cascade = cv2.CascadeClassifier('opencvfiles/haarcascades/haarcascade_frontalface_default.xml')	

	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	faces = face_cascade.detectMultiScale(gray, 1.3, 5)
	for (x,y,w,h) in faces:
	    cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),10)

	return img


def eyeDetect(img):
	face_cascade = cv2.CascadeClassifier('opencvfiles/haarcascades/haarcascade_frontalface_default.xml')	
	eye_cascade = cv2.CascadeClassifier('opencvfiles/haarcascades/haarcascade_eye.xml')


	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	faces = face_cascade.detectMultiScale(gray, 1.3, 5)
	for (x,y,w,h) in faces:
	    roi_gray = gray[y:y+h, x:x+w]
	    roi_color = img[y:y+h, x:x+w]
	    eyes = eye_cascade.detectMultiScale(roi_gray)
	    for (ex,ey,ew,eh) in eyes:
	        cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),10)

	return img

def faceeyeDetect(img):
	face_cascade = cv2.CascadeClassifier('opencvfiles/haarcascades/haarcascade_frontalface_default.xml')	
	eye_cascade = cv2.CascadeClassifier('opencvfiles/haarcascades/haarcascade_eye.xml')


	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	faces = face_cascade.detectMultiScale(gray, 1.3, 5)
	for (x,y,w,h) in faces:
	    cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),10)
	    roi_gray = gray[y:y+h, x:x+w]
	    roi_color = img[y:y+h, x:x+w]
	    eyes = eye_cascade.detectMultiScale(roi_gray)
	    for (ex,ey,ew,eh) in eyes:
	        cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),10)

	return img


def matching(originalImg, matchImg, meth):

	img = cv2.imread(originalImg,0)
	img2 = img.copy()
	
	template = cv2.imread(matchImg,0)
	w, h = template.shape[::-1]

	# All the 6 methods for comparison in a list
	methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
	            'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']


	img = img2.copy()
	method = eval(meth)

	# Apply template Matching
	res = cv2.matchTemplate(img,template,method)
	min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

	# If the method is TM_SQDIFF or TM_SQDIFF_NORMED, take minimum
	if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
	    top_left = min_loc
	else:
	    top_left = max_loc
	bottom_right = (top_left[0] + w, top_left[1] + h)

	cv2.rectangle(img,top_left, bottom_right,0, 2)
	cv2.imwrite("match"+meth+".jpg", cv2.rectangle(img,top_left, bottom_right,0, 2))

	return img


def is_grey_scale(img_path):
    im = Image.open(img_path).convert('RGB')
    print im
    w,h = im.size
    for i in range(w):
        for j in range(h):
            r,g,b = im.getpixel((i,j))
            if r != g != b: return False
    return True

def is_b_or_w(image, black_max_bgr=(40, 40, 40)):
    # use this if you want to check channels are all basically equal
    # I split this up into small steps to find out where your error is coming from
    mean_bgr_float = np.mean(image, axis=(0,1))
    mean_bgr_rounded = np.round(mean_bgr_float)
    mean_bgr = mean_bgr_rounded.astype(np.uint8)
    # use this if you just want a simple threshold for simple grayscale
    # or if you want to use an HSV (V) measurement as in your example
    mean_intensity = int(round(np.mean(image)))
    return 'black' if np.all(mean_bgr < black_max_bgr) else 'white'