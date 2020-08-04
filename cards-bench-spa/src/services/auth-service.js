import axios from 'axios';

async function Login(loginInfo) {
    const options = {
        url: 'http://localhost:5000/api/auth/login',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': 'http://localhost:5000',
            'Access-Control-Allow-Credentials': 'true'
        },
        data: {
            email: loginInfo.email,
            password: loginInfo.password,
        }
    };

    return axios(options)
        .then((response) => {
            localStorage.clear();
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }).catch((err) => {
              console.log(err);
          })
}

function Logout() {
    localStorage.clear();
}

async function Register(registerInfo) {
    const options = {
        url: 'http://localhost:5000/api/auth/register',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': 'http://localhost:5000',
            'Access-Control-Allow-Credentials': 'true'
        },
        data: {
            email: registerInfo.email,
            password: registerInfo.password,
            gender: registerInfo.gender,
            knownAs: registerInfo.knownAs
        }
    };

    return axios(options)
        .then((response) => {
            localStorage.setItem('registerResponse', 'success')
          }).catch((err) => {
            if (err.response !== undefined) {
                localStorage.setItem('registerResponse', JSON.stringify(err.response.data))
            } else {
                localStorage.setItem('registerResponse', 'Server may be offline, try again later.')
            }
        });
}

export { Login, Logout, Register };