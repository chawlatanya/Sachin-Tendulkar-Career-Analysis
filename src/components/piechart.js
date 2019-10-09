import React , {useState ,useEffect} from 'react';
import { getPieData } from '../actions/dataActions'
import ReactApexChart from 'react-apexcharts';
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
  //  const [pieData, setPieData]=useState([])

    useEffect(()=>{
        props.getPieData()},[])
    
//       const responsive=[
//           {
//             breakpoint: 480,
//             options: {
//                 chart: {
//                  width: 200
//                 },
//             legend: {
//                 position: 'bottom'
//                 }
//             }
//         }]

//     const title={
//         text: 'Total Matches Won',
//         align: 'center',
//         margin: 10,
//         offsetX: 0,
//         offsetY: 0,
//         floating: true,
//         style: 
//             {
//             fontSize:  '16px',
//             color:  '#263238',
//             fontFamily:'Calibri'
//             }
//         }
//     const series=props.pieData   
//     const  options={
//     labels: ['Won', 'Lost', 'Tied'],
//     responsive: responsive,
//     title: title,
//     colors: ['#abe5a1','#e8a2a2','#e8e3a0'],
//     dataLabels:{
//     style: {
//             fontSize: '14px',
//             fontFamily: 'Calibri'
//           }
//     }
// }

return(
<Card style={{ "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} >
            <Card.Header>
                <center style={{fontFamily: 'Crimson Text, serif'}}><h2>Total Wins</h2></center>
            </Card.Header>   
                <Piegraph data={props.pieData}/>

                 {/* <ReactApexChart  options={options} series={series} type="pie" width="500" height="500" /> */}
    </Card>
    
)}
const mapStateToProps=(state)=>({
    pieData:state.data.pieData
})
export default connect(mapStateToProps,{ getPieData })(Piechart);