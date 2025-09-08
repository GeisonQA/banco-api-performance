import fluxoLogin from '../../flows/login.js';

export let options = {
  stages: [
    { duration: '10s', target: 200 }, // pico rápido
    { duration: '30s', target: 200 }, // mantém
    { duration: '10s', target: 0 },   // encerra
  ],

  thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200'],

    },
};

export default fluxoLogin;