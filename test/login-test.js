// Importa o módulo HTTP do k6 para realizar requisições HTTP
import http from 'k6/http';

// Importa funções do k6: sleep para pausas entre iterações e check para verificar respostas
import { sleep, check } from 'k6';

// Importa os dados de login do arquivo JSON (usuário e senha)
const login = JSON.parse(open('../fixtures/login.json'));

// Configurações do teste de carga
export const options = {

  // Definição de estágios do teste (ramp-up/ramp-down de usuários virtuais)
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

// Função principal que será executada por cada VU
export default function () {
  
  // URL da API de login
  const url = 'http://localhost:3000/login';

  // Converte o objeto login em JSON para enviar no corpo da requisição
  const payload = JSON.stringify(login);

  // Configura os headers da requisição
  const params = {
    headers: {
      'Content-Type': 'application/json', // indica que o corpo da requisição é JSON
    },
  };

  // Realiza a requisição POST enviando o payload e os headers
  const res = http.post(url, payload, params);

  // Verifica se a requisição foi bem-sucedida
  check(res, {
    'Validar status 200': (r) => r.status === 200,         // checa se retornou status 200 OK
    'Validar que retorna um token tipo string': (r) => r.json('token') === 'string', // checa se o campo 'token' existe e é uma string
  });

  // Pausa de 1 segundo entre iterações para simular tempo real de uso
  sleep(1);
}
