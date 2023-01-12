import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import datePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetSaleQuery } from '../store/api/sale';
import { useThemeStyle } from '../theme';
import {
  GraphPointData,
  OverviewChart,
  OverviewLine,
  TotalSalesLine,
  TotalUnitsLine,
} from '../components/OverviewChart';
import { DailyData } from '../store/api/shared';

const Daily = () => {
  const theme = useThemeStyle();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setMonth(startDate.getMonth() + 1);
    return date;
  });
  const { data } = useGetSaleQuery();

  const f = useMemo(() => {
    const totalSalesLine: TotalSalesLine = {
      id: 'totalSales',
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine: TotalUnitsLine = {
      id: 'totalUnits',
      color: theme.palette.secondary[600],
      data: [],
    };

    const record: OverviewLine = [[totalSalesLine], [totalUnitsLine]];
    if (!data) return record;

    ({
      totalSaleGraphData: totalSalesLine.data,
      totalUnitGraphData: totalUnitsLine.data,
    } = computeDailyRecord(data.dailyData, {
      range: { start: startDate, end: endDate },
    }));

    return record;
  }, [data, startDate, endDate]);

  return <Box m="1.5rem 2.5rem"></Box>;
};

export { Daily };

type DailyRecordOption = {
  range?: { start: Date; end?: Date };
};

const computeDailyRecord = (
  records: Array<DailyData>,
  option: DailyRecordOption = {}
) => {
  const totalSaleGraphData: Array<GraphPointData> = [];
  const totalUnitGraphData: Array<GraphPointData> = [];

  records.forEach(({ date, totalSales, totalUnits }) => {
    const now = new Date(date);
    if (
      option.range &&
      option.range.start <= now &&
      ((option.range.end ?? NaN) <= now || !option.range.end)
    ) {
      date = date instanceof Date ? date.toDateString() : date;
      const splitDate = date.slice(date.indexOf('-') + 1);

      totalSaleGraphData.push({ x: splitDate, y: totalSales });
      totalUnitGraphData.push({ x: splitDate, y: totalUnits });
    }
  });
  return { totalSaleGraphData, totalUnitGraphData };
};
