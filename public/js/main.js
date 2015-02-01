$( document ).ready(function() {
    // console.log( "ready!" );    
    document.getElementById("button").onclick = function(){sendAPI();};
});


function sendAPI(){
    if (document.getElementById("search").value){
        //searching
        var query = document.getElementById("search").value
        alert("You have searched for this: " + query);
    }
    else {
        //checkboxing
        var checked = $('input[name="genre"]:checked');
        var counter = 0;
        var genreChosen = [];
        while (checked[counter].value !== ""){
            genreChosen.push(checked[counter].value);
            alert("You checked this genre:" + checked[counter].value); 
            counter++;

        }
        // genreChosen.forEach(function(entry){
        //   alert("You checked these " + entry + "\n API request sent");  
        // });
    }
    //data stored in genreChosen array
}

