import axios from 'axios';

const signup = async (user) => {
    let options = {
        method: 'POST',
        body : JSON.stringify(user)
    }
    
    const response = await axios.post("https://localhost:5000/signup", options);

    // Set localStorage value to localStorage along with token
    localStorage.setItem('user', JSON.stringify(response.data));

    return response.data;
}

const logout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage;
}


const authService = {
    signup,
    logout
}

export default authService;