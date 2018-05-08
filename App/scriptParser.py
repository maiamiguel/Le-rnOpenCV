
import sys
import cv2
import os, os.path
import json

			
# method that parses through a file with several pseudo-instructions and generates the associated JSON to be processed by openCV_effects.py
def scriptParser(file):
	print("FILE"+str(file))
	try:
		f = open(file,"r")
	except ValueError:
		return None
	if not f:
		return u"Failed to read file"
	inst = dict()
	# file contents processing into a dictionary where key=instruction number | value=efects+parameters
	index=0
	for line in f:
		if line.endswith(';\n'):        # check if each instruction ends correctly
			line = line[:-2]    
			inst[index] = line
			index+=1
		elif line.endswith(';'):
			line = line[:-2]
			inst[index] = line
			index+=1
		else:
			return u"Invalid file sintax"
	f.close() 
	dict_effects = dict()   # dictionary containing the effects and respective parameters
	effects = []            # list of effects (dictionary dict_efects)

	# Instruction processing
	# No error processing was made so in order to work properly the file needs to be correctly formated previously
	# The file instructions are as follows:
	# -> only one instruction per line
	# -> each instruction must end with a ";"
	# -> instructions that have parameters must follow the rule: EFFECT PAR1, PAR2;
	for i in inst.values():
		if i == "EYEDETECT":
			eye_dict = dict()
			eye_dict[u'name'] = u'eyedetect'
			effects.append(eye_dict)

		if i == "FACEDETECT":
			eye_dict = dict()
			eye_dict[u'name'] = u'facedetect'
			effects.append(eye_dict)

		if i == "FACEEYEDETECT":
			eye_dict = dict()
			eye_dict[u'name'] = u'faceeyedetect'
			effects.append(eye_dict)			

		if i == "BGR2HSV":
			hsv_dict = dict()
			hsv_dict[u'name'] = u'hsv'
			effects.append(hsv_dict)

		if i == "BGR2HLS":
			hls_dict = dict()
			hls_dict[u'name'] = u'hls'
			effects.append(hls_dict)

		if i == "BGR2GRAY":
			gray_dict = dict()
			gray_dict[u'name'] = u'gray'
			effects.append(gray_dict)

		if i[0:5] == "CANNY":
			new_i = i.replace(",","") 
			splitted = new_i.split(" ")
			canny_dict = dict()
			canny_dict[u'arg1'] = splitted[1]
			canny_dict[u'arg2'] = splitted[2]
			canny_dict[u'name'] = u'canny'
			effects.append(canny_dict)

		if i[0:4] == "BLUR":
			new_i = i.replace(",","") 
			splitted = new_i.split(" ")
			blur_dict = dict()
			blur_dict[u'arg1'] = splitted[1]
			blur_dict[u'arg2'] = splitted[2]
			blur_dict[u'name'] = u'blur'
			effects.append(blur_dict)

		if i == "MEDIANBLUR":
			medianblur_dict = dict()
			medianblur_dict[u'name'] = u'medianblur'
			effects.append(medianblur_dict)

		if i == "GAUSSIANBLUR":
			gaussianblur_dict = dict()
			gaussianblur_dict[u'name'] = u'gaussianblur'
			effects.append(gaussianblur_dict)

		#ERODE 3, 15;
		if i[0:5] == "ERODE":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			erode_dict = dict()
			erode_dict[u'arg1'] = splitted[1]
			erode_dict[u'arg2'] = splitted[2]
			erode_dict[u'name'] = u'erode'
			effects.append(erode_dict)

		#DILATE 3, 15;
		if i[0:6] == "DILATE":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			dilate_dict = dict()
			dilate_dict[u'arg1'] = splitted[1]
			dilate_dict[u'arg2'] = splitted[2]
			dilate_dict[u'name'] = u'dilate'
			effects.append(dilate_dict)

		#OPENING 3, 15;
		if i[0:7] == "OPENING":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			opening_dict = dict()
			opening_dict[u'arg1'] = splitted[1]
			opening_dict[u'name'] = u'opening'
			effects.append(opening_dict)

		#CLOSING 3, 15;
		if i[0:7] == "CLOSING":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			closing_dict = dict()
			closing_dict[u'arg1'] = splitted[1]
			closing_dict[u'name'] = u'closing'
			effects.append(closing_dict)

		#GRADIENT 3, 15;
		if i[0:8] == "GRADIENT":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			gradient_dict = dict()
			gradient_dict[u'arg1'] = splitted[1]
			gradient_dict[u'name'] = u'gradient'
			effects.append(gradient_dict)

		#TOPHAT 3, 15;
		if i[0:6] == "TOPHAT":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			tophat_dict = dict()
			tophat_dict[u'arg1'] = splitted[1]
			tophat_dict[u'name'] = u'tophat'
			effects.append(tophat_dict)

		#BLACKHAT 3, 15;
		if i[0:8] == "BLACKHAT":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			blackhat_dict = dict()
			blackhat_dict[u'arg1'] = splitted[1]
			blackhat_dict[u'name'] = u'blackhat'
			effects.append(blackhat_dict)

		if i[0:6] == "RESIZE":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			resize_dict = dict()
			resize_dict[u'arg1'] = splitted[1]
			resize_dict[u'arg2'] = splitted[2]
			resize_dict[u'name'] = u'resize'
			effects.append(resize_dict)

		if i[0:18] == "SIMPLETHRESHOLDING":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			blackhat_dict = dict()
			blackhat_dict[u'arg1'] = splitted[1]
			blackhat_dict[u'name'] = u'simplethresholding'
			effects.append(blackhat_dict)

		if i[0:20] == "ADAPTIVETHRESHOLDING":
			new_i = i.replace(",","")
			splitted = new_i.split(" ")
			blackhat_dict = dict()
			blackhat_dict[u'arg1'] = splitted[1]
			blackhat_dict[u'name'] = u'adaptivethresholding'
			effects.append(blackhat_dict)			
		#
		# < remaining effects go here >
		#

	json_dict = { u'effect': effects, u'file': {}}
		
	print(effects)
	#print(json_dict)
	#json_dict = json.loads(json_dict)

	print("PARSER RETURN INFO: "+str(json_dict))
	return json_dict

def scriptCreator (info, destination, altered_filename):

	script_file_name = "app"+destination+"/SCRIPT_"+altered_filename+".txt"
	print "\nscript_file_name ----> "+ script_file_name
	script_file = open(script_file_name,"w")
	
	for i in info['effect']:
		
		if i['name'] == "none":
			continue
			## Effects
			## Canny
		elif i['name'] == "canny":
			line = "CANNY "+ str(i['arg1'])+", "+str(i['arg2'])+";\n"
			script_file.write(line);
			##CvtColor
		elif i['name'] == "hsv":
			line = "BGR2HSV;\n"
			script_file.write(line);
		elif i['name'] == "gray":
			line = "BGR2GRAY;\n"
			script_file.write(line);
		elif i['name'] == "hls":
			line = "BGR2HLS;\n"
			script_file.write(line);
			## Image Filtering
			## Median Blur
		elif i['name'] == "medianblur":
			line = "MEDIANBLUR;\n"
			script_file.write(line);
			## Gaussian Blur
		elif i['name'] == "gaussianblur":
			line = "GAUSSIANBLUR;\n"
			script_file.write(line);
			## Blur
		elif i['name'] == "blur":
			line = "BLUR "+ str(i['arg1'])+", "+str(i['arg2'])+";\n"
			script_file.write(line);
			# Morfological operations
			# In these functions the kernel is calculated through 2 odd parameters 
			# with a range from 3 to 15
			## Erode 
		elif i['name'] == "erode":
			line = "ERODE "+ str(i['arg1'])+", "+str(i['arg2'])+";\n"
			script_file.write(line);
			## Dilate
		elif i['name'] == "dilate":
		    line = "DILATE "+ str(i['arg1'])+", "+str(i['arg2'])+";\n"
		    script_file.write(line);
			## opening, erode seguido de um dilate
		elif i['name'] == "opening":
			line = "OPENING "+ str(i['arg1'])+";\n"
			script_file.write(line);
			## closing, dilate seguido de um erode
		elif i['name'] == "closing":
			line = "CLOSING "+ str(i['arg1'])+";\n"
			script_file.write(line);
			## gradient
		elif i['name'] == "gradient":
			line = "GRADIENT "+ str(i['arg1'])+";\n"
			script_file.write(line);
			## top hat
		elif i['name'] == "tophat":
			line = "TOPHAT "+ str(i['arg1'])+";\n"
			script_file.write(line);
			## black hat
		elif i['name'] == "blackhat":
			line = "BLACKHAT "+ str(i['arg1'])+";\n"
			script_file.write(line);
			## Face Detection
		elif i['name'] == "facedetect":
			line = "FACEDETECT;\n"
			script_file.write(line);
			##Eyes Detection
		elif i['name'] == "eyedetect":
			line = "EYEDETECT;\n"
			script_file.write(line);
			## Face & Eyes Detection
		elif i['name'] == "faceeyedetect":
			line = "FACEEYEDETECT;\n"
			script_file.write(line);
			## Resize
		elif i['name'] == "resize":
		    line = "RESIZE "+ str(i['arg1'])+", "+str(i['arg2'])+";\n"
		    script_file.write(line);			
			## Simple Thresholding 
		elif i['name'] == "simplethresholding":
			line = "SIMPLETHRESHOLDING "+ str(i['arg1'])+";\n"
			script_file.write(line);
		elif i['name'] == "adaptivethresholding":
			line = "ADAPTIVETHRESHOLDING "+ str(i['arg1'])+";\n"
			script_file.write(line);	
		else:
			line = i['name']+";\n"
			script_file.write(line);	


	script_file.close()

	return "SCRIPT_"+altered_filename+".txt"