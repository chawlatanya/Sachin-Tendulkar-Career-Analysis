import { GET_HIST_DATA, GET_PIE_DATA, GET_COUNTRY_DATA,GET_CONTINENT_DATA, GET_LINE_DATA,GET_COUNTRY_STATS} from '../actions/types';

const initialState={
    histogramData:[],
    pieData:[],
    countries:{},
    continents:{},
    centuryData:[],
    countryData:[]
}


 const dataReducer = (state=initialState,action) => {

    switch (action.type) {
        case GET_HIST_DATA:
            return(
                { 
                    ...state,
                    histogramData: action.data
                })
        case GET_PIE_DATA:
           
            return(
                {
                    ...state,
                    pieData:action.data

                }
            )
        case GET_COUNTRY_DATA:
            return({
                ...state,
                countries:action.data
            })
        case GET_CONTINENT_DATA:
            return({
                ...state,
                continents:action.data
            })  
        case GET_LINE_DATA:
            return({
                ...state,
                centuryData:action.data
            })
        case GET_COUNTRY_STATS:
                return({
                    ...state,
                    countryData:action.data
                })     
        default:
            return state;    
    }
}

export default dataReducer;