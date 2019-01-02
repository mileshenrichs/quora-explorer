# Due to a browser incompatibility involving file paths to images in CSS, two different manifests are needed for Chrome and Firefox, respectively.
# As a result, the contents of client/ can't be directly packaged into an extension for either platform
# This script transforms the source folder into builds that can be packaged and uploaded to Chrome/Firefox extension repositories
# To invoke the script, enter the following command in cmd at quora-explorer/client: "python build.py"

import shutil
import os
from distutils.dir_util import copy_tree

# -------------------------------------------------------------------------------------------------------------------------------------------

# delete existing build folder
print('Deleting existing build folder')
shutil.rmtree('builds', ignore_errors=True)

# copy contents of root folder into builds/qe-build-chrome and builds/qe-build-firefox
print('Initializing temp directory in project root')
clientDir = os.getcwd()
tempDir = os.path.dirname(clientDir) + '\\tmp'

print('Copying contents of client into temp directory')
copy_tree(clientDir, tempDir)

print('Copying contents of temp to build folders for each browser')
chromeBuildDir = clientDir + '\\builds\\qe-build-chrome'
firefoxBuildDir = clientDir + '\\builds\\qe-build-firefox'
copy_tree(tempDir, chromeBuildDir)
copy_tree(tempDir, firefoxBuildDir)

print('Contents transferred, deleting temp directory')
shutil.rmtree(tempDir, ignore_errors=True)

# customize chrome build
print('Customizing Chrome build')
os.remove(chromeBuildDir + '\\manifest-firefox.json')
os.remove(chromeBuildDir + '\\popover-firefox.css')
os.rename(chromeBuildDir + '\\manifest-chrome.json', chromeBuildDir + '\\manifest.json')

# customize firefox build
print('Customizing Firefox build')
os.remove(firefoxBuildDir + '\\manifest-chrome.json')
os.remove(firefoxBuildDir + '\\popover-chrome.css')
os.rename(firefoxBuildDir + '\\manifest-firefox.json', firefoxBuildDir + '\\manifest.json')

print('#####  Build complete!  #####')