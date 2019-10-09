const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

let csv=require("csvtojson");
let data=[];
let spec=[];
let asia_spec=[];
let oceania_spec=[];
let europe_spec=[];
let africa_spec=[];
let northamerica_spec=[];

let win_ratio={}; //{pak:[wins,total,ratio]}

function parse(data){
    data.forEach((m)=>{
    if(win_ratio.hasOwnProperty(m.opposition))
    {
          let c=m.opposition;
          win_ratio[c][1]=win_ratio[c][1]+1;
          if(m.match_result==="won")
     {
             win_ratio[c][0]=win_ratio[c][0]+1;
    }
          win_ratio[c][2]=Math.round((win_ratio[c][0]/win_ratio[c][1])*10000)/100;
          
    }    
    else
    {
        let c=m.opposition;
        win_ratio[c]=[]
        if(m.match_result==="won")
             win_ratio[c][0]=1;
        else
        win_ratio[c].push(0)
        win_ratio[c].push(1);
        win_ratio[c].push(Math.round((win_ratio[c][0]/win_ratio[c][1])*10000)/100);     
    }   
})
return win_ratio;
}

csv()
    .fromFile('./sachin.csv')
    .then((d)=>{
              d.forEach((m)=> {
              let t=m.opposition;
              t=t.split('');
              t.splice(0,2);
              t=t.join('');
              m.opposition=t;
              })
             data=d;
            win_ratio= parse(data)
        }) 

csv()
    .fromFile('./asia.csv')
    .then((d)=>{
        asia_spec=d
    }
    ) 
csv()
    .fromFile('./oceania.csv')
    .then((d)=>{
        oceania_spec=d
    }
    )
csv()
    .fromFile('./northamerica.csv')
    .then((d)=>{
        northamerica_spec=d
    }
    ) 
csv()
    .fromFile('./europe.csv')
    .then((d)=>{
        europe_spec=d
    }
    )
csv()
    .fromFile('./africa.csv')
    .then((d)=>{
        africa_spec=d
    }
    )           


app.get('/continent-data', (req, res) => {
    let result={}
    result.asia=[]
    result.oceania=[];
    result.africa=[]
    result.northamericawcaribbean=[];
    result.europe=[];

    let list=[asia_spec,europe_spec,northamerica_spec,africa_spec,oceania_spec]
    let names=["asia","europe","northamericawcaribbean","africa","oceania"]
    let x={} ; let continent=""
    for (const country in win_ratio) {
       //console.log(country);
      // console.log(list)
       
        list.every((spec,index) =>{
             x=spec.find((c)=>country===c.Label);
             if(x)
             {
                 continent=names[index]
                 return false
             }
             else return true;
            })
            if(x)
            { let temp={
            id:x.ID,
            name:x.Label,
            value:win_ratio[country][2]
        }    
        result[continent].push(temp)}
}
res.send(result);           
})

app.get('/country-data',(req,res)=>{
    
    let runs={} ;
    data.forEach((m)=>{
       let c;   let batting_score=0;
        if(m.batting_score!=="DNB"&& m.batting_score!=="TDNB" && m.batting_score){
            if(m.batting_score.indexOf('*')===-1)    
                 batting_score=Number.parseInt(m.batting_score)
            else
                {
                  let x=m.batting_score.split('');
                  x.splice(x.indexOf('*'),1);
                  batting_score=Number.parseInt(x.join(''))

                }
          
            let year=m.date.split('').slice(-4).join('')
             
                
            if(runs.hasOwnProperty(m.opposition))
            {
                 c=m.opposition;
                let dataPoint=runs[c].find((x)=>x.year===year)
                if(dataPoint)
                        dataPoint.value=dataPoint.value+batting_score;

                else
                {
              
                    runs[c].push({year:year,value:batting_score})
                }
            }       
            else
            {
                
                 c=m.opposition;
                
                runs[c]=[{year:year,value:batting_score}]
            }
        }          
    })
    res.send(runs)  
})

let range=[0,0]
const call_range=(x)=>range=x;

app.get('/get-range',(req,res)=>(res.send(range)));

app.get('/histogram-data',(req,res)=>{

    let runs=[],r=[0,0];
    data.forEach(d=>{
        if(d.batting_score==="DNB" || d.batting_score==="TDNB")
        runs.push(0);
        else
        {
             if(d.batting_score.indexOf('*')===-1) {   
                 runs.push(Number.parseInt(d.batting_score));
                if(runs[runs.length-1]>=50)r[0]++;
                else
                r[1]++;
                }
            else
                {
                  let x=d.batting_score.split('');
                  x.splice(x.indexOf('*'),1);
                  runs.push(Number.parseInt(x.join('')));
                  if(runs[runs.length-1]>=50)r[0]++;
                  else r[1]++;

                }
        }
    })
    call_range(r);
    res.send(runs);
    console.log(runs)
})

app.get("/get-stats",(req,res)=>{
    const total=[0,0,0,0,0,0]; //half,full,double,matches,wickets,runs
    data.forEach((d)=>{
        let runs;
        if(d.batting_score!=="DNB" || d.batting_score!=="TDNB")
        {
            if(d.batting_score.indexOf('*')===-1)         
                 runs=Number.parseInt(d.batting_score)
            else
                 {
                   let x=d.batting_score.split('');
                   x.splice(x.indexOf('*'),1);
                   runs=parseInt(x.join(''));
                 }     

        if(runs>=50 && runs < 100)
        {  
               total[0]++;  
               
        }
        else if(runs >= 100 && runs < 200)
        {
            total[1]++;
        }

        else if( runs>=200)
        {
            total[2]++;
        }
        total[3]++;
        console.log(total[5])
        if(runs)
        total[5]+=runs
    }
    if(d.wickets!=="-")
    total[4]+=(parseInt(d.wickets))
    
})
    res.send(total)
})

app.get('/century-analysis',(req,res)=>{
   
    let cent={},half={},double={};
    const total=[0,0,0];
    data.forEach(d=>{
        let year=d.date.split('').slice(-4).join('')
        half[year]=0;
        cent[year]=0;
        double[year]=0;
    })
    data.forEach((d)=>{
        let year=d.date.split('').slice(-4).join('')
        let runs;
        console.log(d.batting_score)
        if(d.batting_score!=="DNB" || d.batting_score!=="TDNB")
        {
            if(d.batting_score.indexOf('*')===-1)         
                 runs=Number.parseInt(d.batting_score)
            else
                 {
                   let x=d.batting_score.split('');
                   x.splice(x.indexOf('*'),1);
                   runs=parseInt(x.join(''));
                 }     

        if(runs>=50 && runs < 100)
        {  
               half[year]=half[year]+1;
               total[0]++;  
               
        }
        else if(runs >= 100 && runs < 200)
        {
            cent[year]=cent[year]+1
            total[1]++;
        }

        else if( runs>=200)
        {
            double[year]=double[year]+1
            total[2]++;
        }
    }
    })

    
    let result=[]

        for(year in half){
            let t={}
            t.year=year;
            t['Number of half-centuries']=half[year];
            t['Number of centuries']= cent[year];
            t['Number of double-centuries']=double[year]
            result.push(t);
        }
    res.send(result)
     
})

app.get('/pie-chart-1',(req,res)=>{

    let result=[0,0,0] //won lost tied
    data.forEach((d)=>{
        if(d.match_result==="won")
            result[0]=result[0]+1;
        if(d.match_result==="lost")
            result[1]=result[1]+1;
        if(d.match_result==="tied")
            result[2]=result[2]+1        


    })
    let response=[]
    response.push({name:"Matches Won",value:result[0],fill:"#D4EDDA"})
    response.push({name:"Matches Lost",value:result[1],fill:"#F8D7DA"})
    response.push({name:"Matches Tied",value:result[2],fill:"#ffeeba"})
    res.send(response)
})

app.get('/pie-chart-2',(req,res)=>{

    let result=[0,0] //won lost tied
    data.forEach((d)=>{
        if(d.batting_score!=="DNB" || d.batting_score!=="TDNB"){
            if(d.batting_score.indexOf('*')!==-1)
            {
                result[0]=result[0]+1;
                console.log(d.batting_score)
            }
            else
                result[1]=result[1]+1      
        }    

    })
    res.send(result)
})

app.get('/country-wise-stats',(req,res)=>{

    let result=[] 
    for(country in win_ratio)
    {
        let temp={}
        temp.country=country;
        temp.won=0
        temp.lost=0
        temp.tied=0
        result.push(temp)
    }
    data.forEach((d)=>{
        let obj=result.find((r)=>(r.country===d.opposition))

        if(d.match_result==="won")
            obj.won=obj.won+1;
        if(d.match_result==="lost")
            obj.lost=obj.lost+1;
        if(d.match_result==="tied")
            obj.tied=obj.tied+1;        

    })
    res.send(result)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})