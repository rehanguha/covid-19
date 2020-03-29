var rawData
var loc = []
var deaths_map = [];
var confirmed_map = [];
var recovered_map = [];

fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {

    rawData = data;

    for(var key in rawData){
      loc.push(key);
      deaths_map.push(rawData[key][rawData[key].length-1]["deaths"]);
      confirmed_map.push(rawData[key][rawData[key].length-1]['confirmed']);
      recovered_map.push(rawData[key][rawData[key].length-1]["recovered"]);
      
      };

var worldmap_deaths_data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: loc,
        z: deaths_map,
        autocolorscale: true
    }];
    var layout = {
      title: 'COVID-19 Deaths',
      geo: {
          projection: {
              type: 'robinson'
          }
      }
    };
    Plotly.newPlot("worldmap_deaths_data", worldmap_deaths_data, layout, {showLink: false});



      var worldmap_recovered_data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: loc,
        z: recovered_map,
        autocolorscale: true
    }];

    var layout = {
      title: 'COVID-19 Recovered',
      geo: {
          projection: {
              type: 'robinson'
          }
      }
    };

    Plotly.newPlot("worldmap_recovered_data", worldmap_recovered_data, layout, {showLink: false});



    var worldmap_confirmed_data = [{
      type: 'choropleth',
      locationmode: 'country names',
      locations: loc,
      z: confirmed_map,
      autocolorscale: true
  }];

  var layout = {
    title: 'COVID-19 Confirmed',
    geo: {
        projection: {
            type: 'robinson'
        }
    }
  };

  Plotly.newPlot("worldmap_confirmed_data", worldmap_confirmed_data, layout, {showLink: false});



});