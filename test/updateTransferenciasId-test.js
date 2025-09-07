import http from 'k6/http';
import { sleep, check } from 'k6';

import { pegarBaseUrl } from '../utils/variaveis.js';
import { obterToken } from '../helpers/autenticacao.js';

const transferencias = JSON.parse(open('../fixtures/transferencias.json'));

export const options = {

    iterations: 1,

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200'],

    },

};

export default function () {

    const token = obterToken();
    transferencias.valor = 150; 

    const url = `${pegarBaseUrl()}/transferencias/3`;
    const payload = JSON.stringify(transferencias);
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

        },
    };

    const response = http.put(url, payload, params);
    
    check(response, {
        'Validar status code 204': (r) => r.status === 204,

    });

    sleep(1);
}