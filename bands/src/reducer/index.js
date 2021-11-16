
const initialState = {
    bands: [],
    allBands: [],
    albums: [],
    users:[],
}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_BANDS':
            return {
                ...state,
                bands: action.payload,
                allBands: action.payload,
            }
        case 'GET_ALBUMS':
            return {
                ...state,
                albums: action.payload
            }
        case 'FILTER_BY_GENRE':
            const everyBand = state.bands;
            const bandsFiltered = action.payload === 'all' ? everyBand : everyBand.filter((el) => el.genreCode === action.payload)
            return {
                ...state,
                allBands: bandsFiltered
            }
        case 'FILTER_BY_ORIGIN':
            const originBand = state.bands;
            const bandsOriginFiltered = action.payload === 'all' ? originBand : originBand.filter((el) => el.country === action.payload)
            return {
                ...state,
                allBands: bandsOriginFiltered
            }
        case 'GET_USERS':
            return{
                ...state,
                users: action.payload
            }
        case 'CREATE_USER':
            return{
                ...state,
                users : action.payload
            }
        default: return state;
    }
}
export default rootReducer;