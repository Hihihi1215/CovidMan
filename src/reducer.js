export const initialState = {
    organisation : null,
    user : null
};

const reducer = (state, action) => {
    switch(action.type) {
        case "SELECT_ORGANISATION":
            return {
                ...state,
                organisation : action.item
            };
        case "SET_USER" :
            return {
                ...state,
                user : action.user
            }
    }
};

export default reducer;
