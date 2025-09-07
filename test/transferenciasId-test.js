import http from 'k6/http';
import { sleep, check } from 'k6';

import { pegarBaseUrl } from '../utils/variaveis.js';
import { obterToken } from '../helpers/autenticacao.js';


export const options = {

    iterations: 1,

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200'],

    },

};

export default function () {

    const token = obterToken();

    const url = `${pegarBaseUrl()}/transferencias/3`;

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        
        },
    };

    const response = http.get(url, params);
console.log(response.body);
    check(response, {
        'Validar status code 200': (r) => r.status === 200,
        'validar que retorna um ID específico': (r) => r.body.includes('"id":3') === true,
        'Validar que retorna os dados da transferência': (r) => r.body.includes('conta_origem_id') === true && r.body.includes('conta_destino_id') === true && r.body.includes('valor') === true

    });

    sleep(1);
}