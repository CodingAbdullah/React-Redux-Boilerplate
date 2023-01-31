const axios = require('axios');

exports.posts = (req, res) => {
    // Get fake data to test the protected route
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
        res.status(200).json({
            posts: response.data
        })
    })
    .catch(err => {
        res.status(400).json({
            message: err
        });
    });
}