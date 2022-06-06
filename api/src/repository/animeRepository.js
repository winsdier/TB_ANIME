import server from '../controller/animeController.js';
import { con } from './connection.js';

export async function inseriranime(anime) {
    const comando =  
    `INSERT INTO tb_anime(id_anime, nm_anime)
	             VALUES (?, ?');`

    const [resposta] = await con.query(comando [anime.usuario, anime.nome]);
    anime.id = resposta.insertid;

    return anime;
}

export async function alterarImagem(imagem, id) {
    const comando =
        `UPDATE tb_anime 
            SET img_anime   = ?
         WHERE  id_anime	= ?`;

    const [resposta] = await con .query(comando, [imagem, id]);
    return resposta.affectedRows;
}

export async function listarTodosAnimes() {
    const comando =
        `SELECT id_anime		id,
                nm_anime		nome,
           FROM tb_anime`;
    
    const [linhas] = await con.query(comando);
    return linhas;
}

export async function buscarPorId(id) {
    const comando =
        `SELECT id_anime		id,
                nm_anime		nome,
           FROM tb_anime
          WHERE id_anime = ? `;
    
    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}

export async function buscarPorNome(nome) {
    const comando =
        `SELECT id_anime		id,
                nm_anime		nome,
                id_anime      usuario
           FROM tb_anime
          WHERE nm_anime like ? `;
    
    const [linhas] = await con.query(comando, [ `%${nome}%` ]);
    return linhas;
}

export async function removerAnime(id) {
    const comando =
        `DELETE FROM tb_anime 
               WHERE id_anime = ? `;
    
    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

export async function alteraranime(id, anime) {
    const comando = 
        `UPDATE tb_anime
            SET nm_anime      = ?,
                id_anime   = ?
          WHERE id_anime     = ?`
    
    const [resposta] = await con.query(comando, [anime.nome, anime.usuario, id]);
    return resposta.affectedRows;
}