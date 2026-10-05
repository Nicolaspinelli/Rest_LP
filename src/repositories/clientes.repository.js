const {pool} = require('../config/database')
const consultaClienete = 'select * from clientes'
function montarCliente(linha) { // Função para mapear os dados do banco de dados para o formato desejado
    return {
        id: linha.id,
        tipo: linha.tipo,
        nome: linha.nome,
        email: linha.email,
        telefone: linha.telefone,
        cpf: linha.cpf,
        cnpj: linha.cnpj,
        dataNascimento: linha.data_nascimento,
        razaoSocial: linha.razao_social,
        inscricaoEstadual: linha.inscricao_estadual,
        estadoCivil: linha.estado_civil,
        ativo: linha.ativo,
        limiteCredito: linha.limite_credito,
        observacoes: linha.observacoes,
        criadoEm: linha.criado_em,
        atualizadoEm: linha.atualizado_em,
    };
}

async function listar() { // Função para listar todos os clientes
    const [linhas] = await pool.query(consultaClienete)
    return linhas.map(montarCliente)
}
async function buscarPorId(id) { // Função para buscar um cliente pelo ID
    const [linhas] = await pool.query(`${consultaClienete} where id = ?`, [id])
    if (linhas.length === 0) { return null }
    return montarCliente(linhas[0])
}
async function criar(dadosCliente) { // Função para criar um novo cliente
    const cliente = {
        tipo: dadosCliente.tipo,
        nome: dadosCliente.nome,
        email: dadosCliente.email,
        telefone: dadosCliente.telefone,
        cpf: dadosCliente.tipo === "PF" ? dadosCliente.cpf : null,
        cnpj: dadosCliente.tipo === "PJ" ? dadosCliente.cnpj : null,
        data_nascimento: dadosCliente.tipo === "PF" ? dadosCliente.data_nascimento : null,
        razao_social: dadosCliente.tipo === "PJ" ? dadosCliente.razao_social : null,
        inscricao_estadual: dadosCliente.tipo === "PJ" ? dadosCliente.inscricao_estadual : null,
        estado_civil: dadosCliente.tipo === "PF" ? dadosCliente.estado_civil : null,
        ativo: dadosCliente.ativo ?? true,
        limite_credito: dadosCliente.limiteCredito ?? 0,
        observacoes: dadosCliente.observacoes ?? null
    }
    const sql = 'insert into clientes set ?'
    const [resultado] = await pool.query(sql, [cliente])
    return buscarPorId(resultado.insertId)
}

async function atualizar(id, dadosCliente = {}) { // Função para atualizar um cliente existente
    const conexao = await pool.getConnection()
    const pessoaFisica = dadosCliente.tipo === "PF"
    const pessoaJuridica = dadosCliente.tipo === "PJ"

    const clienteAtualizado = {
        tipo: dadosCliente.tipo ?? null,
        nome: dadosCliente.nome ?? null,
        email: dadosCliente.email ?? null,
        telefone: dadosCliente.telefone ?? null,
        cpf: pessoaFisica ? (dadosCliente.cpf ?? dadosCliente.cpf ?? null) : null,
        cnpj: pessoaJuridica ? (dadosCliente.cnpj ?? null) : null,
        data_nascimento: pessoaFisica ? (dadosCliente.data_nascimento ?? dadosCliente.dataNascimento ?? null) : null,
        razao_social: pessoaJuridica ? (dadosCliente.razao_social ?? dadosCliente.razaoSocial ?? null) : null,
        inscricao_estadual: pessoaJuridica ? (dadosCliente.inscricao_estadual ?? dadosCliente.inscricaoEstadual ?? null) : null,
        estado_civil: pessoaFisica ? (dadosCliente.estado_civil ?? dadosCliente.estadoCivil ?? null) : null,
        ativo: dadosCliente.ativo ?? true,
        limite_credito: dadosCliente.limiteCredito ?? dadosCliente.limite_credito ?? 0,
        observacoes: dadosCliente.observacoes ?? null
    }

    try {
        await conexao.beginTransaction() // Inicia a transação

        const campos = Object.entries(clienteAtualizado)
            .filter(([, valor]) => valor !== undefined)
            .map(([chave]) => `${chave} = ?`)
            .join(', ')

        const valores = Object.values(clienteAtualizado).filter((valor) => valor !== undefined)
        valores.push(id)

        const [resultadoCliente] = await conexao.execute(
            `update clientes set ${campos} where id = ?`,
            valores
        )

        if (resultadoCliente.affectedRows === 0) { // Nenhuma linha foi atualizada, o que significa que o cliente não existe
            await conexao.rollback() // Desfaz a transação em caso de falha
            return null
        }

        await conexao.commit() // Confirma a transação
        return buscarPorId(id) // Retorna o cliente atualizado
    } catch (erro) {
        await conexao.rollback() // Desfaz a transação em caso de erro
        throw erro
    } finally {
        conexao.release() // Libera a conexão de volta para o pool
    }
}
    async function remover(id) { // Função para deletar um cliente
        const [resultado] = await pool.query('delete from clientes where id = ?', [id])
        return resultado.affectedRows > 0 // Retorna true se o cliente foi deletado, false caso contrário
    }
module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
}