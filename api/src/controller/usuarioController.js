//inserir anime se der erro
import { Router } from 'express';
const server = Router();


server.post('/usuario/login', async (req, resp) => {
    try {
        const { anime } = req.body;

        const resposta =  await login(anime);

        if(!resposta) {
            throw new Error('OPS DEU ERRO!!');
        }

        resp.send(resposta)
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

export default server;