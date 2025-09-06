// Importa o módulo HTTP do k6 para realizar requisições HTTP
import http from 'k6/http';

// Importa funções do k6: sleep para pausas e check para verificações/asserts
import { sleep, check } from 'k6';

// Importa os dados do arquivo JSON que serão enviados na requisição de transferências
const postTransferencias = JSON.parse(open('../fixtures/postTransferencias.json'));

// Importa a função obterToken do arquivo de autenticação
import { obterToken } from '../helpers/autenticacao.js';

// Configurações do teste
export const options = {
   
    // Cenário de ramp-up/ramp-down (aqui está comentado)
     stages: [
         { duration: '10s', target: 10 }, // sobe para 10 VUs em 10 segundos
         { duration: '20s', target: 10 }, // mantém 10 VUs por 20 segundos
         { duration: '10s', target: 30 }, // sobe para 30 VUs em 10 segundos
         { duration: '20s', target: 30 }, // mantém 30 VUs por 20 segundos
         { duration: '20s', target: 0 },  // desce para 0 VUs em 20 segundos
     ],
 

    // Limites e métricas que serão avaliadas durante o teste
    thresholds: {
        'http_req_failed': ['rate<0.01'], // menos de 1% das requisições podem falhar
        'http_req_duration': ['p(95)<200'], // 95% das requisições devem ser menores que 200ms
    },
};

// Função principal que será executada em cada VU
export default function () {

    // Chama a função obterToken para receber o token JWT
    const token = obterToken();

    // URL da API de transferências
    const url = 'http://localhost:3000/transferencias';

    // Converte o objeto postTransferencias em JSON para enviar no corpo da requisição
    const payload = JSON.stringify(postTransferencias);

    // Define os headers da requisição, incluindo o Content-Type e o token de autorização
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    // Realiza a requisição POST enviando o payload e os headers
    const res = http.post(url, payload, params);
    
    // Verifica se a requisição retornou status 201 (criação bem-sucedida, mensagem de sucesso)
    check(res, {
        'Validar status 201': (r) => r.status === 201,
        'Validar que recebe uma menmsagem de sucesso': (r)=> r.body.includes("Transferência realizada com sucesso.")
    });

    // Pausa de 1 segundo entre iterações
    sleep(1);
}
