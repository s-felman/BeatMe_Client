import axios from "axios";

export const getAllCompAction = () => {
    debugger
    return async (dispatch) => {
       await fetch(`http://localhost:3000/competitions/`).then((response) => {
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
    return async (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
           
        }
         fetch(`http://localhost:3000/competitions/getcompetition/${compId}`, options )
        .then((response) => {
            return response.json();
        }).then((data) => {
            return dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: data.competition
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
export const getCompByUserAction = (compList) => {
    const body={
        compList
    }
    return async (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
           
        }
       await fetch(`http://localhost:3000/competitions/getByParticipant`, options )
        .then((response) => {
            return response.json();
        }).then((data) => {
            debugger
            return dispatch({
                type: "SET_COMPETITIONS",
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
        //    return res.json()
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

             dispatch({
                type: "SET_COMPETITION_ACTIVE",
                payload: res.data.com
            })
            localStorage.setItem("compName", " ")
            localStorage.setItem("usersList","")
            localStorage.setItem("type","")
     ;})
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

        axios.patch(`http://localhost:3000/competitions/${compId}`,formData, options)
        .then((res) =>{
            console.log("res", res)
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
            alert("פרטי התחרות עודכנו בהצלחה")
            if(res.data.comp.compType==='/votes'){
                window.location.replace(`/manager/${res.data.comp.adminId}`)   
            }
        });
    }
}

export const updateVotesCompAction = (formData, compId) => {
 
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
        debugger
        axios.patch(`http://localhost:3000/competitions/votes/${compId}`,formData, options)
        .then((res) =>{
            console.log("res", res)
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
            alert("פרטי התחרות עודכנו בהצלחה")
                window.location.replace(`/manager/${res.data.comp.adminId}`)   
        });
    }
}

export const addScoreAction = (competitionId, itemId, score) => {
        const body = {
            competitionId, itemId, score
        }   
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost:3000/competitions/addscore', options)
        .then((res) =>{
            if (res.status === 401) {
                throw new Error("authentication failed")
              }
            if (res.status === 409) {
               alert("אחד או יותר מהפרטים אינו תואם את הדרישות")
              }
            return res.json();
        })
}

export const addWinner = (compId, winnerId) => {
    const body={
        compId, winnerId
    }
    return async (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
           
        }
       await fetch(`http://localhost:3000/competitions/addwinner`, options )
        .then((response) => {
            return response.json();
        }).then((data) => {
            debugger
            return dispatch({
                type: "SET_COMPETITIONS",
                payload: data
            })
        });
    }
}