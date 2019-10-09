import React , {useState,useEffect} from 'react';
import { getCountryStats } from "../actions/dataActions"
import { connect } from 'react-redux';
import {XAxis, YAxis, Tooltip, Legend, Label,BarChart, Bar} from 'recharts';
import Card from 'react-bootstrap/Card';


const style={
    fontFamily:'Calibri',
    fontSize:'20'
}

const CustomizedAxisTick=(props)=>{
    const {x, y, payload} = props;
    return(
      <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={13} textAnchor="middle" fill="#666" transform="rotate(-12)" fontFamily='Calibri'>{payload.value}</text>
        </g>
      );
    }

    const labelstyle={
        fontFamily:'Calibri',
         fontSize:'16'
    }


const CountryData=(props)=>{
    //const[countryData,setCountryData]=useState([])
    useEffect(()=>{
       props.getCountryStats()
      },[])

    return(
        <Card style={{ "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
        <Card.Header>
            <center style={{fontFamily: 'Crimson Text, serif'}}><h2>Country-Wise Performance Analysis</h2></center>
        </Card.Header> 
        <Card.Body>  
            <BarChart width={920} height={550} data={props.countryData} >
            <XAxis dataKey="country" interval={0} tick={<CustomizedAxisTick/>}>
            </XAxis>
            <YAxis>
            <Label value="Number of matches" interval={0} position="outside" angle={-90} style={labelstyle} />
            </YAxis>
            <Tooltip wrapperStyle={style}/>
            <Legend layout="vertical" verticalAlign="middle" align="right" />
            <Bar dataKey="won" stackId="a" fill="#b3e8e0" />
            <Bar dataKey="lost" stackId="a" fill="#edb7b7" />
            <Bar dataKey="tied" stackId="a" fill="#ebe8b9" />
            </BarChart>
        </Card.Body>
        </Card>
      //  </div>

  )
}
const mapStateToProps=state=>({
    countryData:state.data.countryData
})
export default connect(mapStateToProps,{ getCountryStats })(CountryData);