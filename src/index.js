import React  from 'react';
import store from './store.js'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Histogram from './components/histogram';
import Stats from './components/stats';
import LineGraph from './components/linechart';
import PieChart from './components/piechart.js';
import CountryData from'./components/countrydata.js';
import Continent from './components/continent.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const App=()=>{
 

  //  const style={"display":"flex",alignContent:"space-evenly",flexDirection:"column"}
    return(
      <Provider store={store}> 
          <Container >
            <Row style={{marginTop:"20px"}}>
              <Stats/>
            </Row>
            <Row style={{marginTop:"20px"}}>
             <Continent/>
             </Row> 
            <Row style={{marginTop:"20px"}}> 
              <Col><Histogram/></Col>
              <Col><LineGraph/></Col>
             </Row> 
          {/* </div> */}
          {/* <div id="country-data"> */}
          <Row  >
          <Col style={{marginTop:"20px"}}> <CountryData /> </Col>
          </Row>
          <Row>
          <Col style={{marginTop:"20px",marginBottom:"20px"}}><PieChart/></Col> 
          </Row>
           
          {/* </div> */}
          
        {/* </div> */}
        
        {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly", marginTop:"20px",alignContent:"baseline",marginLeft:"-13%"}}> */}
        
        {/* <div id="century_analysis">
             
          </div>
          
          <div id="pie-chart-1">
            
          </div>
          </div> */}
          </Container>
      </Provider>    
        
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));

