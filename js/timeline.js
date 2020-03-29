var timeline
var deaths = [];
var confirmed = [];
var recovered = [];
var date = [];
var today = new Date();
var today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
  
      function getCountryData(chosenCountry) {
        deaths = [];
        confirmed = [];
        recovered = [];
        date = [];

        timeline = data[chosenCountry];

        for(i=0; i<timeline.length ; i++){
            date.push(timeline[i]["date"]);
            confirmed.push(timeline[i]["confirmed"]);
            recovered.push(timeline[i]["recovered"]);
            deaths.push(timeline[i]["deaths"]);
        };

      };

        setBubblePlot('Afghanistan');

        function setBubblePlot(chosenCountry) {
            getCountryData(chosenCountry);  
        
            var trace1 = {
                type: "scatter",
                mode: "lines",
                name: 'Deaths',
                x: date,
                y: deaths,
                line: {color: '#cf1717'}
              }
              
              var trace2 = {
                type: "scatter",
                mode: "lines",
                name: 'Recovered',
                x: date,
                y: recovered,
                line: {color: '#20b812'}
              }
        
              var trace3 = {
                type: "scatter",
                mode:  "lines",
                name: 'Confirmed',
                x: date,
                y: confirmed,
                line: {color: '#1754cf'}
              }
              
              var timeseries_data = [trace1,trace2, trace3];
              
              var layout = {
                title: 'Time Series of COVID-19 ('.concat(chosenCountry, ')'),
                xaxis: {
                  autorange: true,
                  range: ['2020-1-22', today],
                  rangeselector: {buttons: [
                      {
                        count: 1,
                        label: '1w',
                        step: 'week',
                        stepmode: 'backward'
                      },
                      {
                        count: 2,
                        label: '6w',
                        step: 'week',
                        stepmode: 'backward'
                      },
                      {step: 'all'}
                    ]},
                  rangeslider: {range: ['2020-1-22', today]},
                  type: 'date'
                },
                yaxis: {
                  autorange: true,
                  range: [86.8700008333, 138.870004167],
                  type: 'linear'
                }
              };
              
              
              Plotly.newPlot('country_timeseries', timeseries_data, layout);
        };

        var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        countrySelector = innerContainer.querySelector('.countrydata');
    
    function assignOptions(textArray, selector) {
      for (var i = 0; i < textArray.length;  i++) {
          var currentOption = document.createElement('option');
          currentOption.text = textArray[i];
          selector.appendChild(currentOption);
      }
    }
    
    assignOptions(loc, countrySelector);
    
    function updateCountry(){
        setBubblePlot(countrySelector.value);
    }
      
    countrySelector.addEventListener('change', updateCountry, false);

      

});