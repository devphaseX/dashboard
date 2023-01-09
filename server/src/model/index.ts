import mongoose from 'mongoose';

type ModelData<DataModel> = DataModel extends mongoose.Model<infer DataSchema>
  ? { [Propert in keyof DataSchema]?: any }
  : never;

type GetModelDataKey<DataModel> =
  ModelData<DataModel> extends infer TransactionData
    ? {
        [K in keyof TransactionData]: K;
      } extends infer TranKeyObject
      ? NonNullable<TranKeyObject[keyof TranKeyObject]>
      : never
    : never;

export type { ModelData, GetModelDataKey };
