import { dataProduct, dataProductStat, dataUser } from './data';
import { startDbServer } from './mongodb';
import { User } from '../../../model/User';
import mongoose from 'mongoose';
import { Product } from '../../../model/Product';
import { ProductStat } from '../../../model/ProductStat';
import { getEnvVariable } from '../env';

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

startDbServer()
  .then(async () => {
    if (getEnvVariable().NODE_ENV !== 'development') {
      return console.log(
        'Database population only applicable if the NODE_ENV is set to development.'
      );
    }
    const userPopulateTask = populateUserCollection().then(() =>
      console.log('User records database populated done.')
    );

    const productPopulateTask = populateProductCollection().then(() =>
      console.log('Products records database populated done.')
    );

    const productStatPopulateTask = populateProductStatCollection().then(() =>
      console.log('ProductStat records database populated done.')
    );

    return Promise.all([
      userPopulateTask,
      productPopulateTask,
      productStatPopulateTask,
    ]);
  })
  .finally(() => {
    process.exit(0);
  });

type ModelData<DataModel> = DataModel extends mongoose.Model<infer DataSchema>
  ? { [Propert in keyof DataSchema]?: any }
  : never;
