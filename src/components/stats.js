import Card from 'react-bootstrap/Card'
import axios from 'axios';
import React , {useState,useEffect} from 'react';



    const Stats=()=>{


        const [total, setTotal]=useState([])
    useEffect(()=>{
        axios
        .get("http://localhost:3001/get-stats")
        .then((response)=>{
            setTotal(response.data)
        })   
    },[])

    return(
        <div style={{display:"flex",margin:"0 auto"}}>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#D4EDDA","boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} border="success" body>
               <center><strong>{total[3]}</strong></center>
                Matches
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#FFEEBA","boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} border="warning" body>
            <center><strong>{total[0]}</strong></center>
                Half-Centuries
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#E2E3E5","boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} border="secondary" body>
            <center><strong> {total[1]}</strong></center>
                Centuries
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#CCE5FF","boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} border="info" body>
            <center><strong>{total[2]}</strong></center>
                Double Century
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#F8D7DA","boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} border="danger" body>
            <center><strong> {total[5]}</strong></center>
                Runs
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#D6D8D9","boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)"}} border="dark" body>
            <center><strong> {total[4]}</strong></center>
                Wickets
            </Card>
            
            </div>
        )

    }
    export default Stats;

