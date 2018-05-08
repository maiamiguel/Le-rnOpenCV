#!/usr/bin/python
# coding= utf-8

import cv2
import numpy as np
import sys

img = cv2.imread(sys.argv[1])

image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
code = [cv2.ADAPTIVE_THRESH_MEAN_C, cv2.ADAPTIVE_THRESH_GAUSSIAN_C]
tmp = int(sys.argv[3])

processed = cv2.adaptiveThreshold(image,255,code[tmp], cv2.THRESH_BINARY,11,2)

cv2.imwrite(sys.argv[2],processed)