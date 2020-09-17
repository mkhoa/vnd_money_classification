#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Sep 17 17:01:20 2020

@author: mkhoa
"""

import shutil # copy, move file
import os # miscellaneous operation system interfaces
import pathlib
import random
import tensorflow as tf
import math
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np

tf.random.set_seed(42) # please feel free to change this seed number
np.random.seed(42) # please feel free to change this seed number

#Create dir
DATA_ROOT_FOLDER = "vnd_currency_project/data"
DATA_RAW_FOLDER = "vnd_currency_project/data/raw"
DATA_TRAIN_FOLDER = "vnd_currency_project/data/train"
DATA_TEST_FOLDER = "vnd_currency_project/data/test"

# Downloaded Zip File
raw_zip = "vnd_currency_project/data/raw/Full_Dataset_VND_Currency.zip"

# Target directory 
extract_dir = "vnd_currency_project/data/raw/"

# Format of archie file 
archive_format = "zip"

# Unpack the archive file  
shutil.unpack_archive(raw_zip, extract_dir, archive_format)

