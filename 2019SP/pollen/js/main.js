/* Stylesheet by Anna E. George, 2019 */
var map;

//function to initiate Leaflet map
function createMap(){
    //creates map & set center/zoom
    map = L.map('mapid', {
        center: [50, -100],
        zoom: 3.3,
        maxZoom: 7,
        minZoom: 2.3
    });



    //add OSM/Carto base tilelayer w/attribution
    var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    	subdomains: 'abcd',
    	maxZoom: 19
    }).addTo(map);

	promises = [];
	promises.push($.getJSON("data/quercus.geojson"));
	promises.push($.getJSON("data/icesheets.geojson"));
	promises.push($.getJSON("data/ice5000.geojson")); //ice test
	promises.push($.getJSON("data/ice6000.geojson"));
	promises.push($.getJSON("data/ice7000.geojson"));
	promises.push($.getJSON("data/ice8000.geojson"));
	promises.push($.getJSON("data/ice9000.geojson"));
	promises.push($.getJSON("data/ice10000.geojson"));
	promises.push($.getJSON("data/ice10250.geojson"));
	promises.push($.getJSON("data/ice11000.geojson"));
	promises.push($.getJSON("data/ice12750.geojson"));
	promises.push($.getJSON("data/ice13500.geojson"));
	promises.push($.getJSON("data/ice14000.geojson"));
	promises.push($.getJSON("data/alnus.geojson"));
	promises.push($.getJSON("data/ambrosia.geojson"));
	promises.push($.getJSON("data/fagus.geojson"));
	promises.push($.getJSON("data/picea.geojson"));
	promises.push($.getJSON("data/pinus.geojson"));
	promises.push($.getJSON("data/poaceae.geojson"));
	promises.push($.getJSON("data/quercus.geojson"));
	promises.push($.getJSON("data/tsuga.geojson"));
	promises.push($.getJSON("data/ice15000.geojson"));
	promises.push($.getJSON("data/ice16000.geojson"));
	promises.push($.getJSON("data/ice17000.geojson"));
	promises.push($.getJSON("data/ice18000.geojson"));
	Promise.all(promises).then(callback);
    //call getData function
    getData(map);
	//call navPanel function
//navPanel();
	//createOverlay(map, getData);
};

function callback(data){
	pollen = data[0];
	//console.log(pollen.features[0].properties["Taxon"]);
	ice = data[1];
	ice5k = data[2]; //ice test
	ice6k = data[3];
	ice7k = data[4];
	ice8k = data[5];
	ice9k = data[6];
	ice10k = data[7];
	ice10250 = data[8];
	ice11k = data[9];
	ice12750 = data[10];
	ice13500 = data[11];
	ice14k = data[12];

	//TAXA Data
	alnus = data[13];
	ambrosia = data[14];
	fagus = data[15];
	picea = data[16];
	pinus = data[17];
	poaceae = data[18];
	quercus = data[19];
	tsuga = data[20];

	none = data[21];
	ice15k = data[22];
	ice16k = data[23];
	ice17k = data[24];
	ice18k = data[25];

	//Move callbacks from AJAX HERE!
	//to avoid asynchronous problems?
	//var icelayer = L.geoJSON(ice).addTo(map);
	createOverlay(map, getData, data, attributes)//iceLayer)
	//changeExpression(src)
	//loadScript(src)

	var attributes = processData(response);
	createPropSymbols(response, map, attributes);
	createSequenceControls(map, attributes);
	createLegend(map,attributes);
	updateLegend(map, attributes[0]);
};

//Puts map on webpage
$(document).ready(createMap);

// function createLayerControl(response, map, attributes){
//   var groupedOverlays = {
//     "Tree and Plant Taxa": {
//       "Spruce": picea,
//       "Pine": pinus
//     },
//     "Glacial Extent": ice
//
//   }
// L.control.groupedLayers(groupedOverlays).addTo(map);
// };
/* var dropdownLayers = {};
dropdownLayers["All Data"] =
	{ name: "All Data",
	  layer: L.geoJson(),
}; */
/* function changeTaxa (){
	var allTaxa = L.geoJson(pollen);
			var spruce = L.geoJson(data, {
		filter: function(feature, layer) {
			return feature.properties.Taxa == "picea";
		},

		reset: function(){
			sublayer.setSQL("SELECT * FROM pollen");
		},
		spruce: function(){
			sublayer.setSQL("SELECT * from pollen WHERE taxon ilike 'picea'");
			return true;
		},
		oak: function(){
			sublayer.setSQL("SELECT * from pollen WHERE taxon like 'quercus'");
		},
	$(.selector).on('click', function() {
		$(this).addClass('active').siblings.().removeClass('active');

}; */

/* L.geoJson(response, {
	filter: function(feature, layer) {
		return feature.properties.["Taxon"] == "picea";
	}
}).addTo(map); */


function createOverlay(map, getData){ //getIce){

	//Define overlay/popup content
	var none = L.geoJSON(none).addTo(map);
	var iceLayer =
		L.geoJSON(ice)
			.bindPopup('This layer shows all ice sheet data. Use the controls to the right to select a specfic timestamp.').addTo(map);
	var yr5000 = L.geoJSON(ice5k).addTo(map); //ice test
	var yr6000 = L.geoJSON(ice6k).addTo(map);
	var yr7000 = L.geoJSON(ice7k).addTo(map);
	var yr8000 = L.geoJSON(ice8k).addTo(map);
	var yr9000 = L.geoJSON(ice9k)
		.bindPopup('~9,000 BCE marks the begining of the Holocene. The Last Glacial Maximum begins to retreat. <a href="http://www.starcarr.com/" target="blank">Star Carr</a>, a Mesolithic settlement, is founded in North Yorkshire, England.').addTo(map);
	var yr10000 = L.geoJSON(ice10k).addTo(map);
	var yr10250 = L.geoJSON(ice10250).addTo(map);
	var yr11000 = L.geoJSON(ice11k).addTo(map);
	var yr12750 = L.geoJSON(ice12750).addTo(map);
	var yr13500 = L.geoJSON(ice13500).addTo(map);
	var yr14000 =
		L.geoJSON(ice14k)
			.bindPopup('These ice sheets date to 14,000 BCE., the same time period as when the cave paintings were done at <a href="http://archeologie.culture.fr/lascaux/en" target="blank">Lascaux Cave</a> in southern France.').addTo(map);
	var yr15000 = L.geoJSON(ice15k).addTo(map);
	var yr16000 = L.geoJSON(ice16k).addTo(map);
	var yr17000 = L.geoJSON(ice17k).addTo(map);
	var yr18000 = L.geoJSON(ice18k).addTo(map);
	console.log(ice.features[0]);

	// var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
	// 	bwLink = '<a href="http://thunderforest.com/">OSMBlackAndWhite</a>';
  //
	// var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	// 	osmAttrib = '&copy; ' + osmLink + ' Contributors',
	// 	bwUrl = 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
	// 	bwAttrib = '&copy; '+osmLink+' Contributors & '+bwLink;
  //
	// var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib}),
	// 	bwMap = L.tileLayer(bwUrl, {attribution: bwAttrib});

	var baseLayers = {
		"Birch": alnus,
		"Spruce": picea
	};

	var overlays = {
		"None": none,
		"All Ice Sheets": iceLayer,
		"5000": yr5000, //ice test
		"6000": yr6000,
		"7000": yr7000,
		"8000": yr8000,
		"9000": yr9000,
		"10000": yr10000,
		"10250": yr10250,
		"11000": yr11000,
		"12750": yr12750,
		"13500": yr13500,
		"14000": yr14000,
		"15000": yr15000,
		"16000": yr16000,
		"17000": yr17000,
		"18000": yr18000
	};

	L.control.layers(/*baseLayers,*/overlays, null,{collapsed:false}).addTo(map);
};

// Function to create popups
function createPopup(properties, attribute, layer, radius){
    //add city to popup content string
    var popupContent = "<p><b>Site ID:</b> " + properties.DatasetID + "</p>";
    //add formatted attribute to panel content string
    var year = attribute.substring(2);
    //Creates spruce data content string
    popupContent += "<p><b>Oak Percent:</b> " + Math.floor(properties[attribute]*100) / 100 + "%</p>";

    //replace the layer popup
    layer.bindPopup(popupContent, {
        offset: new L.Point(0,-radius)
    });
};

//function to calculate the radius of each proportional symbol
function calcPropRadius(attribute) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = 30;
    //area based on attribute value and scale factor
    var area = attribute * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);
    // radius returned
    return radius;
};

//function to convert markers to circle markers
function pointToLayer(feature, latlng, attributes){
    //Assign the current attribute based on the first index of the attributes array
    let attribute = attributes[0];

    //create marker options
    var options = {
        fillColor: "#228B22",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);

    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);

    //create circle marker layer
    var layer = L.circleMarker(latlng, options);

    // Calls popup function
    createPopup(feature.properties, attribute, layer, options.radius);

    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};

//Add circle markers for point features to the map
function createPropSymbols(data, map, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};


//GOAL: Allow the user to sequence through the attributes and resymbolize the map
//   according to each attribute
//1. Create slider widget
// Create new sequence controls function
/* function createSequenceControls(map, attributes){
  // sets SequenceControl variable
  // var SequenceControl = L.Control.extend({
      // options: {
      //     position: 'bottomleft' //control panel position
      // },
      // onAdd: function (map) {
                  // // create the control container div with a particular class name
                  // var container = L.DomUtil.create('div', 'sequence-control-container');
  //create range input element (slider)
  //$('#panel').remove('<input class="range-slider" type="range">');
	//$('#panel').append('<input class="range-slider" type="range">');
	$('#sequence-control-container').append('<input class="range-slider" type="range">');
  // Create skip buttons
	//$('#panel').append('<button class="skip" id="reverse">Reverse</button>');
	//$('#panel').append('<button class="skip" id="forward">Skip</button>');
	$('#sequence-control-container').append('<button class="skip" id="reverse">Reverse</button>');
	$('#sequence-control-container').append('<button class="skip" id="forward">Skip</button>');

  //set slider attributes
  $('.range-slider').attr({
      max: 41,
      min: 0,
      value: 0,
      step: 1
    });
    // Adds forward/backward button images
    $('#reverse').html('<img src="img/back.png">');
    $('#forward').html('<img src="img/next.png">');

    //Creates click listener for buttons
    $('.skip').click(function(){
        //get the old index value
        var index = $('.range-slider').val();

        //Step 6: increment or decrement depending on button clicked
        if ($(this).attr('id') == 'forward'){
            index++;
            //Step 7: if past the last attribute, wrap around to first attribute
            index = index > 41 ? 0 : index;
        } else if ($(this).attr('id') == 'reverse'){
            index--;
            //Step 7: if past the first attribute, wrap around to last attribute
            index = index < 0 ? 41 : index;
        };

      //update slider
      $('.range-slider').val(index);

      //pass new attribute to update symbols
      updatePropSymbols(map, attributes[index]);
    });

  //input listener for slider
  $('.range-slider').on('input', function(){
      //get the new index value
      var index = $(this).val();
      //pass new attribute to update symbols
      updatePropSymbols(map, attributes[index]);
  });

}; */
function createSequenceControls(map, attributes){
	var SequenceControl = L.Control.extend({
		options: {
			position: 'bottomleft'
		},

		onAdd: function (map) {
			var container = L.DomUtil.create('div', 'sequence-control-container');

			$(container).append('<input class="range-slider" type="range">');
			$(container).append('<button class="skip" id="reverse" title="Reverse">Reverse</button>');
			$(container).append('<button class="skip" id="forward" title="Forward">Skip</button>');


			L.DomEvent.disableClickPropagation(container);
			return container;
		}
	});
	map.addControl(new SequenceControl());
		  //set slider attributes
	  $('.range-slider').attr({
		  max: 41,
		  min: 0,
		  value: 0,
		  step: 1
		});
		// Adds forward/backward button images
		$('#reverse').html('<img src="img/back.png">');
		$('#forward').html('<img src="img/next.png">');

		//Creates click listener for buttons
		$('.skip').click(function(){
			//get the old index value
			var index = $('.range-slider').val();

			//Step 6: increment or decrement depending on button clicked
			if ($(this).attr('id') == 'forward'){
				index++;
				//Step 7: if past the last attribute, wrap around to first attribute
				index = index > 41 ? 0 : index;
			} else if ($(this).attr('id') == 'reverse'){
				index--;
				//Step 7: if past the first attribute, wrap around to last attribute
				index = index < 0 ? 41 : index;
			};

		  //update slider
		  $('.range-slider').val(index);

		  //pass new attribute to update symbols
		  updatePropSymbols(map, attributes[index]);
		});

	  //input listener for slider
	  $('.range-slider').on('input', function(){
		  //get the new index value
		  var index = $(this).val();
		  //pass new attribute to update symbols
		  updatePropSymbols(map, attributes[index]);
	  });
};

// Resize proportional symbols according to new attribute values
function updatePropSymbols(map, attribute){
    map.eachLayer(function(layer){
        // If the feature exists
        if (layer.feature){
            //update the layer style and popup
            //access feature properties
            var props = layer.feature.properties;

            //update each feature's radius based on new attribute values
            var radius = calcPropRadius(props[attribute]);
            layer.setRadius(radius);

            // Calls popup and update legend functions
            createPopup(props, attribute, layer, radius);
            updateLegend(map, attribute);
        };
    });
};

// Function to create an array of the sequential attributes
function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with spruce values
        if (attribute.indexOf("yr") > -1){
            attributes.push(attribute);
        };
    };
    // return attributes as object
    return attributes;
};

//Calculate the max, mean, and min values for a given attribute
function getCircleValues(map, attribute){
    //start with min at highest possible and max at lowest possible number
    var min = Infinity,
        max = -Infinity;
    // Sets function to retrieve data from each layer
    map.eachLayer(function(layer){
        //get the attribute value
        if (layer.feature){
            var attributeValue = Number(layer.feature.properties[attribute]);

            //test for min
            if (attributeValue < min){
                min = attributeValue;
            };

            //test for max
            if (attributeValue > max){
                max = attributeValue;
            };
        };
    });

    //set mean
    var mean = (max + min) / 2;

    //return values as an object
    return {
        max: max,
        mean: mean,
        min: min
    };
};

// function to create the legend
function createLegend(map, attributes, attribute){
    // Creates legend control variable
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomright' // sets position on screen
        },
        onAdd: function (map) {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'legend-control-container');

            //add temporal legend div to container
            $(container).append('<div id="temporal-legend">');

            //Step 1: start attribute legend svg string
            var svg = '<svg id="attribute-legend" width="160px" height="60px">';

            //variable for circle names and positions
            var circles = {
              max: 20,
              mean: 40,
              min: 60
          };

            //loop to add each circle and text to svg string
            for (var circle in circles){
                //circle string
                svg += '<circle class="legend-circle" id="' + circle + '" fill="#228B22" fill-opacity="0.8" stroke="#000000" cx="30"/>';

                //text string
                svg += '<text id="' + circle + '-text" x="65" y="' + circles[circle] + '"></text>';
            };

            //close svg string
            svg += "</svg>";

            //add attribute legend svg to container
            $(container).append(svg);
            // return container as object
            return container;
        }
    });
    // adds to map
    map.addControl(new LegendControl());
    // calls update legend function
    updateLegend(map, attributes[0]);
};

//Update the legend with new attribute
function updateLegend(map, attribute){
    //create content for legend
    var year = attribute.substring(2);
    var content = ("Oak " + year + " years ago").bold().fontsize(3);
    //replace legend content
    $('#temporal-legend').html(content);

    //get the max, mean, and min values as an object
    var circleValues = getCircleValues(map, attribute);

    // for loop through mean, max, min circle values
    for (var key in circleValues){
      //get the radius
      var radius = calcPropRadius(circleValues[key]);

      // assign the cy and r attributes
      $('#'+key).attr({
        cy: 59 - radius,
        r: radius
      });

      // add legend text
      $('#'+key+'-text').text(Math.round(circleValues[key]*100)/100 + "%");
	};
};

function getIce(map){
	//load icesheet data
	$.ajax("data/icesheets.geojson", {
		dataType: "json",
		success: function(response){
			//create array
			var iceAttributes = getIce(response);
			//call function
			//createOverlay(map, getIce);
		}
	});
};

// Import GeoJSON data
function getData(map){
    //load the data
    $.ajax("data/quercus.geojson", { //changed to FINAL_POLLENDATA
        dataType: "json",
        success: function(response){

          //create an attributes array
          var attributes = processData(response);
          //call followning functions
          createPropSymbols(response, map, attributes);
          createSequenceControls(map, attributes);
          createLegend(map,attributes);
          updateLegend(map, attributes[0]);
        }
    });
};
