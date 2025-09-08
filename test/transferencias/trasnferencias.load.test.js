import fluxoTransferencias from '../../flows/transferencias.js';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // sobe para 20 usuários
    { duration: '1m', target: 20 },  // mantém 20 usuários
    { duration: '30s', target: 0 },  // finaliza
  ],

  thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200'],

    },
};

export default fluxoTransferencias;