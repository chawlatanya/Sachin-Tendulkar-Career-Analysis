import React , {useState} from 'react';
import ReactDOM from 'react-dom';

// Step 2 - Including the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Step 3 - Including the fusioncharts library
import FusionCharts from 'fusioncharts';

// Step 4 - Including the map renderer
import FusionMaps from 'fusioncharts/fusioncharts.maps';

// Step 5 - Including the map definition file
import World from 'fusioncharts/maps/fusioncharts.worldwithcountries';
import Column2D from 'fusioncharts/fusioncharts.charts';
// Step 6 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';    
ReactFC.fcRoot(FusionCharts, FusionMaps, World, FusionTheme, Column2D);

const chartConfigs = {
    type: 'maps/worldwithcountries',
    renderAt: 'world-map',
    width: '650',
    height: '450',
    dataFormat: 'json',
    dataSource: {
      "map": {
        "theme": "fusion",
        "caption": "Played Against",
        "subcaption": "Win Ratio"   
       
        
      },
      "colorrange": {
        "minvalue": "0",
        "startlabel": "Low",
        "endlabel": "High",
        "code": "#FF4411",
        "gradient": "1",
        "color": [{
          "maxvalue": "25",
          "code": "#FFDD44",
          "displayValue": "Median"
        }, {
          "maxvalue": "100",
          "code": "#6baa01"
        }]
      },
      "data": [{
        "id": "116",
        "value":"10",
        "link": "newchart-json-pak",
        "showLabel":"1"
      }, {
        "id": "104",
        "value":"40",
        "link": "newchart-json-Texas",
      }, {
        "id": "118",
        "value":"80",
        "link": "newchart-json-NorthCarolina",

      },
      {
        "id": "05",
        "value":"100",
        "link": "newchart-json-NorthCarolina",
      },
      {
        "id": "110",
        "value":"0",
        "link": "newchart-json-Texas",
      }
     ],
      
      "linkeddata": [{
        "id": "pak",
        "linkedchart": {
           " width": '650',
            "height": '450',
         
   		
    "chart": {
        "caption": "Monthly revenue for last year",
        "subCaption": "Harry's SuperMart",
        "xAxisName": "Month",
        "yAxisName": "Revenues (In USD)",
        "numberPrefix": "$",
        "theme": "fusion"
    },
    "data": [
        {
            "label": "Jan",
            "value": "420000"
        },
        {
            "label": "Feb",
            "value": "810000"
        },
        {
            "label": "Mar",
            "value": "720000"
        },
        {
            "label": "Apr",
            "value": "550000"
        },
        {
            "label": "May",
            "value": "910000"
        },
        {
            "label": "Jun",
            "value": "510000"
        },
        {
            "label": "Jul",
            "value": "680000"
        },
        {
            "label": "Aug",
            "value": "620000"
        },
        {
            "label": "Sep",
            "value": "610000"
        },
        {
            "label": "Oct",
            "value": "490000"
        },
        {
            "label": "Nov",
            "value": "900000"
        },
        {
            "label": "Dec",
            "value": "730000"
        }
    ],
}, 
      }]
    },
    "events": {

      "beforeRender": function(e) {
        //Configure the second level chart's properties
        e.sender.configureLink({
          type: "column2d",
         renderAt: 'runs',
          overlayButton: {
            message: 'Back',
            fontColor: '880000',
            bgColor: 'FFEEEE',
            borderColor: '660000'
          }
        }, 0);
      }
    }
  }

const style={"display":"flex"}
const App=()=>{

    return(
        <div id="frame">
           <div className="chart-row" style={style} >
            <div id="world-map" >
            <ReactFC {...chartConfigs}/>
            </div>
            <div id="runs" className="inline">
            </div>
           
          </div>
          <div className="chart-row">
            <div id="wickets" className="inline">
            </div>    
            <div id="runs_conceded" className="inline">
          </div>
          
          </div>  
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));

