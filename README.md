# Banco API Performance Tests

Performance tests for the Banco API using k6.

## Introdução

Este projeto contém testes de performance para a API do Banco, implementados com k6. Os testes cobrem as principais funcionalidades da API, incluindo login, criação, listagem, consulta específica e atualização de transferências. O projeto foi estruturado para ser facilmente configurável através de variáveis de ambiente, especialmente a `BASE_URL` que define o endpoint da API a ser testada.

## Tecnologias Utilizadas

- [k6](https://k6.io/) - Ferramenta de teste de carga e performance
- JavaScript - Linguagem de programação utilizada para escrever os testes
- JSON - Formato de dados para fixtures e configurações

## Estrutura do Repositório

```
banco-api-performance/
├── fixtures/
│   ├── login.json
│   └── transferencias.json
├── helpers/
│   └── autenticacao.js
├── test/
│   ├── listarTransferencias-test.js
│   ├── login-test.js
│   ├── transferenciasId-test.js
│   ├── trasnferencias-test.js
│   └── updateTransferenciasId-test.js
├── utils/
│   └── variaveis.js
├── .gitignore
└── README.md
```

## Objetivo de Cada Grupo de Arquivos

### fixtures/
Contém arquivos JSON com dados de teste utilizados nos testes de performance:
- `login.json`: Credenciais para autenticação no sistema
- `transferencias.json`: Dados para criação/atualização de transferências

### helpers/
Funções auxiliares compartilhadas entre os testes:
- `autenticacao.js`: Função para obter token de autenticação

### test/
Scripts de teste de performance para cada endpoint da API:
- `login-test.js`: Testes para o endpoint de autenticação
- `trasnferencias-test.js`: Testes para criação de transferências
- `listarTransferencias-test.js`: Testes para listagem de transferências
- `transferenciasId-test.js`: Testes para consulta de transferência específica
- `updateTransferenciasId-test.js`: Testes para atualização de transferências

### utils/
Funções utilitárias compartilhadas:
- `variaveis.js`: Funções para obtenção de variáveis de ambiente como a BASE_URL

## Instalação

1. Certifique-se de ter o k6 instalado em sua máquina. Se não tiver, instale seguindo as instruções em [https://k6.io/docs/get-started/installation/](https://k6.io/docs/get-started/installation/)

2. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd banco-api-performance
   ```

3. Não é necessário instalar dependências adicionais, pois o k6 executa os scripts JavaScript diretamente.

## Execução dos Testes

### Execução básica

Para executar um teste específico, utilize o comando:

```bash
k6 run test/<nome-do-teste>.js
```

Por exemplo:
```bash
k6 run test/login-test.js
```

### Execução com variável de ambiente

Para definir a URL base da API, utilize a variável de ambiente `BASE_URL`:

```bash
BASE_URL=https://api.exemplo.com k6 run test/login-test.js
```

No Windows (Command Prompt):
```cmd
set BASE_URL=https://api.exemplo.com&& k6 run test/login-test.js
```

No Windows (PowerShell):
```powershell
$env:BASE_URL="https://api.exemplo.com"; k6 run test/login-test.js
```

### Execução com dashboard em tempo real

Para executar os testes com o dashboard web em tempo real e exportar o relatório:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=report.html k6 run test/login-test.js
```

No Windows (PowerShell):
```powershell
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="report.html"; k6 run test/login-test.js
```

O relatório será gerado no arquivo `report.html` ao final da execução.

### Execução de todos os testes

Para executar todos os testes sequencialmente:

```bash
k6 run test/login-test.js && \
k6 run test/trasnferencias-test.js && \
k6 run test/listarTransferencias-test.js && \
k6 run test/transferenciasId-test.js && \
k6 run test/updateTransferenciasId-test.js
```