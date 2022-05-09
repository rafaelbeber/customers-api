//Imports
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Busca o .env de configuração
dotenv.config();

// Cria o pool de conexão
const pool = new Pool({
  user: process.env.USER,
  password: process.env.PW,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.PORT?.toString()
});

// O Pool irá exibir um erro caso ocorra algum erro no backend ou de rede. 
pool.on('error', (error:any, client:any) => {
  console.error('Unexpected error on idle client', error)
  process.exit(-1)
})

export default pool;