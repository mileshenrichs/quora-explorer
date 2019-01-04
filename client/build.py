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

# copy contents of root folder into temp folder 
print('Initializing temp directory in project root')
clientDir = os.getcwd()
tempDir = os.path.join(os.path.dirname(clientDir), 'tmp')

print('Copying contents of client into temp directory')
copy_tree(clientDir, tempDir)

# move contents of temp to builds/qe-build-chrome and builds/qe-build-firefox
print('Copying contents of temp to build folders for each browser')
buildsDir = os.path.join(clientDir, 'builds')
chromeBuildDir = os.path.join(buildsDir, 'qe-build-chrome')
firefoxBuildDir = os.path.join(buildsDir, 'qe-build-firefox')
copy_tree(tempDir, chromeBuildDir)
copy_tree(tempDir, firefoxBuildDir)

print('Contents transferred, deleting temp directory')
shutil.rmtree(tempDir, ignore_errors=True)

# customize chrome build
print('Customizing Chrome build')
os.remove(os.path.join(chromeBuildDir, 'manifest-firefox.json'))
os.remove(os.path.join(chromeBuildDir, 'popover-firefox.css'))
os.rename(os.path.join(chromeBuildDir, 'manifest-chrome.json'), os.path.join(chromeBuildDir, 'manifest.json'))

# customize firefox build
print('Customizing Firefox build')
os.remove(os.path.join(firefoxBuildDir, 'manifest-chrome.json'))
os.remove(os.path.join(firefoxBuildDir, 'popover-chrome.css'))
os.rename(os.path.join(firefoxBuildDir, 'manifest-firefox.json'), os.path.join(firefoxBuildDir, 'manifest.json'))

# strip unneeded files for production build: build.py, popover.html
print('Stripping unneeded development files')
os.remove(os.path.join(chromeBuildDir, 'build.py'))
os.remove(os.path.join(chromeBuildDir, 'popover.html'))
os.remove(os.path.join(firefoxBuildDir, 'build.py'))
os.remove(os.path.join(firefoxBuildDir, 'popover.html'))

# compress zip archives (for upload to extension stores)
print('Compressing zip archives')
shutil.make_archive(chromeBuildDir, 'zip', os.path.join(buildsDir, 'qe-build-chrome'))
shutil.make_archive(firefoxBuildDir, 'zip', os.path.join(buildsDir, 'qe-build-firefox'))

print('#####  Build complete!  #####')