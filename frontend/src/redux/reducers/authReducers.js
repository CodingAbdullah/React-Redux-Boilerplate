const initialState = {
    token: "",
    isLoggedIn: false
}

export const loginReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "LOGIN_SUCCESSFUL":
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isLoggedIn: true
            }
        case "LOG_OUT":
            localStorage.removeItem('token');
            return {
                ...state,
                token: '',
                isLoggedIn: false
            }
        case "LOGIN_UNSUCCESSFUL":
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