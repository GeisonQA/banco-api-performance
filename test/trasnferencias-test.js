import http from 'k6/http';
import { sleep, check } from 'k6';

import { pegarBaseUrl } from '../utils/variaveis.js';
import { obterToken } from '../helpers/autenticacao.js';
const transferencias = JSON.parse(open('../fixtures/transferencias.json'));

export const options = {

    stages: [{
        duration: '30s', target: 20,
        duration: '1m', target: 20,
        duration: '30s', target: 0
    }],

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200'],

    },

};

export default function () {

    const token = obterToken();

    const url = `${pegarBaseUrl()}/transferencias`;
    const payload = JSON.stringify(transferencias);

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Validar status code 201': (r) => r.status === 201,
        'Validar que retorna mensagem de sucesso': (r) => r.body.includes('Transferência realizada com sucesso.'),

    });

    sleep(1);
}