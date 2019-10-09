import React , {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js'
import { getHistogramData } from '../actions/dataActions';
import Card from 'react-bootstrap/Card';



const Histogram=(props)=>{
    //const [histogramData, setHistogramData]=useState([])
    useEffect(()=>{
        // axios
        //     .get("http://localhost:3001/histogram-data")
        //     .then((response)=>{
        //      setHistogramData(response.data)
        //     })
           props.getHistogramData();
          // getHistogramData()
           // store.dispatch(getHistogramData())
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
        //  <div style={{display:"flex", flexDirection:"row-reverse",marginTop:"30px",justifyContent:"space-around",alignItems:"baseline"}}>
            <Card style={{ "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Card.Header>
                    <center style={{fontFamily: 'Crimson Text, serif'}}><h2>A distribution of Runs Scored over his entire career</h2></center>
                </Card.Header>   
             
                <Plot data={data} layout={layoutObj} config={config} />
           
            <Card.Footer>
            <center><h6>Scored runs in the range of  50-200 <strong>145</strong> times</h6></center>
            </Card.Footer>
            {/* </Card>
            <Card border="info" style={{"boxShadow": "0 4px 8px 0 rgba(0,0,0,0)"}} >
                <Card.Body></Card.Body>
            </Card> */}
            </Card>// </div>
      )
        

}

const mapStateToProps=state=>({
   histData: state.data.histogramData,
})
export default connect(mapStateToProps,{ getHistogramData })(Histogram);
//export default Histogram




