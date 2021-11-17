

 const initState = {
    competitions: [],
    competitionActive: []
        // firstName: null,
        // lastName:  null,
        // userName:  null,
        // phone: null,
        // email: null,
        // password: null,
        // getEmail: null
    
}

export const competitionsReducer = (state = initState, action) => {

    switch (action.type) {
        case "SET_COMPETITIONS":
            state = { ...state, competitions: action.payload }
            break;
        case "SET_COMPETITION_ACTIVE":
            state = { ...state, competitionActive: action.payload }
            break;
        default:
            break;
    }

    console.log('Comps Reducers', state);
    return state;
}

export default competitionsReducer;