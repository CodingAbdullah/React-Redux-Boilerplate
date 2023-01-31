import axios from 'axios';

const login = async (user) => {
    let options = {
        method: 'POST',
        body : JSON.stringify(user)
    }
    
    const response = await axios.post("http://localhost:5000/login", options);

    // Set localStorage value to localStorage along with token
    localStorage.setItem('user', JSON.stringify(response.data));

    return response.data;
}

const logout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage;
}

const authService = {
    login,
    logout
}

export default authService;