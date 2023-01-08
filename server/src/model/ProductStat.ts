import mongoose, { SchemaDefinition } from 'mongoose';

const ProductStatSchema = new mongoose.Schema({} satisfies SchemaDefinition);

const ProductStat = mongoose.model('ProductStat', ProductStatSchema);

export { ProductStat };
