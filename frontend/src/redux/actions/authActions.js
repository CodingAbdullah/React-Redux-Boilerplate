import { loginService, registerService } from '../service/authService';

export const loginAction = (credentials) => (dispatch) => {
    const { email, password } = credentials;

    return loginService(email, password).then(response => {
        const status = response.status;
        const data = response.data;

        if (status === 201){
            dispatch({
                type: 'LOGIN_SUCCESSFUL',
                payload: {
                    token: data.token
                }
            });

            return Promise.resolve();
        }
        else {
            dispatch({
                type: 'LOGIN_UNSUCCESSFUL'
            });

            return Promise.reject();
        }
    })
    .catch(() => {
        dispatch({
            type: 'LOGIN_UNSUCCESSFUL'
        });

        return Promise.reject();
    })
}

export const registerAction = (credentials) => (dispatch) => {
    const { firstName, lastName, age, email, password, gender } = credentials;

    return registerService(firstName, lastName, age, email, password, gender).then(response => {
        if (response.status === 201){
            return Promise.resolve();
        }
        else {
            return Promise.reject();
        }
    })
    .catch(() => {
        return Promise.reject();
    })
}
