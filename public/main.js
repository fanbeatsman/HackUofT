
function checkCheckpoints(){
	var x = document.createElement("INPUT");
  x.setAttribute("type", "checkbox"); 	
  var node = document.createElement("LI");                 // Create a <li> node
	var textnode = document.createTextNode("Water");         // Create a text node
	node.appendChild(textnode);                      
	document.getElementById("checkboxes").appendChild(node);
}
     
