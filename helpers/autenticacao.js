import http from 'k6/http';
const login = JSON.parse(open('../fixtures/login.json'));


export function obterToken() {
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify(login);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

  const res = http.post(url, payload, params);

  return res.json('token')
}