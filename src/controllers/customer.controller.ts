import {Request, Response} from 'express';
import pool from '../config/db';

// ==> Método responsável por listar todos os 'Products':

exports.getCostumers = async (request:Request, response:Response) => {

  const queryString:string = 'SELECT * FROM customers ORDER BY id ASC;';
  
  pool
    .connect()
    .then(
      client => {
        return client
          .query(queryString)
          .then(result => {
            console.log(result.rows);
            response.status(200).json({customer: result.rows})  
          })
          .catch(error => {
            client.release()
            console.log(error.stack)
            response.status(500).json(error)
          });
    });
};

exports.getCostumerById = async (request:Request, response:Response) => {

  const queryString:string = 'SELECT * FROM customers WHERE id = $1';

  const id = parseInt(request.params.id);
  
  pool
    .connect()
    .then(
      client => {
        return client
          .query(queryString, [id])
          .then(result => {
            console.log(result.rows);
            response.status(200).json({customer: result.rows})  
          })
          .catch(error => {
            client.release()
            console.log(error.stack)
            response.status(500).json(error)
          });
    });
};

exports.create = async (request:Request, response:Response) => {
  
  const queryString:string = `
    INSERT INTO customers(id, name, cpf_cnpj, email, gender, created_at, updated_at) 
    VALUES(nextval('customers_id_seq'), $1, $2, $3, $4, NOW(), NOW()) RETURNING id
  `;

  const values:Array<string> = [request.body.name, request.body.cpf_cnpj, request.body.email, request.body.gender]

  pool
    .connect()
    .then(
      client => {
        return client
          .query(queryString, values)
          .then(result => {
            response.status(200).json({customerId: result.rows[0].id});
          })
          .catch(error => {
            client.release();
            response.status(500).json(error);
          });
    });
};

exports.update = async (request:Request, response:Response) => {
  
  const queryString:string = `UPDATE customers 
                                SET 
                                  name = $2, 
                                  cpf_cnpj = $3, 
                                  email = $4, 
                                  gender = $5, 
                                  updated_at = NOW() 
                                WHERE id = $1 RETURNING *;
                              `;

  const values:Array<string> = [request.params.id, request.body.name, request.body.cpf_cnpj, request.body.email, request.body.gender]

  pool
    .connect()
    .then(
      client => {
        return client
          .query(queryString, values)
          .then(result => {
            response.status(200).json({customer: result.rows[0]})  
          })
          .catch(error => {
            client.release()
            response.status(500).json(error)
          });
    });
};

exports.delete = async (request:Request, response:Response) => {
  const queryString:string = `DELETE FROM customers WHERE id = $1 RETURNING *;`;

  const values:Array<string> = [request.params.id];

  pool
    .connect()
    .then(
      client => {
        return client
          .query(queryString, values)
          .then(result => {
            response.status(200).json({customer: result.rows[0]})  
          })
          .catch(error => {
            client.release()
            response.status(500).json(error)
          });
    });
};