import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import DeliverymanController from './app/controllers/DeliverymanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/deliverymans', DeliverymanController.index);
routes.get('/recipients', RecipientController.index);

routes.post('/recipients', RecipientController.store);
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/deliverymans', DeliverymanController.store);

routes.put('/users', UserController.update);
routes.put('/recipients/:id', RecipientController.update);
routes.put('/deliverymans/:id', DeliverymanController.update);

routes.delete('/deliverymans/:id', DeliverymanController.delete);
routes.delete('/recipients/:id', RecipientController.delete);

export default routes;
