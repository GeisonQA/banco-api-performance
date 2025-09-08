import http from 'k6/http';
import { sleep, check } from 'k6';
import { pegarBaseUrl } from '../../utils/variaveis.js';
import { obterToken } from '../../helpers/autenticacao.js';
const contas = JSON.parse(open('../fixtures/contas.json'));



export default function () {

    const token = obterToken();

    const url = `${pegarBaseUrl()}/contas`;
    const payload = JSON.stringify(contas);

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Validar status code 201': (r) => r.status === 201,
        'Validar que retorna mensagem de sucesso': (r) => r.body.includes('Conta criada com sucesso.') === true,

    });

    sleep(1);
}