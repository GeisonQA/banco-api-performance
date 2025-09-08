import http from 'k6/http';
import { sleep, check } from 'k6';
import { pegarBaseUrl } from '../utils/variaveis.js';
const login = JSON.parse(open('../fixtures/login.json'));


export default function () {
    const url = `${pegarBaseUrl()}/login`;
    const payload = JSON.stringify(login);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Validar status code 200': (r) => r.status === 200,
        'Validar se retornou o token': (r) => typeof r.json('token') === 'string',
    });

    sleep(1);
}