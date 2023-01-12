import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
//@ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetSaleQuery } from '../store/api/sale';
import { useThemeStyle } from '../theme';
import {
  GraphPointData,
  TotalSalesLine,
  TotalUnitsLine,
} from '../components/OverviewChart';
import { DailyData } from '../store/api/shared';
import { Header } from '../components/Header';
import { ResponsiveLine } from '@nivo/line';

const DailyStat = () => {
  const theme = useThemeStyle();
  const [startDate, setStartDate] = useState(new Date('2021-03-01'));
  const [endDate, setEndDate] = useState(() => {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + 1);
    return date;
  });
  const { data } = useGetSaleQuery();

  const graphData = useMemo(() => {
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

    const record = [totalSalesLine, totalUnitsLine];
    if (!data) return record;

    ({
      totalSaleGraphData: totalSalesLine.data,
      totalUnitGraphData: totalUnitsLine.data,
    } = computeDailyRecord(data.dailyData, {
      range: { start: startDate, end: endDate },
    }));

    return record;
  }, [data, startDate, endDate]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subTitle="Chart of daily sales" />
      <Box height="70vh">
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          sx={{
            '& > *': {
              width: 'min-content',
            },
          }}
        >
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />

          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Box>
        {data ? (
          <ResponsiveLine
            data={graphData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: 'color' }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: 'Month',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Total',
              legendOffset: -50,
              legendPosition: 'middle',
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </Box>
  );
};

export { DailyStat };

type DailyRecordOption = {
  range?: { start?: Date; end?: Date };
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
      now.getTime() >= Number(option.range.start?.getTime()) &&
      now.getTime() <= Number(option.range.end?.getTime())
    ) {
      date = date instanceof Date ? date.toDateString() : date;
      const splitDate = date.slice(date.indexOf('-') + 1);

      totalSaleGraphData.push({ x: splitDate, y: totalSales });
      totalUnitGraphData.push({ x: splitDate, y: totalUnits });
    }
  });
  return { totalSaleGraphData, totalUnitGraphData };
};
