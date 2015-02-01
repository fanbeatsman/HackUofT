var request = require("request"); // 

// "request" module allows nodejs server to send requests 
exports.sendAPI = function(){
	console.log("Button clicked!");
	// request({
	//   uri: "http://www.sitepoint.com",
	//   method: "GET",
	//   form: {
	//     name: "Bob"
	//   }
	// }, function(error, response, body) {
	//   console.log(body);
	// });
}

exports.init = function() {
	// console.log("button clicked!");
	// $(document).on('click', '#button', console.log("button clicked!"));
}