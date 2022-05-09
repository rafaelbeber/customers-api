 import { Request, Response, Router} from 'express';

 const router = Router();
 
 router.get('/', (request: Request, response: Response) => {
   
    response.status(200).send({
     success: 'true',
     message: 'Seja bem-vindo(a) a API Node.js + PostgreSQL!',
     version: '1.0.0',
   });
 });
 
 export default router;
 