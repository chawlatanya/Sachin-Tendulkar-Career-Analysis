import React , {useState,useEffect} from 'react';
import { getCountryData, getContinentData } from "../actions/dataActions";
import {connect } from 'react-redux'
import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts';
import FusionMaps from 'fusioncharts/fusioncharts.maps';
import Asia from 'fusioncharts/maps/fusioncharts.asia';
import Europe from 'fusioncharts/maps/fusioncharts.europe';
import Africa from 'fusioncharts/maps/fusioncharts.africa';
import Oceania from 'fusioncharts/maps/fusioncharts.oceania';
import NorthAmericaWCaribbean from 'fusioncharts/maps/fusioncharts.northamericawcaribbean';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';   
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts' 
import Nav from 'react-bootstrap/Nav'
import Card, { CardBody } from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
ReactFC.fcRoot(FusionCharts, FusionMaps,Asia,Europe,Africa,Oceania,NorthAmericaWCaribbean, FusionTheme, Column2D);


const Map=({data,continent,setCountry})=>{
  
  let chart={
            "theme": "fusion",
            "fillColor":"#FFFFFF",
            "borderColor":"#000000",
            "nullEntityColor":"FFFFFF"
            }   

  let entity=[
            {
              "internalId" : "042",
              "newId": "042",
              "sName" : "Eng",
              "lName" : "England",
              
          },{
              "internalId" : "027",
              "newId": "027",
              "sName" : "WI",
              "lName" : "West Indies",
              
          }
  ]

  let colorrange={
                "minvalue": "0",
                "startlabel": "Low Win-Ratio",
                "endlabel": "High Win-Ratio",
                "code": "#ee6e85",
                "gradient": "1",
                "color": [
                      {
                      "maxvalue": "50",
                      "code": "fce59f",
                      "displayValue": "Median"
                    }, 
                    {
                      "maxvalue": "100",
                      "code": "6fedb2"
                    }
                  ]
                }

        let datasource={
            "chart": chart,
            "entityDef" : entity,
            "colorrange": colorrange,
            "data": data[continent]
          }

          const config={
            type: `maps/${continent}`,
            renderAt: 'map',
            width: 500,
            height: 500,
            dataFormat: 'json',
            dataSource: datasource,
            fillColor:"#FFFFFF",
            events: {
                "entityClick":function(evt,data)
                    {
                        
                        if(data.value)
                        {
                            if(data.label==="United Arab Emirates")
                            setCountry("U.A.E.")
                            else
                            setCountry(data.label)
                        }
                    }  
            }
        }
        
        return(
            <div>
            <ReactFC {...config}/>
            </div>
        )
}
const Title=()=>{
    return(
        <div>
       <center style={{fontFamily: 'Crimson Text, serif'}}><h2>A visualisation of Win-Ratio against different nations</h2></center>
        </div>
    )
}

const Runs=({data,country})=>{
    return(
        <div>
        {/* <Title country={country}/>//725 620 */}
          <ComposedChart width={500} height={500} data={data[country]}>
            {/* // margin={{top: 20, right: 20, bottom: 20, left: 20}}> */}
          <CartesianGrid stroke='#f5f5f5'/>
          <XAxis dataKey="year"/>
          <YAxis />
          <Tooltip/>
          <Legend/>
          <Bar dataKey='value' barSize={30} fill='#f8d7da'/>
          <Line type='monotone' dataKey='value' stroke='#ed97a6' activeDot={{r: 6}}/>
       </ComposedChart>
       </div>
    )
}



const Continent = (props)=>{
  
    const[continent,setContinent]=useState('asia')
    const[country,setCountry]=useState('Bangladesh')
    const style={"display":"flex","justifyContent":"space-around","marginTop":"30px"}
 

  useEffect(()=>{
    props.getContinentData()
  },[])

  useEffect(()=>{
    props.getCountryData()
  },[])
  const mapCountryToContinent={
    "asia":"Bangladesh",
    "europe":"England",
    "africa":"South Africa",
    "oceania":"New Zealand",
    "northamericawcaribbean":"West Indies"
  }
   
return(
  
    <Row>
      <Col>
          <Card  style={{ "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
          <Card.Header>
            <Title/>
            <Nav variant="tabs" defaultActiveKey="Asia" activeKey={continent} onSelect={(continent) => {setContinent(continent); setCountry(mapCountryToContinent[continent])}}>
              <Nav.Item>
                <Nav.Link eventKey="asia">Asia</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="oceania">Oceania</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="africa" >Africa</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="europe" >Europe</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="northamericawcaribbean" >North America</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          
            <Map id="map" data={props.continents} continent={continent} setCountry={setCountry}/> 
            
          <Card.Footer>
            <h6>Check out the year-wise Batting Score Analysis of each country by clicking on it.</h6>
          </Card.Footer>
    </Card> 
    </Col>
    <Col>
    <Card style={{ "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} >
      <Card.Header>
         <center style={{ fontFamily: 'Crimson Text, serif'}}><h2>Year-Wise Analysis of Batting-Score Against {country}</h2></center> 
      </Card.Header>
     
        <Runs data={props.countries} country={country} />
      
    </Card>
    </Col>
    </Row> 



)}

const mapStateToData=state=>({
  ...state,
  countries:state.data.countries,
  continents:state.data.continents
})
export default connect(mapStateToData,{getContinentData,getCountryData})(Continent);
