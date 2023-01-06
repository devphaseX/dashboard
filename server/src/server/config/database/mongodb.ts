import mongoose from 'mongoose';
import { getEnvVariable } from '../env';

const { DB_URL } = getEnvVariable();

function startDbServer() {
  return mongoose.connect(DB_URL).then(
    (instance) => {
      console.log(
        'Database connection established, using the PORT: ',
        instance.connection.port
      );
      return instance;
    },
    (reason) => {
      console.log(
        'An error occured while establishing a connection to the database'
      );
      throw reason;
    }
  );
}

export { startDbServer };
