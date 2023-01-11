import mongoose, { SchemaDefinition } from 'mongoose';

const ProductStatSchema = new mongoose.Schema(
  {
    productId: String,
    yealySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: {
      day: String,
      totalSales: Number,
      totalUnits: Number,
    },
  } satisfies SchemaDefinition,
  { timestamps: true }
);

const ProductStat = mongoose.model('ProductStat', ProductStatSchema);

export { ProductStat };
