import 'dotenv/config'

import usuarioController from './controller/usuarioController.js';
import animeController from './controller/animeController.js'; 

import express from 'express'
import cors from 'cors'
 
const server = express();
server.use(cors());
server.use(express.json()); 

server.use('/storage', express.static('/storage'));

server.use(usuarioController);
server.use(animeController);






server.listen(process.env.PORT,
             ()=> console.log(`API conectada na porta ${process.env.PORT}`));