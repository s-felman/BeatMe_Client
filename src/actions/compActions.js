export const getAllCompAction = () => {

    return async (dispatch) => {
        fetch(`http://localhost:3000/competitons/`).then((response) => {
            return response.json();
        }).then((data) => {
            return dispatch({
                type: "SET_COMPETITIONS",
                payload: data.competitions
            })
        });
    }
}

export const logoutAction = () => {
    return {
        type: "LOGIN",
        payload: false
    }
}

export const getUsersAction = () => {
    return async (dispatch) => {
        fetch(`http://localhost:3000/users/`).then((response) => {
            return response.json();
        }).then((data) => {
            return dispatch({
                type: "SET_USERS",
                payload: data
            })
        });
    }
}

export const getUserAction = (userID) => {
    return async (dispatch) => {
        fetch(`http://localhost:3000/users/?userId=${userID}`).then((response) => {
            return response.json();
        }).then((data) => {
            return dispatch({
                type: "SET_USER_ACTIVE",
                payload: data.data
            })
        });
    }
}