/* Stylesheet by Anna E. George, 2019 */
var map;
//function to initiate Leaflet map
function createMap(heatmapLayer){
    //creates map & set center/zoom
    map = L.map('mapid', {
        center: [50, -80],
        zoom: 3.8,
        minZoom:2.3,
        layer: heatmapLayer
    });


    //add OSM base tilelayer w/attribution
    var CartoDB_Positron = 
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    	subdomains: 'abcd',
    	maxZoom: 19
    }).addTo(map);

	promises = [];
	promises.push($.getJSON("data/pollendata.geojson"));
	promises.push($.getJSON("data/icesheets.geojson"));
	Promise.all(promises).then(callback);
    //call getData function
    getData(map);
	//call navPanel function
	//navPanel();
//	createOverlay(map, getIce);
};

function callback(data){
	pollen = data[0];
	ice = data[1];

	//Move callbacks from AJAX HERE!
	//to avoid asynchronous problems?
//	var icelayer = L.geoJSON(ice).addTo(map);
//	createOverlay(map, icelayer)


//	var attributes = processData(response);
//	createPropSymbols(response, map, attributes);
//	createSequenceControls(map, pollen);
//	createLegend(map,attributes);
//	updateLegend(map, attributes[0]);
    createHeatMap(pollen);
};


//Puts map on webpage
$(document).ready(createMap);


function createHeatMap(pollen){

    var latitude = []
    var longitude = []
    var pollenCount = []
    var sitedata = []
    
    //for(var i=0; i<6; i++){
        pollen.features.map(function(row) {
              // the heatmap plugin wants an array of each location
            var latsite = row.geometry.coordinates[1];
            var longsite = row.geometry.coordinates[0];
            longitude.push(longsite);
            var sitepollen = row.properties.yr7750;
            pollenCount.push(sitepollen)
            latitude.push(latsite);

            sitedata.push({lat: latsite, lng: longsite, count: pollenCount})
//            pollendata.push(sitedata)
//
        });
console.log(sitedata)
    // don't forget to include leaflet-heatmap.js
    var testData = {
      max: 100,
      data: [sitedata]
    };



    var cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      "radius": 2,
      "maxOpacity": .8, 
      // scales the radius based on map zoom
      "scaleRadius": true, 
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries 
      //   (there will always be a red spot with useLocalExtremas true)
      "useLocalExtrema": true,
      // which field name in your data represents the latitude - default "lat"
      latField: latitude,
      // which field name in your data represents the longitude - default "lng"
      lngField: longitude,
      // which field name in your data represents the data value - default "value"
      valueField: pollenCount
    };
console.log(cfg)


//    var heatmapLayer = new HeatmapOverlay(cfg);
//
//    var map = new L.Map('map-canvas', {
//      center: new L.LatLng(25.6586, -80.3568),
//      zoom: 4,
//      layers: [heatmapLayer]
//    });

//    heatmapLayer.setData(testData);
};



















//
////create heat map
//function createHeatMap(pollen){
//    
//    var locations = pollen.features.map(function(row) {
//      // the heatmap plugin wants an array of each location
//      var location = row.geometry.coordinates.reverse();
//      location.push(.5);
//      return location; // [50.5, 30.5, 0.2], [lat, lng, intensity]
//    });
//
//      var heat = L.heatLayer(locations, { 
//       minOpacity: 0.3,
//       radius: 20,
//        blur:10,
//        maxZoom:5,
//        max:100,
//       gradient: {
//           0.1: 'purple',
//           0.2: 'cyan',
//           0.3: '#2b83ba',
//           0.4: 'green',
//           0.6: 'yellow',
//           0.8: 'orange',
//           0.9: '#d7191c',
//           1: 'red'
//       } 
//   });
//         
//    map.addLayer(heat);
//
//};

















////sequence controll
//function createSequenceControls(map, pollen){
//  
//  //create range input element (slider)
//  $('#sequence-control-container').append('<input class="range-slider" type="range">');
//
//  // Create skip buttons
//  $('#sequence-control-container').append('<button class="skip" id="reverse">Reverse</button>');
//  $('#sequence-control-container').append('<button class="skip" id="forward">Skip</button>');
//
//  //set slider attributes
//  $('.range-slider').attr({
//      max: 29,
//      min: 0,
//      value: 0,
//      step: 1
//    });
//    // Adds forward/backward button images
//    $('#reverse').html('<img src="img/back.png">');
//    $('#forward').html('<img src="img/next.png">');
//
//    //Creates click listener for buttons
//    $('.skip').click(function(){
//        //get the old index value
//        var index = $('.range-slider').val();
//
//        //Step 6: increment or decrement depending on button clicked
//        if ($(this).attr('id') == 'forward'){
//            index++;
//            //Step 7: if past the last attribute, wrap around to first attribute
//            index = index > 41 ? 0 : index;
//        } else if ($(this).attr('id') == 'reverse'){
//            index--;
//            //Step 7: if past the first attribute, wrap around to last attribute
//            index = index < 0 ? 41 : index;
//        };
//
//      //update slider
//      $('.range-slider').val(index);
//
//      //pass new attribute to update symbols
//      updateHeatMap(map, attributes[index]);
//    });
//
//  //input listener for slider
//  $('.range-slider').on('input', function(){
//      //get the new index value
//      var index = $(this).val();
//      //pass new attribute to update symbols
//      updateHeatMap(map, pollen[index]);
//  });
//
//};
//
//
////legend function??




//// update heat to new attribute values using updatePropSymbol???
//function updateHeatMap(map, pollen){
//    map.eachLayer(function(layer){
//        // If the feature exists
//        if (layer.feature){
//            //access feature properties
//            var props = layer.feature.properties;
//
//            //update each feature's radius based on new attribute values
//            var radius = locations(props[attribute]);
//            layer.setRadius(radius);
//
//            // update legend functions
////            updateHeatLegend(map, attribute);
//        };
//    });
//};





/* function changeTaxa (){
	var LayerActions = {
		reset: function(){
			sublayer.setSQL("SELECT * FROM pollendata");
		},
		spruce: function(){
			sublayer.setSQL("SELECT * from pollendata WHERE ????? ilike 'picea'");
			return true;
		},
}; */

//function createOverlay(map, getIce){
//	//var iceSheets = new L.LayerGroup();
//	//var iceSheets = new L.geoJSON();
//
//	//Define overlay/popup content
//	//***Add code here***
//	console.log(getIce);
//	//var icelayer = L.geoJSON(ice).addTo(iceSheets);
//
//	var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
//		bwLink = '<a href="http://thunderforest.com/">OSMBlackAndWhite</a>';
//
//	var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//		osmAttrib = '&copy; ' + osmLink + ' Contributors',
//		bwUrl = 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
//		bwAttrib = '&copy; '+osmLink+' Contributors & '+bwLink;
//
//	var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib}),
//		bwMap = L.tileLayer(bwUrl, {attribution: bwAttrib});
//
//	var baseLayers = {
//		"OSM Mapnik": osmMap,
//		"Greyscale": bwMap
//	};
//
//	var overlays = {
//		"Ice Sheets": iceSheets
//	};
//
//	L.control.layers(baseLayers,overlays).addTo(map);
//};
//
//// Function to create popups
//function createPopup(properties, attribute, layer, radius){
//    //add city to popup content string
//    var popupContent = "<p><b>Site ID:</b> " + properties.DatasetID + "</p>";
//    //add formatted attribute to panel content string
//    var year = attribute.substring(2);
//    //Creates spruce data content string
//    popupContent += "<p><b>Spruce Percent:</b> " + Math.floor(properties[attribute]*100) / 100 + "%</p>";
//
//    //replace the layer popup
//    layer.bindPopup(popupContent, {
//        offset: new L.Point(0,-radius)
//    });
//};

////function to calculate the radius of each proportional symbol
//function calcPropRadius(attribute) {
//    //scale factor to adjust symbol size evenly
//    var scaleFactor = 30;
//    //area based on attribute value and scale factor
//    var area = attribute * scaleFactor;
//    //radius calculated based on area
//    var radius = Math.sqrt(area/Math.PI);
//    // radius returned
//    return radius;
//};

////function to convert markers to circle markers
//function pointToLayer(feature, latlng, attributes){
//    //Assign the current attribute based on the first index of the attributes array
//    let attribute = attributes[0];
//
//    //create marker options
//    var options = {
//        fillColor: "#228B22",
//        color: "#000",
//        weight: 1,
//        opacity: 1,
//        fillOpacity: 0.8
//    };
//
//    //For each feature, determine its value for the selected attribute
//    var attValue = Number(feature.properties[attribute]);
//
//    //Give each feature's circle marker a radius based on its attribute value
//    options.radius = calcPropRadius(attValue);
//
//    //create circle marker layer
//    var layer = L.circleMarker(latlng, options);
//
//    // Calls popup function
//    createPopup(feature.properties, attribute, layer, options.radius);
//
//    //return the circle marker to the L.geoJson pointToLayer option
//    return layer;
//};
//
////Add circle markers for point features to the map
//function createPropSymbols(data, map, attributes){
//    //create a Leaflet GeoJSON layer and add it to the map
//    L.geoJson(data, {
//        pointToLayer: function(feature, latlng){
//            return pointToLayer(feature, latlng, attributes);
//        }
//    }).addTo(map);
//};


//GOAL: Allow the user to sequence through the attributes and resymbolize the map
//   according to each attribute
//1. Create slider widget
 // // Create new sequence controls function
 //function createSequenceControls(map, attributes){
  // sets SequenceControl variable
/*   var SequenceControl = L.Control.extend({
      options: {
          position: 'bottomleft' //control panel position
      },
      onAdd: function (map) {
                  // create the control container div with a particular class name
                  var container = L.DomUtil.create('div', 'sequence-control-container');


                  // Create skip buttons
                  $(container).append('<button class="skip" id="reverse">Reverse</button>');
                  $(container).append('<button class="skip" id="forward">Skip</button>');

                  //disable any mouse event listeners for the container
                  L.DomEvent.disableClickPropagation(container);
                  return container;
              }
          }); */
  // Adds control to map
 // map.addControl(new SequenceControl());
	//create range input element (slider)
 // $('#sequence-control-container').append('<input class="range-slider" type="range">');
    // Create skip buttons
 // $('#sequence-control-container').append('<button class="skip" id="reverse">Reverse</button>');
 // $('#sequence-control-container').append('<button class="skip" id="forward">Skip</button>');
  //set slider attributes
 // $('.range-slider').attr({
 //     max: 41,
 //     min: 0,
 //     value: 0,
//      step: 1
//    });
    // Adds forward/backward button images
//    $('#reverse').html('<img src="img/back.png">');
//    $('#forward').html('<img src="img/next.png">');

    //Creates click listener for buttons
//    $('.skip').click(function(){
//        if ($(this).attr('id') == 'forward'){
 //       var index = $('.range-slider').val();

        //Step 6: increment or decrement depending on button clicked
 //       if ($(this).attr('id') == 'forward'){
 //           index++;
            //Step 7: if past the last attribute, wrap around to first attribute
 //           index = index > 41 ? 0 : index;
 //       } else if ($(this).attr('id') == 'reverse'){
 //           index--;
            //Step 7: if past the first attribute, wrap around to last attribute
 //           index = index < 0 ? 41 : index;
 //       };

      //update slider
      //$('.range-slider').val(index);

      //pass new attribute to update symbols
      //updatePropSymbols(map, attributes[index]);
//    });

  //input listener for slider
  //$('.range-slider').on('input', function(){
      //get the new index value
    //  var index = $(this).val();
      //pass new attribute to update symbols
      //updatePropSymbols(map, attributes[index]);
  //});
//
 //};
// //
//
// // Resize proportional symbols according to new attribute values
// function updateHeatMap(map, attribute){
//    map.eachLayer(function(layer){
//        // If the feature exists
//        if (layer.feature){
//            //update the layer style and popup
//            //access feature properties
//            var props = layer.feature.properties;
//
//            //update each feature's radius based on new attribute values
//            var radius = calcPropRadius(props[attribute]);
//            layer.setRadius(radius);
//
//            // Calls popup and update legend functions
//            createPopup(props, attribute, layer, radius);
//            updateLegend(map, attribute);
//        };
//    });
// };

//// Resize proportional symbols according to new attribute values
//function updatePropSymbols(map, attribute){
//    map.eachLayer(function(layer){
//        // If the feature exists
//        if (layer.feature){
//            //update the layer style and popup
//            //access feature properties
//            var props = layer.feature.properties;
//
//            //update each feature's radius based on new attribute values
//            var radius = calcPropRadius(props[attribute]);
//            layer.setRadius(radius);
//
//            // Calls popup and update legend functions
//            createPopup(props, attribute, layer, radius);
//            updateLegend(map, attribute);
//        };
//    });
//};

/* // Function to process ice sheet data
function processIce(getIce){
	//create empty array
	var iceAttributes = [];

	//properties of first attribute
	var iceProperties = getIce.features[0].properties;
	//push attributes to array
	for (var attribute in iceProperties){
		if (attribute.indexOf("Age") > 4000){
			iceAttributes.push(attribute);
		};
	};
	//return as object
	return iceAttributes;
}; */

// Function to create an array of the sequential attributes
//function processData(data){
//    //empty array to hold attributes
//    var attributes = [];
//
//    //properties of the first feature in the dataset
//    var properties = data.features[0].properties;
//
 //   //push each attribute name into attributes array
 //   for (var attribute in properties){
//        //only take attributes with spruce values
//        if (attribute.indexOf("yr") > -1){
//            attributes.push(attribute);
//        };
//    };
//    // return attributes as object
 //   return attributes;
//};

////Calculate the max, mean, and min values for a given attribute
//function getCircleValues(map, attribute){
//    //start with min at highest possible and max at lowest possible number
//    var min = Infinity,
//        max = -Infinity;
//    // Sets function to retrieve data from each layer
//    map.eachLayer(function(layer){
//        //get the attribute value
//        if (layer.feature){
//            var attributeValue = Number(layer.feature.properties[attribute]);
//
//            //test for min
//            if (attributeValue < min){
//                min = attributeValue;
//            };
//
//            //test for max
//            if (attributeValue > max){
//                max = attributeValue;
//            };
//        };
//    });
//
//    //set mean
//    var mean = (max + min) / 2;
//
//    //return values as an object
//    return {
//        max: max,
//        mean: mean,
//        min: min
//    };
//};
//
//// function to create the legend
//function createLegend(map, attributes, attribute){
//    // Creates legend control variable
//    var LegendControl = L.Control.extend({
//        options: {
//            position: 'bottomright' // sets position on screen
//        },
//        onAdd: function (map) {
//            // create the control container with a particular class name
//            var container = L.DomUtil.create('div', 'legend-control-container');
//
//            //add temporal legend div to container
//            $(container).append('<div id="temporal-legend">');
//
//            //Step 1: start attribute legend svg string
//            var svg = '<svg id="attribute-legend" width="160px" height="60px">';
//
//            //variable for circle names and positions
//            var circles = {
//              max: 20,
//              mean: 40,
//              min: 60
//          };
//
//            //loop to add each circle and text to svg string
//            for (var circle in circles){
//                //circle string
//                svg += '<circle class="legend-circle" id="' + circle + '" fill="#228B22" fill-opacity="0.8" stroke="#000000" cx="30"/>';
//
//                //text string
//                svg += '<text id="' + circle + '-text" x="65" y="' + circles[circle] + '"></text>';
//            };
//
//            //close svg string
//            svg += "</svg>";
//
//            //add attribute legend svg to container
//            $(container).append(svg);
//            // return container as object
//            return container;
//        }
//    });
//    // adds to map
//    map.addControl(new LegendControl());
//    // calls update legend function
//    updateLegend(map, attributes[0]);
//};
//
////Update the legend with new attribute
//function updateLegend(map, attribute){
//    //create content for legend
//    var year = attribute.substring(2);
//    var content = ("Spruce " + year + " years ago").bold().fontsize(3);
//    //replace legend content
//    $('#temporal-legend').html(content);
//
//    //get the max, mean, and min values as an object
//    var circleValues = getCircleValues(map, attribute);
//
//    // for loop through mean, max, min circle values
//    for (var key in circleValues){
//      //get the radius
//      var radius = calcPropRadius(circleValues[key]);
//
//      // assign the cy and r attributes
//      $('#'+key).attr({
//        cy: 59 - radius,
//        r: radius
//      });
//
//      // add legend text
//      $('#'+key+'-text').text(Math.round(circleValues[key]*100)/100 + "%");
//};
//};
//function getIce(map){
//	//load icesheet data
//	$.ajax("data/icesheets.geojson", {
//		dataType: "json",
//		success: function(response){
//			//create array
//			var iceAttributes = getIce(response);
//			//call function
//			createOverlay(map, getIce);
//		}
//	});
//};

// Import GeoJSON data
function getData(map){
    //load the data
    $.ajax("data/final_pollendata.geojson", {
        dataType: "json",
        success: function(response){

//          //create an attributes array
//          var attributes = processData(response);
//          //call followning functions
//          createPropSymbols(response, map, attributes);
//          createSequenceControls(map, attributes);
//          createLegend(map,attributes);
//          updateLegend(map, attributes[0]);
        }
    });
};
