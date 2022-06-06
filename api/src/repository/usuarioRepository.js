import { con } from './connection.js'

export async function inseriranime(anime) {
    const comando = 
        `select id_anime 		id,
                nm_anime 		nome,
           from tb_anime
          where nm_anime 	    = ?
      `
            
    const [linhas] = await con.query(comando [anime])    
    return linhas[0];
} 

