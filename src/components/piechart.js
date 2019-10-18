import React , {useEffect} from 'react';
import { getPieData } from '../actions/dataActions'
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import {PieChart, Pie, Legend, Tooltip} from 'recharts';


const Piegraph=({data})=>(
    <PieChart width={800} height={400} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <Pie isAnimationActive={true} dataKey={'value'} data={data} cx={550} cy={200} outerRadius={150} label/>
        <Tooltip/>
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
       </PieChart>
)

  const Piechart=(props)=>{
    useEffect(()=>{
        props.getPieData()},[])
    


return(
<Card style={{ "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} >
            <Card.Header>
                <center style={{fontFamily: 'Crimson Text, serif'}}><h2>Total Wins</h2></center>
            </Card.Header>   
                <Piegraph data={props.pieData}/>

    </Card>
    
)}
const mapStateToProps=(state)=>({
    pieData:state.data.pieData
})
export default connect(mapStateToProps,{ getPieData })(Piechart);