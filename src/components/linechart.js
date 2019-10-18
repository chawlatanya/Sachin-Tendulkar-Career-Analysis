import React , {useEffect} from 'react';
import  { getLineData } from '../actions/dataActions';
import { connect } from 'react-redux';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label} from 'recharts';
 import Card from 'react-bootstrap/Card'


const style={
        margin:-10,
        marginLeft:50,
        fontFamily:'Calibri',
        fontSize:'20'
}
const toolStyle={
        fontFamily:'Calibri',
        fontSize:'20'
}
const SimpleLineChart=({data})=>(
    <LineChart data={data} width={500} height={500} >
         <XAxis dataKey="year">
         <Label value="Timeline" offset={-6} position="insideBottom" fontFamily='Calibri' fontSize='18'/>
         </XAxis>
         <YAxis>
         <Label value="Count" offset={0} position="insideLeft" fontFamily='Calibri' fontSize='18'/>
         </YAxis>
         <Tooltip wrapperStyle={toolStyle}/>
         <Legend  wrapperStyle={style} /> 
         <Line type="monotone" dataKey="Number of half-centuries" stroke="#8884d8" activeDot={{r: 6}}/>
         <Line type="monotone" dataKey="Number of centuries" stroke="#82ca9d" activeDot={{r: 6}} />
         <Line type="monotone" dataKey="Number of double-centuries" stroke="#d60b5f" activeDot={{r: 6}} />
        </LineChart>
  )


const LineGraph=(props)=>{
   
    useEffect(()=>{
        props.getLineData()
    
    },[])

    return(
  
        <Card style={{ "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} >
            <Card.Header>
                <center style={{fontFamily: 'Crimson Text, serif'}}><h2>A representation of number of centuries made</h2></center>
            </Card.Header>   
        <SimpleLineChart data={props.centuryData}/>
            
        </Card>)}
const mapStateToProps=state=>({
    ...state,
    centuryData:state.data.centuryData
})

export default connect(mapStateToProps, { getLineData })(LineGraph);







  