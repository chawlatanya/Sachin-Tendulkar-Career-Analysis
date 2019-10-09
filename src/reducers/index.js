import { combineReducers } from 'redux';
import dataReducer from './dataReducer';


export default combineReducers({
    data:dataReducer //dataReducer return the new state which is store in data and individual properties of state can be accessed using data.property
});