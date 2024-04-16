import express from 'express';

import { userRouter } from './routers/users';

const server = express();

server.disable('x-powered-by');

server.use(express.json());

server.use('/users', userRouter);

server.listen(3000, () => {
	console.log('listening on port 3000');
});
