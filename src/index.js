import React , {useState,useEffect} from 'react';
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
import sachin from './sachin.jpg'; 
import Button from 'react-bootstrap/Button'
import Card from  'react-bootstrap/Card'

const Home=({show})=>{

  return(
    <Card style={{ width: '40rem' ,"boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)",margin:"0 auto",verticalAlign:"middle",marginTop:"0.5%"}}>
        <Card.Img variant="top" src={sachin} fluid rounded height={600} />
        <Card.Body style={{fontSize:"20px"}}>
           <Card.Title style={{fontSize:"35px"}}>Sachin Tendulkar</Card.Title> 
          <Card.Text>
         "He is widely regarded as one of the greatest batsmen in the history of cricket."<br/>
          -Wikipedia<br/>
          Let's find out if this is indeed the case.
          </Card.Text>
          <Button variant="primary" onClick={show}>View Career Statistics</Button>
        </Card.Body>
</Card>
  )}
  



const App=()=>{

  const [click,setClick]=useState(false)
  const show=()=>{setClick(true)}
  if(!click)
  return(<Home show={show}/>)
  else
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
            <Row >
              <Col style={{marginTop:"20px"}}> <CountryData /> </Col>
            </Row>
            <Row>
              <Col style={{marginTop:"20px",marginBottom:"20px"}}><PieChart/></Col> 
            </Row>
          </Container>
      </Provider>    
        
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));

