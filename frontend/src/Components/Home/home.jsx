import { Navigate } from 'react-router-dom';
import './home.css';

const Home = () => {

    if (!localStorage.getItem('token')){
        return <Navigate to="/login" />
    }
    else 
        return (
            <div className="home">
                <h1>Welcome Home!</h1>
            </div>
        )
    }

export default Home;