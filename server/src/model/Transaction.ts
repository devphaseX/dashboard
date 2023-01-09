import mongoose, { SchemaDefinition } from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  } satisfies SchemaDefinition,
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);
export { Transaction };
