#!/usr/bin/python
# coding= utf-8

import cv2
import numpy as np
import sys

image = cv2.imread(sys.argv[1])
processed = cv2.Canny(image,float(sys.argv[3]),float(sys.argv[4]))
cv2.imwrite(sys.argv[2],processed)
