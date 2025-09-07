
import http from 'k6/http';
const login = JSON.parse(open('../fixtures/login.json'));
import { pegarBaseUrl } from '../utils/variaveis.js';

export function obterToken() {
    const url = `${pegarBaseUrl()}/login`;
    const payload = JSON.stringify(login);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);
    return response.json('token');
    
}