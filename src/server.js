const app = require("./app")
const port = Number(process.env.PORT) || 3001
const {testarConexao} = require("./config/database")

async function iniciarServidor() {
    try {
        await testarConexao()
app.listen(port, ()=> {
    console.log(`O bagulho foi ${port}`)
})
    } catch (error) {
        process.exitCode = 1
    }
}
iniciarServidor()