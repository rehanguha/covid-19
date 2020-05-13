var timeline
var deaths = [];
var confirmed = [];
var recovered = [];
var active = [];
var death_rate = [];
var recovery_rate = [];
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
        active = [];
        death_rate = [];
        recovery_rate = [];
        date = [];

        timeline = data[chosenCountry];

        for(i=0; i<timeline.length ; i++){
            date.push(timeline[i]["date"]);
            confirmed.push(timeline[i]["confirmed"]);
            recovered.push(timeline[i]["recovered"]);
            deaths.push(timeline[i]["deaths"]);
            active.push(timeline[i]["confirmed"] - timeline[i]["recovered"] - timeline[i]["deaths"])
            death_rate.push((timeline[i]["deaths"]/timeline[i]["confirmed"]) * 100.0)
            recovery_rate.push((timeline[i]["recovered"]/timeline[i]["confirmed"]) * 100.0)
        };

      };

        setCountryViz('Afghanistan');

        function setCountryViz(chosenCountry) {
            getCountryData(chosenCountry);  
        
            var trace1 = {
                type: "scatter",
                mode: "lines+markers",
                name: 'Deaths',
                x: date,
                y: deaths,
                line: {color: '#cf1717'}
              }
              
              var trace2 = {
                type: "scatter",
                mode: "lines+markers",
                name: 'Recovered',
                x: date,
                y: recovered,
                line: {color: '#20b812'}
              }
        
              var trace3 = {
                type: "scatter",
                mode:  "lines+markers",
                name: 'Confirmed',
                x: date,
                y: confirmed,
                line: {color: '#dbd816'}
              }

              var trace4 = {
                type: "scatter",
                mode:  "lines+markers",
                name: 'Active',
                x: date,
                y: active,
                line: {color: '#1754cf'}
              }
              
              var timeseries_data = [trace1,trace2, trace3, trace4];
              
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



              var trace_rate1 = {
                type: "scatter",
                mode: "lines+markers",
                name: 'Death Rate',
                x: date,
                y: death_rate,
                line: {color: '#cf1717'}
              }
              
              var trace_rate2 = {
                type: "scatter",
                mode: "lines+markers",
                name: 'Recovery Rate',
                x: date,
                y: recovery_rate,
                line: {color: '#20b812'}
              }

              var timeseries_rates = [trace_rate1, trace_rate2];
              
              var layout = {
                title: 'Death/Recovery Rate for COVID-19 ('.concat(chosenCountry, ')'),
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
              
              
              Plotly.newPlot('country_rates', timeseries_rates, layout);



              var gauge = [

                {
                  type: "indicator",
                  mode: "number+delta",
                  value: confirmed[confirmed.length-1]-recovered[recovered.length-1]-deaths[deaths.length-1],
                  domain: { row: 0, column: 0 },
                  delta: { reference: confirmed[confirmed.length-2]-recovered[recovered.length-2]-deaths[deaths.length-2] },
                  title: { text: "Active Cases" },
                },
                {
                    type: "indicator",
                    mode: "number+delta",
                    value: confirmed[confirmed.length-1],
                    domain: { row: 0, column: 1 },
                    delta: { reference: confirmed[confirmed.length-2] },
                    title: { text: "Confirmed" },
                  },
                  {
                    type: "indicator",
                    mode: "number+delta",
                    value: deaths[deaths.length-1],
                    domain: { row: 1, column: 0 },
                    delta: { reference: deaths[deaths.length-2] },
                    title: { text: "Deaths" },
                  },
                  {
                    type: "indicator",
                    mode: "number+delta",
                    value: recovered[recovered.length-1],
                    domain: { row: 1, column: 1 },
                    delta: { reference: recovered[recovered.length-2] },
                    title: { text: "Recovered" },
                  },

              ];
              
              var layout = {
                width: 500,
                height: 400,
                margin: { t: 25, b: 25, l: 25, r: 25 },
                grid: { rows: 2, columns: 2, pattern: "independent" },
                template: {
                  data: {
                    indicator: [
                      {
                        mode: "number+delta+gauge",
                      }
                    ]
                  }
                }
              };
              
              Plotly.newPlot('country_gauge', gauge, layout);






              var country_piechart = [{
                values: [confirmed[confirmed.length-1]-recovered[recovered.length-1]-deaths[deaths.length-1], recovered[recovered.length-1], deaths[deaths.length-1]],
                labels: ['Active Cases', 'Recovered', 'Deaths'],
                type: 'pie',
                textinfo: "label+percent",
            }];
            
            var layout = {
                height: 400,
                width: 500
            };
            
            Plotly.newPlot('country_piechart', country_piechart, layout);



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
        setCountryViz(countrySelector.value);

    }
      
    countrySelector.addEventListener('change', updateCountry, false);


});