import { ProductStat } from '../model/ProductStat';
import { Product } from '../model/Product';
import { User } from '../model/User';
import { RequestHandler } from 'express';

interface GetProductsRequestHandler extends RequestHandler {}

const getProducts: GetProductsRequestHandler = async (_, res) => {
  try {
    const products = await Product.find();
    const productsWithStat = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.findOne({ productId: product._id });
        return { stat, ...product.toObject() };
      })
    );

    res.status(200).json({ status: 'success', data: productsWithStat });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      error: { message: (e as { message?: string }).message ?? e },
    });
  }
};

interface GetCustomersRequestHandler extends RequestHandler {}

const getCustomers: GetCustomersRequestHandler = async (_, res) => {
  try {
    const customers = await User.find({ role: 'user' }).select('-password');
    res.status(200).json({ status: 'success', data: customers });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      error: { message: (e as { message?: string }).message ?? e },
    });
  }
};

export { getProducts, getCustomers };
