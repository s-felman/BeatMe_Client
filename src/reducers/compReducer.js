

 const initState = {
    competitions: [],
    competitionActive:{
        compName: null,
        adminId: null,
        compType: null,
        usersList: null,
        details: null,
        target: null,
        targetDate: null,
        typeProps: null
    }
    
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