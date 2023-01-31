import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const userSelector = useSelector(state => state.auth.user);

    return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/">Demo</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        {
                            userSelector === null ? 
                                <>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/login">Login</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/signup">Sign Up</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled" href="/signup">Posts</a>
                                    </li>
                                </>
                            :
                                <>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/logout">Logout</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled" href="/signup">Sign Up</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/posts">Posts</a>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </nav>
    );
}

export default Header;