import mongoose, { SchemaDefinition } from 'mongoose';

const OverAllStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
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

    salesByCategory: { type: Map, of: Number },
  } satisfies SchemaDefinition,
  { timestamps: true }
);

const OverAllStat = mongoose.model('ProductStat', OverAllStatSchema);

export { OverAllStat };
