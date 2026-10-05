CREATE TABLE clientes(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo enum('PF', 'PJ') NOT NULL,
    nome varchar(100) NOT NULL,
    email varchar(100) NOT NULL unique,
    telefone varchar(20) NOT NULL,
    cpf char(11) unique,
    cnpj char(14) unique,
    data_nascimento date,
    razao_social varchar(100),
    inscricao_estadual varchar(20),
    estado_civil enum('solteiro', 'casado', 'divorciado', 'viuvo', 'uniao_estavel'),
    ativo boolean NOT NULL DEFAULT true,
    limite_credito decimal(10,2) NOT NULL DEFAULT 0.00,
    observacoes varchar(500),
    criado_em timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT ck_cliente_pfpj CHECK ((tipo = 'PF' AND cpf IS NOT NULL and cnpj IS NULL) OR (tipo = 'PJ' AND cnpj IS NOT NULL and cpf IS NULL))
);