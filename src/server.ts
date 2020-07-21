import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import UploadConfig from './config/upload';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(UploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server is on!!');
});
