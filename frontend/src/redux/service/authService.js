import axios from 'axios';

const address = "http://localhost:3001";

export const loginService = (email, password) => {
    const options = {
        method: 'POST',
        mode: 'cors',
        'content-type': 'application/json'
    };

    return axios.post(address + "/login", { email, password }, options);
}

export const registerService = ( firstName, lastName, age, email, password, gender ) => {

    const options = {
        method: 'POST',
        mode: 'cors',
        'content-type': 'application/json'
    }

    return axios.post(address + '/register', { firstName, lastName, age, email, password, gender }, options);
}