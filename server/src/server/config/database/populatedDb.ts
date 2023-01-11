import {
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from './data';
import { startDbServer } from './mongodb';
import { User } from '../../../model/User';
import mongoose from 'mongoose';
import { Product } from '../../../model/Product';
import { ProductStat } from '../../../model/ProductStat';
import { getEnvVariable } from '../env';
import { ModelData } from '../../../model/';
import { Transaction } from '../../../model/Transaction';
import { OverAllStat } from '../../../model/OverAllStat';

const populateDb = async <Model extends mongoose.Model<any>>(
  Model: Model,
  data: Array<ModelData<Model>>
) => {
  await Model.deleteMany();
  await Model.insertMany(data);
};

const populateUserCollection = () => populateDb(User, dataUser);
const populateProductCollection = () => populateDb(Product, dataProduct);
const populateProductStatCollection = () =>
  populateDb(ProductStat, dataProductStat);

const populateTransactionCollection = () =>
  populateDb(Transaction, dataTransaction);

const populateOverAllStatCollection = () =>
  populateDb(OverAllStat, dataOverallStat);

startDbServer()
  .then(async () => {
    if (getEnvVariable().NODE_ENV !== 'development') {
      return console.log(
        'Database population only applicable if the NODE_ENV is set to development.'
      );
    }
    const userPopulateTask = populateUserCollection().then(() =>
      console.log('User records database population done.')
    );

    const productPopulateTask = populateProductCollection().then(() =>
      console.log('Products records database population done.')
    );

    const productStatPopulateTask = populateProductStatCollection().then(() =>
      console.log('ProductStat records database population done.')
    );

    const transactionPopulateTask = populateTransactionCollection().then(() =>
      console.log('Transaction records database population done.')
    );

    const overAllStatPopulateTask = populateOverAllStatCollection().then(() =>
      console.log('OverAllStat records database population done.')
    );

    return Promise.all([
      userPopulateTask,
      productPopulateTask,
      productStatPopulateTask,
      transactionPopulateTask,
      overAllStatPopulateTask,
    ]);
  })
  .finally(() => {
    process.exit(0);
  });
