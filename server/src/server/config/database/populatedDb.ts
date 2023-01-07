import { dataUser } from './data';
import { startDbServer } from './mongodb';
import { User } from '../../../model/User';
import mongoose from 'mongoose';

type ModelData<M> = M extends mongoose.Model<infer DataSchema>
  ? { [Propert in keyof DataSchema]: any }
  : never;

async function populateDb<Model extends mongoose.Model<any>>(
  Model: Model,
  data: Array<Partial<ModelData<Model>>>
) {
  await Model.deleteMany();
  await Model.insertMany(data);
}

startDbServer().then(async () => {
  await populateDb(User, dataUser);
  console.log('User records database populated done.');
});
