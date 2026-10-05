# API REST Fatec

API REST em Node.js para gerenciamento de clientes, desenvolvida com Express e MySQL.

## 🚀 Tecnologias

- Node.js
- Express
- MySQL2
- express-validator
- dotenv

## 📦 Funcionalidades

- Listagem de clientes
- Busca por ID
- Cadastro de novo cliente
- Validação de dados de entrada
- Conexão com banco MySQL

## 🧱 Estrutura do projeto

```bash
rest/
├── public/
│   └── index.html
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── clientes.controller.js
│   ├── database/
│   │   └── tables.sql
│   ├── middleware/
│   │   └── validarResultado.js
│   ├── repositories/
│   │   └── clientes.repository.js
│   ├── routes/
│   │   └── clientes.routes.js
│   └── validators/
│       └── clientes.validator.js
├── package.json
├── README.md
└── .env
```

## ⚙️ Requisitos

- Node.js 18+
- MySQL instalado e em execução
- Banco de dados configurado localmente

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd rest
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=db_rest
```

4. Crie o banco e a tabela de clientes usando o script em `src/database/tables.sql`.

## ▶️ Execução

Para iniciar a API em modo de produção:

```bash
npm start
```

Para iniciar em modo de desenvolvimento com reinicialização automática:

```bash
npm run dev
```

A aplicação será iniciada na porta `3001` por padrão.

## 🛣️ Endpoints

### GET /api

Retorna informações básicas da API.

```json
{
  "mensagem": "API REST Fatec",
  "versao": "1.0.0"
}
```

### GET /api/clientes

Lista todos os clientes cadastrados.

### GET /api/clientes/:id

Busca um cliente por ID.

### POST /api/clientes

Cria um novo cliente.

Exemplo de corpo JSON:

```json
{
  "tipo": "PF",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "telefone": "11999999999",
  "cpf": "12345678901",
  "estado_civil": "solteiro",
  "ativo": true,
  "limite_credito": 1500.00
}
```

## 🗃️ Estrutura da tabela de clientes

A tabela `clientes` contém campos como:

- `id`
- `tipo`
- `nome`
- `email`
- `telefone`
- `cpf` ou `cnpj`
- `data_nascimento`
- `razao_social`
- `estado_civil`
- `ativo`
- `limite_credito`
- `observacoes`

A definição completa pode ser consultada em `src/database/tables.sql`.

## 📝 Observações

- Caso o banco MySQL não esteja acessível, a API pode falhar ao iniciar.
- Os dados de entrada são validados antes de persistir no banco.
- A rota principal da API está em `/api/clientes`.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
