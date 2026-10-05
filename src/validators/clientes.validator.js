const { body, param } = require("express-validator")
const tiposCliente = ['PF', 'PJ']

const validarCliente = [
    body('tipo')
        .exists({ checkFalsy: true })
        .withMessage('O campo tipo é obrigatório')
        .bail()
        .isIn(tiposCliente)
        .withMessage("O campo tipo deve ser 'PF' ou 'PJ'"),

        body('nome')
        .exists({ checkFalsy: true })
        .withMessage('O campo nome é obrigatório')
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage('O campo nome deve ter entre 3 e 100 caracteres'),

        body('email')
        .exists({checkFalsy: true})
        .withMessage('O campo email é obrigatório')
        .bail()
        .trim()
        .isEmail()
        .withMessage('O campo email deve ser um endereço de email válido'),

        body('telefone')
        .exists({checkFalsy: true})
        .withMessage('O campo telefone é obrigatório')
        .bail()
        .isLength({ min: 10, max: 11 })
        .withMessage('O campo telefone deve ter entre 10 e 11 caracteres'),

        body('ativo')
        .optional()
        .isBoolean()
        .withMessage('O campo ativo deve ser um valor booleano')
        .toBoolean(),

        body('data_nascimento')
        .if(body('tipo').equals('PF'))
        .exists({checkFalsy: true})
        .withMessage('O campo data_nascimento é obrigatório para clientes do tipo PF')
        .bail()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage('O campo data_nascimento deve ser uma data válida no formato AAAA-MM-DD'),

        body('limite_credito')
        .optional()
        .isFloat({ min: 0, max: 999999.99 })
        .withMessage('O campo limite_credito deve ser um valor numérico positivo e menor que 1milhão'),
]

module.exports = { validarCliente }