export const loginAction = (credentials) => {
    const { email, password } = credentials;

    const information = JSON.stringify({ email, password });

        const options = {
            method: 'POST',
            headers : {
                'content-type': 'application/json'
            },
            body: information
        }

        fetch("http://localhost:3001/login", options)
        .then(response => response.json())
        .then(res => {
            if (res.status == 200){
                return {
                    type: "LOG_IN",
                    payload: {
                        token: res.token,
                        user: res.userInfo,
                        msg: "Logged in"
                    }
                }
            }
            else {
                return {
                    type: "LOG_IN_UNSUCCESSFUL",
                    payload: {
                        msg: "Cannot Login"
                    }
                }
            }
        })
        .catch(err => {
            return {
                type: "LOG_IN_UNSUCCESSFUL",
                payload: {
                    msg: "Cannot Login " + err
                }
            }
        });
}
