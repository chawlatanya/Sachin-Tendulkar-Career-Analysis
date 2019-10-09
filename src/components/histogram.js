import React , {useEffect} from 'react';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js'
import { getHistogramData } from '../actions/dataActions';
import Card from 'react-bootstrap/Card';



const Histogram=(props)=>{
   
    useEffect(()=>{
            props.getHistogramData();
      },[])

      const dataObj={
          x:props.histData,
          type:'histogram',
          marker:{color:'#b5c2e8'},
          xbins:{
              end:250,
              size:1,
              start:0
          },
          autobinx:false,
          opacity:0.65
      }

      const layoutObj={
        width: 500, 
        height: 500,
        bargap: 0.05, 
        title: 'Distribution of Runs Scored', 
        xaxis:{title:'Runs'},
        yaxis:{title:'Count'},
        dragmode:false
       
    }
    const config={displayModeBar:false}
      const data=[dataObj]

      return (
      
            <Card style={{ "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Header>
                    <center style={{fontFamily: 'Crimson Text, serif'}}><h2>A distribution of Runs Scored over his entire career</h2></center>
                </Card.Header>   
                <Plot data={data} layout={layoutObj} config={config} />
            <Card.Footer>
            <center><h6>Scored runs in the range of  50-200 <strong>145</strong> times</h6></center>
            </Card.Footer>
            </Card>
        

      )}

const mapStateToProps=state=>({
   histData: state.data.histogramData,
})
export default connect(mapStateToProps,{ getHistogramData })(Histogram);




