"use strict";
// require modules
var fs = require("graceful-fs");
var Q = require("q");

// set input output sources
var inputFolder = "./wc_input";
var outputFile = "./wc_output/wc_result.txt";

// get input files
function getInputFiles(inputFolder) {
    return fs.readdirSync(inputFolder);
};

// reset output file
fs.truncate(outputFile, 0)

// init word count object
var wordCount = {};


Q.all(getInputFiles(inputFolder).map(function(file) {
    // read files
    fs.readFileSync(inputFolder + "/" + file).toString().split('\n').forEach(
        function (line) { 
          // get lines
	  var words = line
              .replace(/[.,?{}!$*\/\\\[\]~;():#"'-]/g, " ")
              .replace(/\s+/g, " ")
              .toLowerCase()
              .split(" ");
	  // add counts of words to object
	  words.forEach(function (word) {
	    // set word key 
            if (!(wordCount.hasOwnProperty(word)) && word !== '') {
              wordCount[word] = 0;
            };
	    // increment word occurence
            if (word !== '') { 
		wordCount[word]++;
	    };
    	  });
	});
    
    return 'Word Count task complete.';
}))
.done(function (result) {
    // words sort then output to result file
    Object.keys(wordCount)
      .sort()
      .forEach(function (key) {
        if (key.length > 5) {
	  fs.appendFile(outputFile, key + '   	' + wordCount[key] + "\n", function (err) {
    		if (err) throw err;
	  });
	} else { 
	  fs.appendFile(outputFile, key + '	   	' + wordCount[key] + "\n", function (err) {
    		if (err) throw err;
	  });	
	};
    });
  // Done
});

