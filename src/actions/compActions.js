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


export const createComp = (userID, comp) => {
 
    return async (dispatch) => {
        const body = {
          userID, comp
        }   
        console.log("aaa",body)
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch('http://localhost:3000/competitions/', options)
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
            alert("תחרות נוספה בהצלחה")
        });
    }
}
