import { createStore } from "redux";

const counterReducer = (state = {Matchid : 0},action) => {
    if(action.type === 'Commentry')
    {
        state.Matchid = action.Matchid
    }

    return state
}
const store = createStore(counterReducer);



export default store;

