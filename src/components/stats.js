import Card from 'react-bootstrap/Card'
import axios from 'axios';
import React , {useState,useEffect} from 'react';
import CardGroup from 'react-bootstrap/CardGroup'


    const Stats=()=>{


        const [total, setTotal]=useState([])
    useEffect(()=>{
        axios
        .get("http://localhost:3001/get-stats")
        .then((response)=>{
            setTotal(response.data)
        console.log("total is",total)})
    },[])

    return(
        <div style={{display:"flex"}}>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#D4EDDA"}} border="success" body>
               <center><strong>{total[3]}</strong></center>
                Matches
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#FFEEBA"}} border="warning" body>
            <center><strong>{total[0]}</strong></center>
                Half-Centuries
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#E2E3E5"}} border="secondary" body>
            <center><strong> {total[1]}</strong></center>
                Centuries
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#CCE5FF"}} border="info" body>
            <center><strong>{total[2]}</strong></center>
                Double Century
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#F8D7DA"}} border="danger" body>
            <center><strong> {total[5]}</strong></center>
                Runs
            </Card>
            <Card style={{margin:"20px",padding:"10px",backgroundColor:"#D6D8D9"}} border="dark" body>
            <center><strong> {total[4]}</strong></center>
                Wickets
            </Card>
            
            </div>
        )

    }
    export default Stats;

