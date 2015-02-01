var genreChosen = [];
$( document ).ready(function() {
    // console.log( "ready!" );    
    $('#main').html($('#intro-template').html());
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
        // var genreChosen = [];
        while (checked[counter].value !== ""){
            genreChosen.push(checked[counter].value);
            alert("You checked this genre:" + checked[counter].value); 
            counter++;
            if (!checked[counter]){
              break;
            }
        }
        // genreChosen.forEach(function(entry){
        //   alert("You checked these " + entry + "\n API request sent");  
        // });
    }
    //data stored in genreChosen array
    $('#main').empty();
    $('#main').html($('#data-template').html());
    $('p').html("Here's your data!");
    genreChosen.forEach(function(entry){
      $('#data').append(entry);
      $('#data').append('<br>');
    });
    $('#data').append("\n Now do something in D3.js!!");
    
}

