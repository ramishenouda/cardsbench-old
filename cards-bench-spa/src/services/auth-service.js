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
            setLocalStorage(response.data);
          }).catch((err) => {
              console.log('error');
          })
}

function setLocalStorage(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
}

function DecodedJWTToken() {
    console.log('decoded is here');
}

function Logout() {
    localStorage.clear();
}

function Register(registerInfo) {
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
            setLocalStorage(response.data);
            console.log(response);
          }).catch((err) => {
            console.log(err.response);
            console.log(err);
        });
}

export { DecodedJWTToken, Login, Logout, Register };