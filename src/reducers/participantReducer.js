const initState = {
    
    participant: {
        userId: null,
        competitionId: null,
        typeProps:[],
        score:0    
    },
    compProps:{}
}
export const participantReducer = (state = initState, action) => {

    switch (action.type) {
        case "SET_PARTICIPANT":
            state = { ...state, participant: action.payload }
            break;
        case "GET_PARTICIPANT":
            state = { ...state, participant: action.payload }
            break;
        case "GET_COMP_PROPS":
            state = { ...state, compProps: action.payload }
            break;
        default:
    }
    return state;
}

export default participantReducer;