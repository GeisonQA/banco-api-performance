
import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

export const options = {

    stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '10s', target: 30 },
        { duration: '20s', target: 30 },
        { duration: '20s', target: 0 },
    ],

    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['max<5.50'], // o tempo máximo de resposta deve ser menor que 5.50ms
        http_req_duration: ['p(90)<5.00'] // 90% das requisições devem ser respondidas em menos de 5.00ms
    },
};

export default function () {

    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar que a api retorna status 200': (r) => r.status === 200,
        'Validar que ao fazer login retorna um token': (r) => typeof (r.json('token')) === 'string',
    });

    sleep(1);
}