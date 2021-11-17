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

export const createComp = (userID) => {
    return async (dispatch) => {
        fetch(`http://localhost:3000/competitions/${userID}`).then((response) => {
            return response.json();
        }).then((data) => {
            return dispatch({
                type: "SET_USER_ACTIVE",
                payload: data.data
            })
        });
    }
}