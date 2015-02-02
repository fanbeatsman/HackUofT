


		var startup = function(dict){
//global
var w = 190;
var h = 190;
var API_key = 'tkmfxvqcaxur7v6j5xn8urax';
var root_URL = 'https://api.edmunds.com/api/vehiclereviews/v2/';
var root_media = "http://media.ed.edmunds-media.com/";
var car = dict.Car1; //extremely bad practice here, should fix but eh... you know hackathon
var carID ="";
var car2 = dict.Car2;
var car2ID = "";
var currCar = car;
var verbal = "";
var parameters = '?sortby=thumbsUp%3AASC&pagenum=1&pagesize=10&fmt=json&api_key=';
var picture_para = "?state=new&view=basic&fmt=json&api_key=tkmfxvqcaxur7v6j5xn8urax";
var pi = Math.PI;
var photoSrc1,photoSrc2 = "";
var datum = {performance: [1,1],
			comfort: [1,1],
			FE:[1,1],
			FD:[1,1],
			ID:[1,1],
			ED:[1,1],
			BQ:[1,1]}; //fe = fuel economy, fun to drive, interior deign, exterior design, build quality
var turns = 0;
var sentiment = function(str){
	$.ajax({
		'url': "https://loudelement-free-natural-language-processing-service.p.mashape.com/nlp-text/?text=" + str.replace(/ /g , "+"),
		'type': 'GET',
		beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'rebXCLKkIzmshRryYman8jnayKMvp1ia4zHjsn7gDFtJEVjqdl');},
		'headers': {"X-Mashape-Key": "rebXCLKkIzmshRryYman8jnayKMvp1ia4zHjsn7gDFtJEVjqdl"},
		'success':function(data){
			console.log(data);
			var verbal = data;
		}
	});
}


$.ajax({
	'url': "https://api.edmunds.com/api/vehicle/v2/" + car.substring(0,car.length-5) + picture_para,
	'type':'GET',
	'success' : function(data){
		console.log(car.substring(0,car.length-5));
		carID = data.years[0].styles[0].id;
		console.log(carID);
		$.ajax({
			'url': "https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId=" + carID.toString() + "&fmt=json&api_key=tkmfxvqcaxur7v6j5xn8urax",
			'type':'GET',
			'success':function(data){
				photoSrc1 = data[0].photoSrcs[0];
				console.log(photoSrc1+"!#@$!@#$");
				photoSrc1 = root_media + photoSrc1;
				$('.photo1').attr("src",photoSrc1).css("width",276).css("height",176);
			}
		});
	}
});

$.ajax({
	'url': "https://api.edmunds.com/api/vehicle/v2/" + car2.substring(0,car2.length-5) + picture_para,
	'type':'GET',
	'success' : function(data){
		car2ID = data.years[0].styles[0].id;
		$.ajax({
			'url': "https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId=" + car2ID.toString() + "&fmt=json&api_key=tkmfxvqcaxur7v6j5xn8urax",
			'type':'GET',
			'success':function(data){
				photoSrc2 = data[0].photoSrcs[0];
				photoSrc2 = root_media + photoSrc2;
				$('.photo2').attr("src",photoSrc2).css("width",276).css("height",176);
			}
		});
	}
});

var dataset = [];
var x = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([0,d3.max(dataset)*10]); 
$(".entry, .bmw, .go, .topIns").remove();
$(".instructions").html("Click one of the categories to sample from that category. The system takes turns, so each time you click one button, it will sample for one of the cars, then the other with alternance.");
//d, and i are vars given by D3.js. Can be called by anonymous function or wtv. d = current value at __data__. i refers to the index of the data eg in the array it came from

//CHARTS

var chart = c3.generate({
	bindto:'#chart',
	data: {
		columns: [['Performance of '+car,100*datum.performance[0]/(datum.performance[0]+datum.performance[1])],['Performance of '+car2,100*datum.performance[1]/(datum.performance[0]+datum.performance[1])]],
		type: 'donut',
	},
	size:{height:h},
	size:{width:w}
});

var chart2 = c3.generate({
	bindto:'#chart2',
	data: {
		columns: [['Comfort of ' + car,100*datum.comfort[0]/(datum.comfort[0]+datum.comfort[1])],['Comfort of '+car2,100*datum.comfort[1]/(datum.comfort[0]+datum.comfort[1])]],
		type: 'donut',
	},
	size:{height:h},
	size:{width:w}
});

var chart3 = c3.generate({
	bindto:'#chart3',
	data: {
		columns: [['Fuel Economy of '+car,100*datum.FE[0]/(datum.comfort[0]+datum.FE[1])],['Fuel Economy of '+car2,100*datum.FE[1]/(datum.comfort[0]+datum.FE[1])]],
		type: 'donut',
	},
	size:{height:h},
	size:{width:w}
});

var chart4 = c3.generate({
	bindto:'#chart4',
	data: {
		columns: [['Fun to Drive '+car,100*datum.FD[0]/(datum.FD[0]+datum.FD[1])],['Fun to Drive '+car2,100*datum.FD[1]/(datum.FD[0]+datum.FD[1])]],
		type: 'donut',
	},
	size:{height:h},
	size:{width:w}
});

var chart5 = c3.generate({
	bindto:'#chart5',
	data: {
		columns: [['Interior of '+car,100*datum.ID[0]/(datum.ID[0]+datum.ID[1])],['Interior of '+car2,100*datum.ID[1]/(datum.ID[0]+datum.ID[1])]],
		type: 'donut',
	},
	size:{height:h},
	size:{width:w}
});

var chart6 = c3.generate({
	bindto:'#chart6',
	data: {
		columns: [['Exterior Design '+car,100*datum.ED[0]/(datum.ED[0]+datum.ED[1])],['Exterior Design '+car2,100*datum.ED[1]/(datum.ED[0]+datum.ED[1])]],
		type: 'donut',
	},
	size:{height:h},
	size:{width:w}
});

var chart7 = c3.generate({
	bindto:'#chart7',
	data: {
		columns: [['Build Quality '+car,100*datum.ED[0]/(datum.ED[0]+datum.ED[1])],['Build Quality '+car2,100*datum.ED[1]/(datum.ED[0]+datum.ED[1])]],
		type: 'donut',
	},
	size:{height:h},
	size:{width:w}
});




$('#submit').click(function(){
	if (turns == 0) currCar=car;
	else currCar=car2;
	$.ajax({
		'url': root_URL + currCar + parameters + API_key,
		'type':'GET',
		'success' : function(data){
			if (turns == 0) {
				datum.performance[0] = datum.performance[0] + data.reviews[0].ratings[0].value;
				turns = 1;
							var rdn = Math.floor(Math.random() * 10);
			if (rdn%3 == 0){
				verbal = data.reviews[rdn].title;
				$(".verbal").html(verbal);
				var sentimental = sentiment(verbal).sentiment-text;
				console.log(sentimental);
				if (sentimental == "neutral"){
					$(".status1").append("neutral;");

				}
				else if(sentimental == "positive")
					{
					$(".status1").append("positive;");	
					}
					else {
$(".status1").append("negative;");
					};
			}
			}
			else {
				datum.performance[1] = datum.performance[1] + data.reviews[0].ratings[0].value;
				turns = 0;
							var rdn = Math.floor(Math.random() * 10);
			if (rdn%3 == 0){
				sentiment(verbal);
				verbal = data.reviews[rdn].title;
				$(".verbal2").html(verbal);
				if (sentiment(verbal).sentiment-text == "neutral"){
					$(".status2").append("neutral;");
				}
				else if(sentiment(verbal).sentiment-text == "positive")
					{
					$(".status2").append("positive;");	
					}
					else {
$(".status2").append("negative;");
					};
			}
			}
			console.log(data.reviews[0].ratings[0]);
			chart.load(
				{columns: [['Performance of '+car,100*datum.performance[0]/(datum.performance[0]+datum.performance[1])],['Performance of '+car2,100*datum.performance[1]/(datum.performance[0]+datum.performance[1])]],
			});
		}

	});
});

$('#submit2').click(function(){
	if (turns == 0) currCar=car;
	else currCar=car2;
	$.ajax({
		'url': root_URL + currCar + parameters + API_key,
		'type':'GET',
		'success' : function(data){
			if (turns == 0) {
				datum.comfort[0] = datum.comfort[0] + data.reviews[0].ratings[1].value;
				turns = 1;
			}
			else {
				datum.comfort[1] = datum.comfort[1] + data.reviews[0].ratings[1].value;
				turns = 0;
			}
			chart2.load(
				{columns: [['Comfort of '+car,100*datum.comfort[0]/(datum.comfort[0]+datum.comfort[1])],['Comfort of '+car2,100*datum.comfort[1]/(datum.comfort[0]+datum.comfort[1])]],
			});
		}
	});
});

$('#submit3').click(function(){
	if (turns == 0) currCar=car;
	else currCar=car2;
	$.ajax({
		'url': root_URL + currCar + parameters + API_key,
		'type':'GET',
		'success' : function(data){
			if (turns == 0) {
				datum.FE[0] = datum.FE[0] + data.reviews[0].ratings[2].value;
				turns = 1;
			}
			else {
				datum.FE[1] = datum.FE[1] + data.reviews[0].ratings[2].value;
				turns = 0;
			}
			chart3.load(
				{columns: [['Fuel Economy of '+car,100*datum.FE[0]/(datum.comfort[0]+datum.FE[1])],['Fuel Economy of '+car2,100*datum.FE[1]/(datum.FE[0]+datum.FE[1])]],
			});
		}
	});
});

$('#submit4').click(function(){
	if (turns == 0) currCar=car;
	else currCar=car2;
	$.ajax({
		'url': root_URL + currCar + parameters + API_key,
		'type':'GET',
		'success' : function(data){
			if (turns == 0) {
				datum.FD[0] = datum.FD[0] + data.reviews[0].ratings[3].value;
				turns = 1;
			}
			else {
				datum.FD[1] = datum.FD[1] + data.reviews[0].ratings[3].value;
				turns = 0;
			}
			chart4.load(
				{columns: [['Fun to Drive '+car,100*datum.FD[0]/(datum.FD[0]+datum.FD[1])],['Fun to Drive '+car2,100*datum.FD[1]/(datum.FD[0]+datum.FD[1])]],
			});
		}
	});
});

$('#submit5').click(function(){
	if (turns == 0) currCar=car;
	else currCar=car2;
	$.ajax({
		'url': root_URL + currCar + parameters + API_key,
		'type':'GET',
		'success' : function(data){
			if (turns == 0) {
				datum.ID[0] = datum.ID[0] + data.reviews[0].ratings[4].value;
				turns = 1;
			}
			else {
				datum.ID[1] = datum.ID[1] + data.reviews[0].ratings[4].value;
				turns = 0;
			}
			datum.FD[0] = datum.FD[0] + data.reviews[0].ratings[3].value;
			datum.ID[0] = datum.ID[0] + data.reviews[0].ratings[4].value;
			datum.ED[0] = datum.ED[0] + data.reviews[0].ratings[5].value;
			datum.BQ[0] = datum.BQ[0] + data.reviews[0].ratings[6].value;
			chart5.load(
				{columns: [['Interior of '+car,100*datum.ID[0]/(datum.ID[0]+datum.ID[1])],['Interior of '+car2,100*datum.ID[1]/(datum.ID[0]+datum.ID[1])]],
			});
		}
	});
});

$('#submit6').click(function(){
	if (turns == 0) currCar=car;
	else currCar=car2;
	$.ajax({
		'url': root_URL + currCar + parameters + API_key,
		'type':'GET',
		'success' : function(data){
			if (turns == 0) {
				datum.ED[0] = datum.ED[0] + data.reviews[0].ratings[5].value;
				turns = 1;
			}
			else {
				datum.ED[1] = datum.ED[1] + data.reviews[0].ratings[5].value;
				turns = 0;
			}
			chart6.load(
				{columns: [['Exterior Design '+car,100*datum.ED[0]/(datum.ED[0]+datum.ED[1])],['Exterior Design '+car2,100*datum.ED[1]/(datum.ED[0]+datum.ED[1])]],
			});
		}
	});
});

$('#submit7').click(function(){
	if (turns == 0) currCar=car;
	else currCar=car2;
	$.ajax({
		'url': root_URL + currCar + parameters + API_key,
		'type':'GET',
		'success' : function(data){
			if (turns == 0) {
				datum.BQ[0] = datum.BQ[0] + data.reviews[0].ratings[6].value;
				turns = 1;
			}
			else {
				datum.BQ[1] = datum.BQ[1] + data.reviews[0].ratings[6].value;
				turns = 0;
			}
			chart7.load(
				{columns: [['Build Quality '+car,100*datum.BQ[0]/(datum.BQ[0]+datum.BQ[1])],['Build Quality '+car2,100*datum.BQ[1]/(datum.BQ[0]+datum.BQ[1])]],
			});
		}
	});
});

}
