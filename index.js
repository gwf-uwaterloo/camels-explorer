
var mymap = L.map('mapid').setView([42, -93], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
		}).addTo(mymap);

var data = new L.GeoJSON.AJAX("newfile.geojson",{
	onEachFeature:onEachFeature,
});

var stations = new L.GeoJSON.AJAX("stations.geojson",{

	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, {
			radius: 2,
			fillColor: "#0000ff",
			color: "#000",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		});
	}
})
data.on('data:loaded', function(){
	var min=1000	
		var max=0
		for(var key in data['_layers'])
		{
			max=Math.max(data['_layers'][key]['feature']['properties']['elev_mean'],max)
				min=Math.min(data['_layers'][key]['feature']['properties']['elev_mean'],min)
		}
	diff=max-min

		for(var key in data['_layers'])
		{
			perc=100*(data['_layers'][key]['feature']['properties']['elev_mean']-min)/diff
				console.log(perc)
				data['_layers'][key].setStyle({color:perc2color(perc),weight:1 })
		}
	data.addTo(mymap);
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 10, 20, 50, 100],
		labels = [],
		from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
					'<i style="background:' + perc2color(from)  + '"></i> ' +
				  Math.round(min+from/100*diff) );
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};
	legend.addTo(mymap);
});

stations.on('data:loaded',function(){
	console.log(stations)
		stations.addTo(mymap)
});


var rect = L.rectangle([[59.9, 29.9], [60.1, 30.1]]);
rect.enableEdit
mymap.addLayer(rect);
rect.on('dblclick', L.DomEvent.stop).on('dblclick', rect.toggleEdit);


function onEachFeature(feature, layer) {
	//bind click
	layer.on('click', function (e) {
		// e = event
		// You can make your ajax call declaration here
		//$.ajax(... 
		$(datasetList).empty()
			var data=`<div class="container" >`
			Object.keys(feature["properties"]).forEach(function(k){
				if(k=='geojson')
					index='basin_id'
				else 
					index=k
						data+=`<div class="row">`+
						`<div class="col" id="cols">`+
						index+
						`</div>`+
						`<div class="col" id="cols">`+
						feature["properties"][k]+
						`</div> </div>`
			});
		data+=`</div>`
			$(data).appendTo('#datasetList')
	});

}


function perc2color(perc) {
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}

function getColor(d) {
	return d > 1000 ? '#800026' :
		d > 500  ? '#BD0026' :
		d > 200  ? '#E31A1C' :
		d > 100  ? '#FC4E2A' :
		d > 50   ? '#FD8D3C' :
		d > 20   ? '#FEB24C' :
		d > 10   ? '#FED976' :
		'#FFEDA0';
}
