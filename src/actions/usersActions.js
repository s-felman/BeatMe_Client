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
            console.log(res)
            if (res.status === 401) { 
                dispatch({
               type: "LOGIN_ERROR",
               payload:res.json()
           })  
        }
        return res.json();
  
    }).then((data)=> {
            console.log("from login",data)
            const isLogged = (typeof data.user !== 'undefined' && data.user !== undefined);
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
    
    const nullUser={
        firstName: null,
        lastName:  null,
        userName:  null,
        phone: null,
        email: null,
        password: null,
        getEmail: null}
    return async(dispatch)=>{
  
    dispatch({
        type: "LOGIN",
        payload: false
    })
    dispatch({
        type: "SET_USER_ACTIVE",
        payload: nullUser
    })
}
}


export const updateAction = (firstName, lastName, userName, phone, email,oldEmail, password, getEmail) => {
 
    return async (dispatch) => {
        const body = {
            firstName, lastName, userName, phone, email,oldEmail, password, getEmail
        }   
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost:3000/users/update', options)
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
                type: "SET_USER_ACTIVE",
                payload: data.user
            })
            alert("פרטים עודכנו בהצלחה")
        });
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
                payload: data.user
            })
        });
    }
}
