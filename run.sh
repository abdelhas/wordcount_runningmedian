#!/usr/bin/env bash

# first I'll load all my dependencies
npm install

# next I'll make sure that all my programs have the proper permissions
chmod a+x ./src/wordCount.js
chmod a+x ./src/runningMedian.js

# finally I'll execute my programs, with the input directory wc_input and output the files in the directory wc_output
node ./src/wordCount.js
node ./src/runningMedian.js
