import { GET_HIST_DATA, GET_PIE_DATA ,GET_CONTINENT_DATA,GET_COUNTRY_DATA,GET_COUNTRY_STATS,GET_LINE_DATA} from './types';
import axios from 'axios';



export const getHistogramData=()=>(dispatch)=>{
        axios
            .get("http://localhost:3001/histogram-data")
            .then((response)=>{            
               dispatch({
                    type:GET_HIST_DATA,
                    data:response.data
                })  
            })
}
export const getPieData=()=>(dispatch)=>{
        axios
            .get("http://localhost:3001/pie-chart-1")
            .then((response)=>{
             dispatch({
                 type:GET_PIE_DATA,
                 data:response.data
             })
            })
}
export const getContinentData=()=>(dispatch)=>{
    axios
        .get("http://localhost:3001/continent-data")
        .then((response)=>{
            dispatch({
                type:GET_CONTINENT_DATA,
                data:response.data
            })
        })
}

export const getCountryData=()=>(dispatch)=>{
    axios
        .get("http://localhost:3001/country-data")
        .then((response)=>{
            dispatch({
                type:GET_COUNTRY_DATA,
                data:response.data
            })
        })
}
export const getCountryStats=()=>(dispatch)=>{
    axios
        .get("http://localhost:3001/country-wise-stats")
        .then((response)=>{
           dispatch(
                {
                    type:GET_COUNTRY_STATS,
                    data:response.data

                }
            )
        })
}

export const getLineData=()=>(dispatch)=>{
    //console.log("action launched")
    axios
        .get("http://localhost:3001/century-analysis")
        .then((response)=>{
            dispatch(
               {
                    type:GET_LINE_DATA,
                    data:response.data

                })
        })
}
   

     
    