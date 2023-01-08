import mongoose, { SchemaDefinition } from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    catergory: String,
    rating: Number,
    supply: Number,
  } satisfies SchemaDefinition,
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export { Product };
