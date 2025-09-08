# Banco API Performance Testing

Este projeto realiza testes de performance em uma API bancária usando k6, uma ferramenta moderna de testes de carga.

## Estrutura do Projeto

```
.
├── fixtures/           # Dados de teste em formato JSON
├── flows/              # Fluxos de testes representando cenários de usuário
├── helpers/            # Funções auxiliares para os testes
├── test/               # Configurações de diferentes tipos de testes
│   ├── contas/         # Testes relacionados a contas bancárias
│   ├── login/          # Testes relacionados ao login
│   └── transferencias/ # Testes relacionados a transferências
└── utils/              # Funções utilitárias
```

## Pré-requisitos

- [k6](https://k6.io/docs/getting-started/installation/)
- Acesso à API bancária (por padrão, o projeto usa `http://localhost:3000`)

## Configuração

1. Clone este repositório
2. Instale o k6 seguindo as instruções no site oficial
3. Certifique-se de que a API bancária está em execução
4. Atualize os dados de teste nos arquivos JSON em `fixtures/` conforme necessário

## Estrutura dos Testes

O projeto possui três tipos principais de testes:

1. **Load Test** (`*.load.test.js`) - Testa a estabilidade do sistema sob uma carga constante
2. **Stress Test** (`*.stress.test.js`) - Testa os limites do sistema aumentando gradualmente a carga
3. **Spike Test** (`*.spike.test.js`) - Testa a resposta do sistema a picos súbitos de tráfego

### Cenários de Teste

- **Login**: Testa o endpoint de autenticação
- **Contas**: Testa a criação de contas bancárias
- **Transferências**: Testa a funcionalidade de transferência entre contas

## Executando os Testes

Para executar qualquer teste, use o comando:

```bash
k6 run test/[pasta]/[nome-do-arquivo].js
```

### Exemplos

```bash
# Load test para transferências
k6 run test/transferencias/transferencias.load.test.js

# Stress test para contas
k6 run test/contas/contas.stress.test.js

# Spike test para login
k6 run test/login/login.spike.test.js
```

### Configurando a URL base

Por padrão, os testes usam `http://localhost:3000` como URL base. Para alterar, defina a variável de ambiente `BASE_URL`:

```bash
# Windows
set BASE_URL=http://meu-servidor.com && k6 run test/transferencias/transferencias.load.test.js

# Linux/Mac
BASE_URL=http://meu-servidor.com k6 run test/transferencias/transferencias.load.test.js
```

## Estrutura de um Teste

Cada arquivo de teste segue esta estrutura:

1. Importa um fluxo específico do diretório `flows/`
2. Define opções de teste, incluindo:
   - `stages`: Define como a carga de usuários virtuais muda ao longo do tempo
   - `thresholds`: Define critérios de sucesso para métricas
3. Exporta o fluxo como função padrão

## Métricas

Os testes coletam várias métricas, incluindo:
- Tempo de resposta das requisições
- Taxa de requisições com falha
- Tempo total de execução
- Uso de memória

### Thresholds

Os testes verificam se:
- Menos de 1% das requisições falham (`http_req_failed: ['rate<0.01']`)
- 95% das requisições respondem em menos de 200ms (`http_req_duration: ['p(95)<200']`)

## Personalização

### Alterando dados de teste

Modifique os arquivos JSON no diretório `fixtures/` para alterar os dados usados nos testes:
- `login.json`: Credenciais para autenticação
- `contas.json`: Dados para criação de contas
- `transferencias.json`: Dados para transferências

### Modificando thresholds

Altere os valores em `thresholds` nos arquivos de teste para definir critérios diferentes de sucesso.

### Alterando padrões de carga

Modifique o array `stages` nos arquivos de teste para definir diferentes padrões de carga de usuários virtuais.

## Gerando Relatórios

Para gerar um relatório HTML dos testes:

```bash
k6 run --out html=report.html test/transferencias/transferencias.load.test.js
```

O relatório será salvo como `report.html` na raiz do projeto.