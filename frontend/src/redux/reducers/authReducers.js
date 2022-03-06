const initialState = {
    user: {},
    isLoggedIn: false
}

export const loginReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "LOG_IN":
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                user: payload.user,
                isLoggedIn: true
            }
        case "LOG_OUT":
            localStorage.removeItem('token');
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }
        case "LOG_IN_UNSUCCESSFUL":
            localStorage.removeItem('token');
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }
        case "LOG_OUT_UNSUCCESSFUL":
            localStorage.removeItem('token');
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }
        default:
            return {
                ...state
            }
    }
}