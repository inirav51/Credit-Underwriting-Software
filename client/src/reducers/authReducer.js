//For any action called related to authentication will be reduced here
import {FETCH_USER, FETCH_FINCIALS, FETCH_FINCIALS_DETAILS} from '../actions/types'

const initialState= {
    financials: [],
    financialDetails: {}
}
export default function(state = initialState, action){
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        case FETCH_FINCIALS:
            return Object.assign({}, state, {financials: action.payload})
        case FETCH_FINCIALS_DETAILS:
            return Object.assign({}, state, {financialDetails: action.payload})
        default:
            return state;
    }
}
