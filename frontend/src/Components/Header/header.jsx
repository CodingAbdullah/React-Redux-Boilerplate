import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Header = () => {

    let headerRender = (
        <div class="col-md-3 text-end">
        <Link to="/login"><button type="button" className="btn btn-outline-success me-2">Login</button></Link>
        <Link to="/signup"><button type="button" className="btn btn-primary">Sign-up</button></Link>
        </div>
    )
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    if (localStorage.getItem('token')){
        headerRender = (
            <div class="col-md-3 text-end">
                <Link onClick={logoutHandler} to="/login"><button type="button" className="btn btn-primary">Logout</button></Link>
            </div>
        )
    }
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <Link to="/"><li><a href="/" className="nav-link px-2 link-secondary">Home</a></li></Link>
            </ul>
           {headerRender}
            </header>
        </div>
    );
}

export default Header;