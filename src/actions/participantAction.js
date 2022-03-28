import axios from "axios";

export const getPartAction = (userId, competitionId) => {
    return async (dispatch) => {
        debugger
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }

        fetch(`http://localhost:3000/participant/${userId}/${competitionId}`, options)
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
                type: "GET_PARTICIPANT",
                payload: data.participant
            })

        });
    }
    
}

export const updateAction = (userId, competitionId, typeProps, score) => {
        const body = {
            userId, competitionId, typeProps, score
        }   
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost:3000/participant/update', options)
        .then((res) =>{
            if (res.status === 401) {
                throw new Error("authentication failed")
              }
            if (res.status === 409) {
               alert("אחד או יותר מהפרטים אינו תואם את הדרישות")
              }
            return res.json();
        }).then((data)=> {

            alert(" השתתפותך בתחרות נקלטה בהצלחה ")
            window.location.replace(`/participant/${data.id}`)
        });
    
}

export const getPartByCompAction = ( competitionId) => {
    return async (dispatch) => {

        axios.get(`http://localhost:3000/participant/getcompetitions/${competitionId}`)
        .then((res) =>{
            debugger
            if (res.status === 401) {
                throw new Error("authentication failed")
              }
            if (res.status === 409) {
               alert("אחד או יותר מהפרטים אינו תואם את הדרישות")
               return
              }

            dispatch({
                type: "GET_COMP_PROPS",
                payload: res.data
            })
        })
    }
}   

