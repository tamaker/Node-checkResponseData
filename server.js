var request = require('request');
var fs = require('fs');
var path = require('path');



function compareData(incomingjson){
	// THE ARCHIVED FILE TO OPEN AND CHECK AGAINST...
	var filePath = path.join(__dirname, 'my_file.txt');

	// USE FS TO OPEN AND READ THE FILE CONTENT...
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
	    if (!err){
	    	// IF THE READ FILES' CONTENT EQUALS THE 
	    	// JSON STRING PASSED INTO THIS FUNCTION...
		    if (data === incomingjson){
		    		// IF THE DATA (STRINGS) DON'T MATCH...
		    		console.log('MATCH, no update as of ' + new Date().toLocaleString());
		    } else {
		    	// IF THEY DO MATCH...
		    	console.log('**************************');
				console.log('UPDATED DATA ' + new Date().toLocaleString());
				console.log('**************************');

				// SAVE THE NEW DATA TO THE LOCAL FILE FOR FUTURE COMPARISONS...
				saveData(incomingjson);
		    }
	    } else {
	    	// ERROR READING LOCAL FILE...
	        console.log(err);
	    }
	});
};




function saveData(bodytext){
	// SAVE THE DATA TO A LOCAL FILE
	var stream = fs.createWriteStream("my_file.txt");
	stream.once('open', function(fd) {
	  stream.write(bodytext);
	  stream.end();
	});
};




function runLoop(){
		// REPEATEDLY READ THE RESPONSE OF THE URL... PASSING IN THE REQUIRED FORM VARS...
		request.post({url:'https://news.ycombinator.com', form: {
			// IF I WANTED TO SEND POST VARS ALONG WITH THE REQUEST...
			//key:'value'
		}}, function(err,httpResponse,body){ 
				//myArray = JSON.parse(body);     // IF I WANTED TO PARSE THE JSON RESPONSE...

				// RUN THE COMPARISON FUNCTION
				compareData(body);
		});
};




// START THE CHECK... DO RE-CHECK EVERY 5 SECONDS
setInterval(function(){
	runLoop();
}, 5000)







