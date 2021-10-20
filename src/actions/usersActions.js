export const loginAction = (userName, password) => {
    return async (dispatch) => {
        const body = {
            userName,
            password
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost:3000/users/login', options)
        .then((res) =>{
            if (res.status === 401) { 
                dispatch({
               type: "LOGIN_ERROR",
               payload:res.json()
           })  
        }}).then((data)=> {
            const isLogged = (typeof data.user !== 'undefined' && data.user !== '');
             dispatch({
                type: "LOGIN",
                payload: isLogged
            })
            dispatch({
                type: "SET_USER_ACTIVE",
                payload: data.user
            })
        });
    }
}


export const signupAction = (firstName, lastName, userName, phone, email, password, getEmail) => {
 
    return async (dispatch) => {
        const body = {
            firstName, lastName, userName, phone, email, password, getEmail
        }   
        console.log("aaa",body)
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost:3000/users/signup', options)
        .then((res) =>{
            if (res.status === 401) {
                throw new Error("authentication failed")
              }
            if (res.status === 409) {
               alert("אחד או יותר מהפרטים אינו תואם את הדרישות")
              }
            return res.json();
        }).then((data)=> {
            
            const isLogged = (typeof data.token !== 'undefined' && data.token !== '');

             dispatch({
                type: "LOGIN",
                payload: isLogged
            })
            dispatch({
                type: "SET_USER_ACTIVE",
                payload: data.user
            })
            alert("משתמש נרשם בהצלחה")
        });
    }
}

export const logoutAction = () => {
    localStorage.setItem('user','undefined')
    localStorage.setItem('isLogged', 'false')
    return {
        type: "LOGIN",
        payload: false
    }
}

export const getUsersAction = () => {
    return async (dispatch) => {
        fetch(`http://localhost:3000/users/`).then((response)=> {
            return response.json();
        }).then((data)=> {
            return dispatch({
                type: "SET_USERS",
                payload: data
            })
        });
    }
}

export const getUserAction = (userID) => {

    return async (dispatch) => {
        fetch(`http://localhost:3000/users/${userID}`).then((response)=> {
            return response.json();
        }).then((data)=> {
            return dispatch({    
                type: "SET_USER_ACTIVE",
                payload: data
            })
        });
    }
}
