import http from 'k6/http';
import { sleep, check } from 'k6';
import { pegarBaseUrl } from '../../utils/variaveis.js';
import { obterToken } from '../../helpers/autenticacao.js';
const transferencias = JSON.parse(open('../fixtures/transferencias.json'));


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