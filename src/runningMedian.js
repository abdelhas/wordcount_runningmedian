"use strict";

// require modules
var fs = require("graceful-fs");
var Q = require("q");
var _ = require("underscore");

// input and output sources
var inputFolder = "./wc_input";
var outputFile = "./wc_output/med_result.txt";

// get sorted input files
function getInputFiles(inputFolder) {
    return fs.readdirSync(inputFolder).sort();
};

// reset output file
fs.truncate(outputFile, 0)

// init variables
var linesLengths = [];
var runningMedian = 0;
var content;
var deferred = Q.defer();

Q.all(getInputFiles(inputFolder).map(function(file) {
    //console.log(file);
    fs.readFile(inputFolder + "/" + file, function read(err, data) {
	if (err) {
        	deferred.reject(new Error(error));
    	}
    	content = data;
        content.toString().split('\n').forEach(
        function (line) {
        
          var words = line
              .replace(/[.,?{}!$*\/\\\[\]~;():#"'-]/g, " ") // replace special characters
              .replace(/\s+/g, " ") // normalize white space
              .toLowerCase() // set to lower case
              .split(" "); // split words
          
	  words = _.without(words, ''); // remove empty elements from array
          
	  if (words.length>0) { // check for empty lines
          
		linesLengths.push(words.length); // push line length to array
	
	 	runningMedian = median(linesLengths).toFixed(1); // calculate median
        
	  	fs.appendFile(outputFile, runningMedian + "\n", function (err) { // output median to result file
                	if (err) throw err;
          	});
	  };
        });
    });
}))
.then(function (result) {
    // Done

});

// calculate median function
function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}
