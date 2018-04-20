var toronto_lat = 43.653226;
var toronto_lng = -79.38318429999998;

var map1 = 0;
var panampaths = [];
var bikepaths = [];
var num_bikepaths = -1;
var resp_paths = [];
var loaded_bikepaths = false;
var bikeshops = [];
var num_bikeshops = 0;
var loaded_bikeshops = false;
var trailentrances = [];
var num_trailentrances = -1;
var resp_trails = [];
var loaded_trailentrances = false;

var sportfacility = [];
var num_sportfacility = 0;
var loaded_sportfacility = false;

var restaurant = [];
var num_restaurant = 0;
var loaded_restaurant = false;

var waterfountain = [];
var num_waterfountain = 0;
var loaded_waterfountain = false;

var zones = [];
var num_zones = 0;
var event_markers = {};

var zoomLevel = -1;
var zoom_level_for_zones = 8;
var isShowingZones = false;
var zoom_level_for_bikepaths = 9;
var isShowingBikepaths = false;
var zoom_level_for_trailentrances = 12;
var isShowingTrailentrances = false;
var zoom_level_for_sportfacility = 12;
var isShowingSportfacility = false;
var zoom_level_for_bikeshops = 12;
var isShowingBikeshops = false;

var zoom_level_for_waterfountain = 13;
var isShowingWaterfountains = false;

var zoom_level_for_restaurant = 14;
var isShowingRestaurant = false;

var homeCity = new google.maps.LatLng(43.653226, -79.38318429999998)

var infoWindow = new google.maps.InfoWindow({content: ""} );

var idleListener = false;

var curEvId = false;
var curEvDate = false;
var markerMap = [];

google.maps.event.addDomListener(window, 'load', mapPageInitialize);

function gotoCurrentLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
	var pos = new google.maps.LatLng(position.coords.latitude,
					 position.coords.longitude);

	    map1.setCenter(pos);
    }, function(error) {
        // alert('code: '    + error.code    + '\n' +
        //       'message: ' + error.message + '\n');
	map1.setCenter(homeCity);
    }, {timeout: 10000, enableHighAccuracy: true});
    

}

/**
 * The HomeControl adds a control to the map that simply
 * returns the user to Chicago. This constructor takes
 * the control DIV as an argument.
 * @constructor
 */
function HomeControl(controlButton, map) {
    
//     // Set CSS styles for the DIV containing the control
//     // Setting padding to 5 px will offset the control
//     // from the edge of the map
//     controlDiv.style.padding = '5px';
    
//     // Set CSS for the control border
//     var controlUI = document.createElement('div');
//     controlUI.style.backgroundColor = 'white';
// //    controlUI.style.borderStyle = 'solid';
//     //    controlUI.style.borderWidth = '1px';
//     controlUI.style.border = '1px solid rgba(0, 0, 0, 0.14902)';
//     controlUI.style.cursor = 'pointer';
//     controlUI.style.textAlign = 'center';
//     controlUI.title = 'Click to set the map to your current location';
//     controlDiv.appendChild(controlUI);
    
//     // Set CSS for the control interior
//     var controlText = document.createElement('div');
//     controlText.style.fontFamily = 'Arial,sans-serif';
//     controlText.style.fontSize = '12px';
//     controlText.style.paddingLeft = '4px';
//     controlText.style.paddingRight = '4px';
//     controlText.innerHTML = '<b>Home</b>';
//     controlUI.appendChild(controlText);
    
    var linkText = document.createTextNode("Home");
    controlButton.appendChild(linkText);
    controlButton.href = "#";
    controlButton.className += "ui-btn ui-icon-home ui-btn-icon-notext ui-corner-all";
    controlButton.style.margin = '10px';
    
    google.maps.event.addDomListener(controlButton, 'click', gotoCurrentLocation );
    
}

function PanelControl(controlButton, map){
    var linkText = document.createTextNode("Open panel");
//    controlButton.appendChild(linkText);
    controlButton.href = "#";
    controlButton.setAttribute("id", "mapPanelButton");
//    controlButton.className += "ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all";
    controlButton.style.margin = '10px';

    google.maps.event.addDomListener(controlButton, 'click',  function(e){
    	$("#mapPanel").toggle();
	e.preventDefault();
    	return false;
    });
}

function applyStyles( atype, state) {
    var vis;
    if( state ){
	vis = "on";
    } else {
	vis = "off";
    }
    
    var myStyles = [
	{
	    featureType : atype,
	    elementType: "labels",
	    stylers: [
		{visibility: vis}
	    ]
	}
    ];
    map1.setOptions({styles: myStyles});    
}

function updateBikePaths(){
    var state = $("#flip-bikepath").prop("checked");

    var zoomLevel = map1.getZoom();
    if( state == 1 && zoomLevel >= zoom_level_for_bikepaths){
	if( !isShowingBikepaths ){
	    for( var i = 0; i < bikepaths.length; i += 1){
		map1.data.add(bikepaths[i]);
	    }
	    isShowingBikepaths = true;
	}
    } else if( isShowingBikepaths ) {
	for( var i = 0; i < bikepaths.length; i += 1){
	    map1.data.remove(bikepaths[i]);
	}
	isShowingBikepaths = false;
    }
}


function updateBikeShops(){
    var state = $("#flip-bikeshop").prop("checked");

    var zoomLevel = map1.getZoom();
    if( state == 1 && zoomLevel >= zoom_level_for_bikeshops){
	if( !isShowingBikeshops ){
	    for( var i = 0; i < bikeshops.length; i += 1){
		map1.data.add(bikeshops[i]);
	    }
	    isShowingBikeshops = true;
	}
    } else if( isShowingBikeshops ) {
	for( var i = 0; i < bikeshops.length; i += 1){
	    map1.data.remove(bikeshops[i]);
	}
	isShowingBikeshops = false;
    }
}

function updateTrailEntrances(){
    var state = $("#flip-trailentrance").prop("checked");

    var zoomLevel = map1.getZoom();
    if( state == 1 && zoomLevel >= zoom_level_for_trailentrances){
	if( !isShowingTrailentrances ){
	    for( var i = 0; i < trailentrances.length; i += 1){
		map1.data.add(trailentrances[i]);
	    }
	    isShowingTrailentrances = true;
	}
    } else if( isShowingTrailentrances ) {
	for( var i = 0; i < trailentrances.length; i += 1){
	    map1.data.remove(trailentrances[i]);
	}
	isShowingTrailentrances = false;
    }
}


function updateWaterFountains(){
    var state = $("#flip-waterfountain").prop("checked");

    var zoomLevel = map1.getZoom();
    if( state == 1 && zoomLevel >= zoom_level_for_waterfountain){
	if( !isShowingWaterfountains ){
	    for( var i = 0; i < waterfountains.length; i += 1){
		map1.data.add(waterfountains[i]);
	    }
	    isShowingWaterfountains = true;
	}
    } else if( isShowingWaterfountains ) {
	for( var i = 0; i < waterfountains.length; i += 1){
	    map1.data.remove(waterfountains[i]);
	}
	isShowingWaterfountains = false;
    }
}


function updateSportFacility() {
    var state = $("#flip-sportfacility").prop("checked");

    var zoomLevel = map1.getZoom();
    if( state == 1 && zoomLevel >= zoom_level_for_sportfacility){
	if( !isShowingSportfacility ){
	    for( var i = 0; i < sportfacility.length; i += 1){
		map1.data.add(sportfacility[i]);
	    }
	    isShowingSportfacility = true;
	}
    } else if( isShowingSportfacility ) {
	for( var i = 0; i < sportfacility.length; i += 1){
	    map1.data.remove(sportfacility[i]);
	}
	isShowingSportfacility = false;
    }
}


function updateRestaurant(){
    var state = $("#flip-restaurant").prop("checked");

    var zoomLevel = map1.getZoom();
    if( state == 1 && zoomLevel >= zoom_level_for_restaurant){
	if( !isShowingRestaurant){
	    for( var i = 0; i < restaurant.length; i += 1){
		map1.data.add(restaurant[i]);
	    }
	    isShowingRestaurant = true;
	}
    } else if( isShowingRestaurant ) {
	for( var i = 0; i < restaurant.length; i += 1){
	    map1.data.remove(restaurant[i]);
	}
	isShowingRestaurant = false;
    }
}

function toggleBusiness( e ){
    var state = $(this).prop("checked");
    var vis = "";
    if( state ){
	state = 1;
    } else {
	state = 0;
    }

    if ($(this).is($("#flip-business"))) {
        localStorage.setItem("pBusiness", state);
        applyStyles("poi.business", state);

    } else if ($(this).is($("#flip-bikepath"))) {
        localStorage.setItem("pBikePath", state);
        updateBikePaths();
    } else if ($(this).is($("#flip-bikeshop"))) {
        localStorage.setItem("pBikeShop", state);
        updateBikeShops();
    } else if ($(this).is($("#flip-trailentrance"))) {
        localStorage.setItem("pTrailEntrance", state);
        updateTrailEntrances();
    } else if ($(this).is($("#flip-sportfacility"))) {
        localStorage.setItem("pSportFacility", state);
        updateSportFacility();
    } else if ($(this).is($("#flip-restaurant"))) {
        localStorage.setItem("pRestaurant", state);
        updateRestaurant();
    } else if ($(this).is($("#flip-waterfountain"))) {
        localStorage.setItem("pWaterFountain", state);
        updateWaterFountains();
    }
}

function UserPrefs(){
    var pBusiness = localStorage.getItem("pBusiness");
    var pBikePath = localStorage.getItem("pBikePath");
    var pBikeShop = localStorage.getItem("pBikeShop");
    var pTrailEntrance = localStorage.getItem("pTrailEntrance");
    var pSportFacility = localStorage.getItem("pSportFacility");
    var pRestaurant = localStorage.getItem("pRestaurant");
    var pWaterFountain = localStorage.getItem("pWaterFountain");
    
    if( pBusiness == null ){
	pBusiness = 0;
	localStorage.setItem("pBusiness", pBusiness);
    } else {
	pBusiness = parseInt(pBusiness);
    }
    
    if( pBikePath == null ){
	pBikePath = 1;
	localStorage.setItem("pBikePath", pBikePath);
    } else {
	pBikePath = parseInt(pBikePath);
    }

    if( pBikeShop == null ){
	pBikeShop = 0;
	localStorage.setItem("pBikeShop", pBikeShop);
    } else {
	pBikeShop = parseInt(pBikeShop);
    }
    
    if( pTrailEntrance == null ){
	pTrailEntrance = 0;
	localStorage.setItem("pTrailEntrance", pTrailEntrance);
    } else {
	pTrailEntrance = parseInt(pTrailEntrance);
    }

    if (pSportFacility == null) {
        pSportFacility = 0;
        localStorage.setItem("pSportFacility", pSportFacility);
    } else {
        pSportFacility = parseInt(pSportFacility);
    }

    if (pRestaurant == null) {
        pRestaurant = 0;
        localStorage.setItem("pRestaurant", pRestaurant);
    } else {
        pRestaurant = parseInt(pRestaurant);
    }

    if (pWaterFountain == null) {
        pWaterFountain = 0;
        localStorage.setItem("pWaterFountain", pTrailEntrance);
    } else {
        pWaterFountain = parseInt(pWaterFountain);
    }
    
    $("#flip-business").prop("checked", pBusiness);
    $("#flip-bikepath").prop("checked", pBikePath);
    $("#flip-bikeshop").prop("checked", pBikeShop);
    $("#flip-trailentrance").prop("checked", pTrailEntrance);
    $("#flip-sportfacility").prop("checked", pSportFacility);
    $("#flip-restaurant").prop("checked", pRestaurant);
    $("#flip-waterfountain").prop("checked", pWaterFountain);

    $("#flip-business").change(toggleBusiness);
    $("#flip-bikepath").change(toggleBusiness);
    $("#flip-bikeshop").change(toggleBusiness);
    $("#flip-trailentrance").change(toggleBusiness);
    $("#flip-sportfacility").change(toggleBusiness);
    $("#flip-restaurant").change(toggleBusiness);
    $("#flip-waterfountain").change(toggleBusiness);

    applyStyles("poi.business", pBusiness);
}


function mapgeo_callback(response) {
    bikepaths = map1.data.addGeoJson(response);
    isShowingBikepaths = true;
    updateBikePaths();
}


function mapgeo_cb_bikeshops(response) {
    bikeshops = map1.data.addGeoJson(response);
    isShowingBikeshops = true;
    updateBikeShops();
}

function mapgeo_cb_sports(response) {
    sportfacility = map1.data.addGeoJson(response);
    isShowingSportfacility = true;
    updateSportFacility();
}

function mapgeo_cb_restaurants(response) {
    restaurant = map1.data.addGeoJson(response);
    isShowingRestaurant = true;
    updateRestaurant();
}

// function load_restaurants(){
//     loadGeoJson('//assets/data/restaurant_listing.json', {}, function(data){
// 	restaurants = data;
// 	isShowingRestaurant = true;
//     });
// }

function mapgeo_cb_trailentrances(response) {
    trailentrances = map1.data.addGeoJson(response);
    isShowingTrailentrances = true;
    updateTrailEntrances();
}

function mapgeo_cb_fountains(response) {
    waterfountains = map1.data.addGeoJson(response);
    isShowingWaterfountains = true;
    updateWaterFountains();
}

function mapgeo_cb_zones(response) {
    zones = map1.data.addGeoJson(response);
    isShowingTrailentrances = true;
}

function zoomChanged(){
    var zoomLevel = map1.getZoom();
    
    updateBikePaths();
    updateBikeShops();
    updateSportFacility();
    updateRestaurant();
    updateTrailEntrances();
    updateWaterFountains();
}

function mapPageInitialize() {

    if( !item_metas_add_completed ) {
        setTimeout( mapPageInitialize, 500 );
        return;
    }

    var MY_MAPTYPE_ID = 'panam_style';

    var mapOptions = {
        center: { lat: 43.653226, lng: -79.38318429999998},
        zoom: 8,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: []
        },
	mapTypeId: MY_MAPTYPE_ID

    };
    map1 = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    var styledMapOptions = {
	name: 'Pan Am Style'
    };

    var customMapType = new google.maps.StyledMapType(google_map_styling, styledMapOptions);

    map1.mapTypes.set(MY_MAPTYPE_ID, customMapType);

    
    // Color each letter gray. Change the color when the isColorful property
    // is set to true.
    map1.data.setStyle(function(feature) {
	var ret = { zIndex: 1};
	if (feature.getProperty('strokeColor')) {
	    strokeColor = feature.getProperty('strokeColor');
	    ret["strokeColor"] = strokeColor;
	    ret["strokeWeight"] = 1;
	}
	if (feature.getProperty('icon')) {
	    icon = "assets/imgs/overlay_icons/" + feature.getProperty('icon');
	    ret["icon"] = icon;
	}
	return /** @type {google.maps.Data.StyleOptions} */(ret);
    });


    var ctaLayer = new google.maps.KmlLayer({
	url: 'http://brisk-project-download.s3.amazonaws.com/panampath/PanAmOnRoadRoute2015WGS.kmz',
	zIndex: 2,
	suppressInfoWindows: true
    });
    ctaLayer.setMap(map1);
    
    google.maps.event.addListener(ctaLayer, 'click', function(kmlEvent) {
	var text = kmlEvent.featureData.description;
	openInfoWindow(kmlEvent);
    });

    var ctaLayer1 = new google.maps.KmlLayer({
	url: 'http://brisk-project-download.s3.amazonaws.com/panampath/PanAmPathStairs2015WGS.kmz',
	zIndex: 4,
	suppressInfoWindows: true
    });
    ctaLayer1.setMap(map1);
    
    var ctaLayer2 = new google.maps.KmlLayer({
	url: 'http://brisk-project-download.s3.amazonaws.com/panampath/PanAmPathTrail2015WGS.kmz',
	zIndex: 2,
	suppressInfoWindows: true
    });
    ctaLayer2.setMap(map1);
    
//    map1.data.loadGeoJson('http://tcl.uwaterloo.ca/jqm/bikepaths.json');
//    var myParser = new geoXML3.parser({map: map1});
//    myParser.parse('PanAmPathalignment.kml');

    var is_event_listing_page = libGenIsInteractiveMapPage();

    try {
        if( is_event_listing_page ) {
            itemmetaListItems();
        }

        //Start loading databases
        for( var i in item_metas ){
            var item_listing = item_metas[i];
            item_listing.api.pgAsyncLoadItemDatabase( item_listing );
        }

        //start checking if databases are loaded
        mapPollDatabasesAreLoaded();

        initializeFull();

        // Listen for map load completion
        google.maps.event.addListenerOnce(map1, 'idle', function(){
            if (typeof callbackMapReady == 'function') { 
                callbackMapReady();
            }

            // Check if there is an event to display
            var hash = libGenGetUrlHash();
            if( hash ) {
                if( hash.indexOf("item/")==0 ) {
                    curEvId = hash.split("/")[1];
                }
                var item_meta = itemmetaFindByItemID( curEvId );
                libMapShowEventDetailsInEVPage( curEvId );
            } else {
                    map1.setZoom(11);
                
            }

        });

    } catch(e) {        
        console.log("Unable to populate item data:" + e);
    }
}

function initializeFull(){
    var script1 = document.createElement('script');
    script1.src = 'assets/data/bikepaths.json';
    document.getElementsByTagName('head')[0].appendChild(script1);

    var script2 = document.createElement('script');
    script2.src = 'assets/data/bikeshops.json';
    setTimeout( function(){ document.getElementsByTagName('head')[0].appendChild(script2) }, 1 );

    var script3 = document.createElement('script');
    script3.src = 'assets/data/trailentrances.json';
    setTimeout(  function(){document.getElementsByTagName('head')[0].appendChild(script3) }, 2 );
    
    var script4 = document.createElement('script');
    script4.src = 'assets/data/sports_facilities_listing.json';
    setTimeout(  function(){document.getElementsByTagName('head')[0].appendChild(script4) }, 3 );
    google.maps.event.addListener( map1, 'zoom_changed', zoomChanged );
    
//    var script5 = document.createElement('script');
//    script5.src = 'assets/data/restaurant_listing.json';
//    setTimeout(  function(){document.getElementsByTagName('head')[0].appendChild(script5) }, 4000 );
    
    var script6 = document.createElement('script');
    script6.src = 'assets/data/fountains.json';
    setTimeout(  function(){document.getElementsByTagName('head')[0].appendChild(script6) }, 5 );

    UserPrefs();

    // (In this example we use a locally stored copy instead.)
    // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/geojsonp/2.5/week';

    // Create the DIV to hold the control and
    // call the HomeControl() constructor passing
    // in this DIV.
    // var homeControlDiv = document.createElement('div');
    // var homeControl = new HomeControl(homeControlDiv, map_canvas);
    // homeControlDiv.index = 3;
    // map1.controls[google.maps.ControlPosition.RIGHT_TOP].push(homeControlDiv);


     var panelButton = document.createElement('a');
     var panelButtonControl = new PanelControl(panelButton, map_canvas);
     panelButtonControl.index = 1;
     map1.controls[google.maps.ControlPosition.RIGHT_TOP].push(panelButton);

    // $("#mapPanelButton").bind("click", function(){
    // 	$("#mapPanel").toggle();
    // 	return false;
    // });
    
    $("#close-legend").bind("click", function(){
    	$("#mapPanel").hide();
    	return false;
    });
    
    //listen for click events
    map1.data.addListener('click', function(event) {
	openInfoWindow( event);
	// if( event.feature.getProperty("title") ){
	//     //show an infowindow on click   
	//     infoWindow.setContent('<div><div class="gm-title">'+
	// 			  event.feature.getProperty("title") +'</div><div class="gm-addr">' + event.feature.getProperty("subtitle") + '</div></div>');
	//     var anchor = new google.maps.MVCObject();
	//     anchor.set("position",event.latLng);
	//     infoWindow.open(map1,anchor);
	// } else if ( event.feature.getProperty("name") ){
	//     infoWindow.setContent('<div><div class="gm-title">'+
	// 			  event.feature.getProperty("name") +'</div><div class="gm-addr">' + event.feature.getProperty("address") + '</div></div>');
	//     var anchor = new google.maps.MVCObject();
	//     anchor.set("position",event.latLng);
	//     infoWindow.open(map1,anchor);
	// }
    });

    /*
    // Default to my current location
    navigator.geolocation.getCurrentPosition(function(position) {
	var pos = new google.maps.LatLng(position.coords.latitude,
					 position.coords.longitude);

	    <!-- pos = new google.maps.LatLng(43.464, -80.520); -->
	    map1.setCenter(pos);
    }, function(error) {	  
        // alert('code: '    + error.code    + '\n' +
        //       'message: ' + error.message + '\n');
	    <!-- pos = new google.maps.LatLng(43.464, -80.520); -->
	    <!-- map.setCenter(pos); -->
    }, {timeout: 10000, enableHighAccuracy: true});
    */

}


function openInfoWindow( marker ){
    if( marker.hasOwnProperty("feature") && typeof marker.feature.getProperty ===  "function" ){
    	if ( marker.feature.getProperty("name") ){
     	    infoWindow.setContent(
                    '<div>'+
                        '<table>' +
                            '<tr>' +
                                '<td>' +
                                    '<img src="assets/imgs/overlay_icons/' +marker.feature.getProperty("icon") + '">' +
                                '</td>' +
                                '<td style="width: 10px;">' +
                                '</td>' +
                                '<td>' +
                                    '<div class="hievent-title">'+ marker.feature.getProperty("name") +'</div>' + 
                                    '<div class="hievent-date">' + marker.feature.getProperty("address") + '</div>' + 
                                '</td>' +
                            '</tr>' +
                        '</table>' +
                    '</div>');	    
    	    var anchor = new google.maps.MVCObject();
    	    var latlng = new  google.maps.LatLng( marker.latLng.lat() + 0.005, marker.latLng.lng() );
    	    anchor.set("position", latlng);
         	    infoWindow.open(map1,anchor);
    	}
    } else if( marker.hasOwnProperty("featureData") && marker.featureData.hasOwnProperty("infoWindowHtml") ){
//	infoWindow.setContent("Hello orange");	
//	var anchor = new google.maps.MVCObject();
//	anchor.set("position", marker.latLng);
//	infoWindow.open(map1,anchor);
//	return false;
    } else {
    	var title = marker.getTitle("title")
    	if( title ){
    	    //show an infowindow on click
    	    var evId = marker["id"];

            var item_meta = itemmetaFindByItemID( evId) ;
            if( item_meta==null ) {
                libUiAlert("Unable to find item meta for item '" + evId + "'");
            }

            var html = item_meta.api.pgInfoWindowHtml( evId ); 
            infoWindow.setContent( html );
    	    var anchor = new google.maps.MVCObject();
    	    anchor.set("position", marker.getPosition());
    	    infoWindow.open(map1,marker);
        // } else if ( event.feature.getProperty("name") ){
        // 	infoWindow.setContent('<div><div class="gm-title">'+
        // 			      event.feature.getProperty("name") +'</div><div class="gm-addr">' + event.feature.getProperty("address") + '</div></div>');
        // 	var anchor = new google.maps.MVCObject();
        // 	anchor.set("position",event.latLng);
        // 	infoWindow.open(map1,anchor);
    	}
    }
}

function libMapShowEventDetailsInEVPage( item_id )
{
    if(!libGenIsInteractiveMapPage())  {
        // TODO: Change page to event listing page
        window.location.href = "art-and-trails.shtml#item/" + item_id;
        return;
    }

    // Show event details 
    var item_meta = itemmetaFindByItemID( item_id );
    $("#left-tabs").tabs("option", "active", item_meta.tab_id);
    item_meta.api.pgHighlightItem( item_id );
}

function mapGoToLocation(event_idname, latlng){
//    var loc = new google.maps.LatLng(latlng[0], latlng[1]);

//    map1.setCenter(loc);
//    map1.setZoom( 14 );
    mapSmoothZoom( latlng[0], latlng[1], 14 );

    if( markerMap[event_idname ] ) {
	openInfoWindow( markerMap[event_idname]);
    }
    
//    if( event_markers[ event_idname ] ) {
//        event_markers[ event_idname ].showInfoWindow();
//    }    
}

// the smooth zoom function
function mapSmoothZoom (lat, lng, max) {
    function __doZoom( map, max, cnt ) {
        if (cnt >= max) {
                return;
            }
        else {
            z = google.maps.event.addListener(map, 'zoom_changed', function(event){
                google.maps.event.removeListener(z);
                __doZoom(map, max, cnt + 1);
            });
            setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
        }
    }

    var loc = new google.maps.LatLng(lat, lng);
    map1.setCenter(loc); // set map center to marker position
    __doZoom(map1, max, map1.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level

}  

function mapPollDatabasesAreLoaded() {
  try {
    // Start tracking time, if it has not done so
    for( var i in item_metas ) {
      var item_listing = item_metas[i];
      if( !item_listing.db_load_status.start_at ) {
        item_listing.db_load_status.start_at = new Date();
      }
    }

    // Check if there is an error message, abort the loading
    for( var i in item_metas ) {
      var item_listing = item_metas[i];
      if( item_listing.db_load_status.error_msg ) {
          throw item_listing.db_load_status.error_msg;
      }        
    }

    // Check for timeout if database has not completed loading
    var all_completed = true;
    for( var i in item_metas ) {
      var item_listing = item_metas[i];      
      if( !item_listing.db_load_status.is_completed ) {
        all_completed = false;

        // Check for time out
        var current_time_msec = new Date().getTime();
        if( current_time_msec - item_listing.db_load_status.start_at.getTime() > 10*1000 ) {
            item_listing.db_load_status.error_msg = "Timeout when preparing pre-loaded items.";
            throw item_listing.db_load_status.error_msg;
        }
      }
    }
    if( !all_completed ) {
      // At least a database has not completed loading. Check again later...
      setTimeout( mapPollDatabasesAreLoaded, 100 );
      return;
    }

    // From here on: database has completed loading
    // Check if there is error while loading
    if( item_listing.db_load_status.error_msg ) {
        // There is an error during loading
        throw item_listing.db_load_status.error_msg;
    }

    // databases are all loaded
    mapDatabasePostLoadCallback();

  } catch(e) {
    alert("Unable to load database: " + e);
  }
} 

function mapDatabasePostLoadCallback() {
    for( var i in item_metas ) {
        var item_listing = item_metas[i];
        // Events are all loaded. Display them.
        var item_hashdb = item_listing.api.pgItemHashDB();

        _mapPopulateItemPins( item_listing, item_hashdb );

        if( !libGenIsInteractiveMapPage() ){
            // Index page
    //            curEvId = getNextEvent();            
    //            pgPopulateNextEvent( curEvId );
        } else {
            // Event page
            $("#event-list-close-tab" + item_listing.tab_id).bind('click', function(){
                $("#event-details-dropdown-tab" + item_listing.tab_id + ":visible").slideUp("slow");
                $("#event-details-dropdown-tab" + item_listing.tab_id + " .ev-list-item").removeClass("active");
                $("#event-list-close-tab" + item_listing.tab_id).hide();    
            });

            item_listing.api.pgPopulateListItems( item_listing, item_hashdb );
        }

        // Hide the details windows
        $("#event-details-dropdown-tab" + item_listing.tab_id).hide();
    }

    // Initialize the tabs
    $("#left-tabs").tabs();  

    // Format tab CSS
    $(".event-content").css("padding", "0")
}

function _mapPopulateItemPins( item_listing, item_hashdb )
{
    function __split_text_into_rows( context, text, font_size ){    

        var max_canvas_width=300;

        // Break up title text accordingly
        context.font=font_size + "px muli";
        var cur_row_text = ""
        var row_text = [];
        var text_words = text.split(" ");

        for( var i in text_words ) {
            var cur_row_width = context.measureText( cur_row_text + " " + text_words[i] ).width;

            if( cur_row_width<max_canvas_width ) {
                cur_row_text = cur_row_text + " " + text_words[i];
                continue;
            }

            // End the current row and start building the next row
            row_text.push( cur_row_text.trim() );
            cur_row_text = text_words[i];
        }

        // Push final row
        row_text.push( cur_row_text.trim() );

        return row_text;
    }

    function __determine_canvas_width( context, title_rows, title_font_size, desc_rows, desc_font_size )
    {
        // Determine the max row width
        var row_width_max = 0
        context.font=title_font_size + "px muli";
        for( var i in title_rows ) {
            var cur_row_width = context.measureText( title_rows[i] ).width;
            if( row_width_max < cur_row_width ) {
                row_width_max = cur_row_width;
            }
        }

        context.font=desc_font_size + "px muli";
        for( var i in desc_rows ) {
            var cur_row_width = context.measureText( desc_rows[i] ).width;
            if( row_width_max < cur_row_width ) {
                row_width_max = cur_row_width;
            }
        }    

        return row_width_max + 60 /* icon width */;
    }

    function __determine_canvas_height( context, title_rows, title_font_size, desc_rows, desc_font_size )
    {
        var row_spacing = 3
        var canvas_height = 0
        canvas_height = canvas_height + (title_rows.length * ( title_font_size + row_spacing ) );
        canvas_height = canvas_height + (desc_rows.length * ( desc_font_size + row_spacing ) );

        if( canvas_height < 40 ) {
            // set minimum height
            canvas_height = 40; 
        }
        return canvas_height;
    }

    function __add_event_pin( item_id ) {
        try {
            var item_pin_data = item_listing.api.pgPinInfoWindowData( item_id );
            var latitude     = item_pin_data.latitude;
            var longitude    = item_pin_data.longitude;
            var path         = new google.maps.LatLng( latitude, longitude );
            var title        = item_pin_data.title;
            var desc         = item_pin_data.desc;
            var item_id_name = item_pin_data.item_id_name;

            var canvas    = document.createElement('canvas');           
            var context   = canvas.getContext('2d');

            //
            // Dynamically determine canvas width and height
            //
            var title_font_size = 16;
            var desc_font_size = 12;
            var title_rows = __split_text_into_rows( context, title, title_font_size);
            var desc_rows = __split_text_into_rows( context, desc, desc_font_size);

            var canvas_width = __determine_canvas_width( context, title_rows, title_font_size, desc_rows, desc_font_size );
            var canvas_height = __determine_canvas_height( context, title_rows, title_font_size, desc_rows, desc_font_size );

            canvas.width = canvas_width;
            canvas.height = canvas_height;
            console.log( "Canvas height/width: " + canvas_height + "/" + canvas_width);

            //
            // Populate canvas
            // 

            var text_top_position = 15;

            //context.fillStyle = 'blue';
            context.font = title_font_size + 'px muli';
            for( var i in title_rows ) {
                context.fillText(title_rows[i], 50, text_top_position);
                text_top_position = text_top_position + title_font_size;
            }

            context.font = desc_font_size+ 'px muli';
            for( var i in desc_rows ) {
                context.fillText(desc_rows[i], 50, text_top_position);
                text_top_position = text_top_position + desc_font_size;
            }

            var marker = new google.maps.Marker({
                position: path,
                title: title,//canvas.toDataURL(),//title,
                //snippet: date,
                icon: item_listing.api.pgPinIcon(),
                map: map1
            });
            marker["id"] = item_id_name;

            markerMap[ item_id_name ] = marker;
            
            google.maps.event.addListener(marker, 'click', function(event) {

            openInfoWindow( this )
//          infoWindow.setContent(this.title);
//          infoWindow.open(map1,marker);           
            });

        } catch( e ) {
            console.log( "Unable to display event:" + e );
        }
    }

    for( var i in item_hashdb ) {
        __add_event_pin( i );
    }
}

