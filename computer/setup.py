# Source - https://stackoverflow.com/a/39811884
# Posted by kmario23, modified by community. See post 'Timeline' for change history
# Retrieved 2026-06-17, License - CC BY-SA 4.0

from setuptools import setup

setup(
   name='computer',
   version='1.0.0',
   description='Computer module for handling sensor data and serial communication.',
   author='',
   author_email='',
   packages=['computer'],  #same as name
   install_requires=['pyserial'], #external packages as dependencies
)
