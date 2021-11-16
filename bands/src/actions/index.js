import axios from 'axios'

export function getBands() {
    return async function (dispatch) {
        let result = await axios.get('https://my-json-server.typicode.com/improvein/dev-challenge/bands')
        return dispatch({
            type: 'GET_BANDS',
            payload: result.data
        })
    }
}

export function getAlbums() {
    return async function (dispatch) {
        let result = await axios.get('https://my-json-server.typicode.com/improvein/dev-challenge/albums')
        return dispatch({
            type: 'GET_ALBUMS',
            payload: result.data
        })
    }
}

export function filterByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}
export function filterByOrigin(payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}
export function getUsers(payload) {
    return {
        type: 'GET_USERS',
        payload
    }
}
export function createUser(user) {
    return {
        type: 'CREATE_USER',
        payload: user
    }
}
export function Login(payload) {
    return {
        type: 'LOGIN',
        payload
    }
}
export function logout(payload) {
    return {
        type: 'LOGOUT',
        payload
    }
}