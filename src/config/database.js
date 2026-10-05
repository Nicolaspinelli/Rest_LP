const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'db_pass',
    database: process.env.DB_NAME || 'db_rest',
    dateStrings: true, //retorna sempre data em formato texto
    waitForConnections: true, //espera por conexões disponíveis
    connectionLimit: 10, //limita as conexões simultâneas
    queueLimit: 0 //limite máximo de requisições. 0 é sem limite
})
async function testarConexao() {
    let conexao;
    try{
        conexao = await pool.getConnection();
        await conexao.query('SELECT 1');
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro no Mysql', error);
    }
    finally {
        conexao?.release();
    }
}
module.exports = {pool, testarConexao};