import { alterarImagem, buscarPorId, buscarPorNome, removerAnime, inseriranime } from '../repository/animeRepository.js'

import multer from 'multer'
import { Router } from 'express'

<br></br>

const server = Router();
const upload = multer({ dest: 'storage/capasFilmes' })


server.put('/anime/img', upload.single('capa'), async (req, resp) => {
    try {
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id);
        if (resposta != 1)
            throw new Error('A imagem não pode ser salva.');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/anime', async (req, resp) => {
    try {
        const resposta = await listarTodosAnimes();
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/Anime/busca', async (req, resp) => {
    try {
        const { nome } = req.query;
        
        const resposta = await buscarPorNome(nome);

        if (resposta.length == 0)
            resp.status(404).send([])
        else
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/Anime/:id', async (req, resp) => {
    try {
        const id = Number(req.params.id);
        
        const resposta = await buscarPorId(id);

        if (!resposta)
            resp.status(404).send([])
        else
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.post('/anime/inserir', async (req, resp) => {
    try {
        const novoanime = req.body;

        if (!novoanime.nome)
            throw new Error('Nome do anime é obrigatório!');
      
        const animeInserido = await inseriranime(novoanime);
        resp.send(animeInserido);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

server.delete('/anime/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await removerAnime(id);
        if (resposta != 1)
            throw new Error('Anime não pode ser removido.');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server
});