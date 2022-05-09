//Imports
import express, { Request, Response, NextFunction } from 'express';

import indexRouter from './routes';
import customerRouter from './routes/customer.routes';

//Criando objeto app
const app = express();

//Adicionando a funionalidade de json ao objeto app
app.use(express.json());

//Midleware
function loggerMiddleware(request:Request, response:Response, next:NextFunction) {
    console.log(`${request.method} ${request.path}`);
    next();
}
//Adicionando o midleware ao objeto app
app.use(loggerMiddleware);


//------------------- Rotas ------------------------
app.use(indexRouter);
app.use(customerRouter);


//--------------------------------------------------
app.listen(3000, () => {
    console.log('App Rodando!!! ;-)');
});