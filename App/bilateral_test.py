#!/usr/bin/python
# coding= utf-8

import cv2
import numpy as np
import sys

image = cv2.imread(sys.argv[1])
processed = cv2.bilateralFilter(image,int(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5]))
cv2.imwrite(sys.argv[2],processed)