    const clientesRepository = require("../repositories/clientes.repository")

async function listar(req, res, next){
    try{
        const clientes = await clientesRepository.listar();
        return res.json({
            total: clientes.length,
            dados: clientes
        })
    } catch (erro){
        return next(erro)
    }
}
async function buscarPorId(req, res, next){
    try{
        const id = Number(req.params.id)
        const cliente = await clientesRepository.buscarPorId(id)
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' })
        }
        return res.json(cliente)
    } catch (erro){
        return next(erro)
    }
}
async function criar(req, res, next){
    try{
        const cliente = await clientesRepository.criar(req.body)
        return res.status(201).json({
            mensagem: 'Cliente criado com sucesso',
            dados: cliente
        })
    } catch (erro){
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)
        const clienteRemovido = await clientesRepository.remover(id)
        if (!clienteRemovido) {
            return res.status(404).json({ erro: 'Cliente não encontrado' })
        }
        return res.status(204).send({ mensagem: 'Cliente removido com sucesso' })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)
        const cliente = await clientesRepository.atualizar(id, req.body)
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado para a alteração' })
        }
        return res.json({
            mensagem: 'Cliente atualizado com sucesso',
            dados: cliente
        })
    } catch (erro) {
        return next(erro)
    }
}

module.exports = {listar, buscarPorId, criar, atualizar, remover}