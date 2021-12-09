import axios from "axios";

export const getAllCompAction = () => {

    return async (dispatch) => {
        fetch(`http://localhost:3000/competitions/`).then((response) => {
            return response.json();
        }).then((data) => {
            return dispatch({
                type: "SET_COMPETITIONS",
                payload: data.competitions
            })
        });
    }
}

export const getCompAction = (compId) => {
    //const manager=JSON.stringify(managerId)
    return async (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
           
        }
        fetch(`http://localhost:3000/competitions/${compId}`, options )
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log("df", data)
            return dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: data
            })
        });
    }
}
export const getCompByManagerAction = (managerId) => {
    //const manager=JSON.stringify(managerId)
    return async (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
           
        }
        fetch(`http://localhost:3000/competitions/getByManager/${managerId}`, options )
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log("df", data)
            return dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: data
            })
        });
    }
}

export const getCompByParticipantAction = (participantId) => {
    //const participant=JSON.stringify(participantId)
    return async (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },  
        }
        fetch(`http://localhost:3000/competitions/getByParticipant/${participantId}`, options )
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log("df", data)
            return dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: data
            })
        });
    }
}

export const createComp = ( formData) => {
 
    return async (dispatch) => {
        const body = {
          formData
        }   
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'form-data'
            },
            body: body
        }

        axios.post('http://localhost:3000/competitions/', formData, options)
        .then((res) =>{
            if (res.status === 401) {
                throw new Error("authentication failed")
              }
            if (res.status === 409) {
               alert("אחד או יותר מהפרטים אינו תואם את הדרישות")
              }
            // return res.json();
        }).then((data)=> {

             dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: data
            })
            localStorage.setItem("compName", " ")
            localStorage.setItem("usersList","")
            localStorage.setItem("type","")
            alert("תחרות נוספה בהצלחה")
            const id=JSON.parse(localStorage.getItem('user'))._id
            window.location.replace(`/manager/${id}`)
        });
    }
}

export const createVComp = ( formData) => {
 
    return async (dispatch) => {
        const body = {
          formData
        }   
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'form-data'
            },
            body: body
        }

        axios.post('http://localhost:3000/competitions/', formData, options)
        .then((res) =>{
            if (res.status === 401) {
                throw new Error("authentication failed")
              }
            if (res.status === 409) {
               alert("אחד או יותר מהפרטים אינו תואם את הדרישות")
              }
             

             dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: res.data.comp
        })
        
        })
    }
}


export const createVotesComp = ( formData) => {
 
    return async (dispatch) => {
        const body = {
          formData
        }   

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'form-data'
            },
            body: body
        }

        axios.post('http://localhost:3000/competitions/createvotes', formData, options)
        .then((res) =>{
            if (res.status === 401) {
                throw new Error("authentication failed")
              }
            if (res.status === 409) {
               alert("אחד או יותר מהפרטים אינו תואם את הדרישות")
              }
            // return res.json();
        }).then((data)=> {
             dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: data
            })
        });
    }
}

export const updateCompAction = (formData, compId) => {
 
    return async (dispatch) => {
        const body = {
            formData
        }   
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": 'form-data'
            },
            body: body
        }

        fetch(`http://localhost:3000/competitions/${compId}`, options)
        .then((res) =>{
            if (res.status === 401) {
                throw new Error("authentication failed")
              }
            if (res.status === 409) {
               alert("אחד או יותר מהפרטים אינו תואם את הדרישות")
              }
            return res.json();
        }).then((data)=> {
            dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: data
            })
            alert("פרטי התחרות עודכנו בהצלחה")
        });
    }
}