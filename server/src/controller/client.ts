import { ProductStat } from '../model/ProductStat';
import { Product } from '../model/Product';
import { User } from '../model/User';
import { Transaction } from '../model/Transaction';
import { RequestHandler } from 'express';
import { GetModelDataKey } from '../model';

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

type TransactionKey = GetModelDataKey<typeof Transaction>;

type TransactionSortField =
  | `{field: ${TransactionSortObject['field']}, method: ${TransactionSortObject['method']}}`
  | null;

type TransactionSortObject = { field: TransactionKey; method: 'desc' | 'asc' };
type ParsedTransactionSortObjectString = {
  [K in TransactionSortObject['field']]?: 1 | -1;
};

interface GetTransactionQuery {
  page: number;
  pageSize: number;
  sort: TransactionSortField;
  search: string;
}

interface GetTransactionRequestHandler
  extends RequestHandler<null, any, null, GetTransactionQuery> {}

const parseSortField = (
  sort: TransactionSortField
): ParsedTransactionSortObjectString => {
  if (!sort) return {};
  const sortObject = JSON.parse(sort) as TransactionSortObject;

  return { [sortObject.field]: sortObject.method === 'asc' ? 1 : -1 };
};

const getTransactions: GetTransactionRequestHandler = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
    const formattedSortObject = parseSortField(sort);

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(formattedSortObject)
      .skip(page * pageSize)
      .limit(pageSize);

    const transactionCount = await Transaction.countDocuments({
      cost: { $regex: search, $options: 'i' },
      userId: { $regex: search, $options: 'i' },
    });

    return res.status(200).json({
      status: 'success',
      data: {
        transactions,
        count: transactionCount,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      error: { message: (e as { message?: string }).message ?? e },
    });
  }
};

export { getProducts, getCustomers, getTransactions };
