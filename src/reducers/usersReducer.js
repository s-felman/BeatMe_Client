 const isLoggedLocalStorage = window.localStorage.getItem('isLogged');

 const initState = {
    isLogged: (isLoggedLocalStorage !== null ? (isLoggedLocalStorage === 'true') : false),
    users: {
        usersList:[]
    },
    userActive: {
        firstName: null,
        lastName:  null,
        userName:  null,
        phone: null,
        email: null,
        password: null,
        getEmail: null,
        image: null,
        competitionsList: null
        
    },
    loginError:null
}

export const usersReducer = (state = initState, action) => {

    switch (action.type) {
        case "LOGIN":
            window.localStorage.setItem('isLogged', action.payload);
            state = { ...state, isLogged: action.payload }
            break;
        case "SET_USERS":
            state = { ...state, users: action.payload }
            break;
        case "SET_USER_ACTIVE": 
             window.localStorage.setItem('user', JSON.stringify(action.payload) );      
            state = { ...state, userActive: action.payload }
            break;
        case "LOGIN_ERROR":
            state= {...state, loginError: action.payload}
            break;
        default:
    }

    console.log('Users Reducers', state);
    return state;
}

export default usersReducer;