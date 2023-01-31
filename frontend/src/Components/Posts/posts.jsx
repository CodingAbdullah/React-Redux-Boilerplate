import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducers/authReducer';

const Posts = () => {
    const [posts, updatePosts] = useState({
        information: null
    });

    const userSelector = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // If user is null no token will be available either so redirect or set up request for dummy data
        if (userSelector === null){
            navigate("/");
        }
        else {
            let options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization' : 'Bearer ' + userSelector.token
                }
            }

            axios.post("http://localhost:5000/posts", options)
            .then(response => {
                updatePosts((prevState) => {
                    return {
                        ...prevState,
                        information: response.data
                    }
                })
            })
            .catch(() => {
                dispatch(logout()); // User token expired or does not have one
            });
        }
    }, [userSelector, navigate, dispatch]);

    if (posts.information === null) {
        <div>Loading...</div>
    }
    else {
        return (
            <div className="posts-page">
                <h1>Psst.. this is a secret page!</h1>
                <div>
                    <h4>Posts</h4>
                    {
                        posts.information.posts.map(post => {
                            return (
                                <>
                                    <p>User ID: {post.userId}</p>
                                    <p>ID: {post.id}</p>
                                    <p>Title: {post.title}</p>
                                    <p>Body: {post.body}</p>
                                    <br />
                                </>
                            )
                        })
                    }
                    <button style={{ marginTop: '2rem' }} class="btn btn-primary" onClick={() => navigate("/")}>Home</button>
                </div>
            </div>
        )
    }
}


export default Posts;