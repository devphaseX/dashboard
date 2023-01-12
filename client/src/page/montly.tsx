import { useMemo } from 'react';
import { Box } from '@mui/material';
import { Header } from '../components/Header';
import { useThemeStyle } from '../theme';
import { useGetSaleQuery } from '../store/api/sale';
import {
  type TotalSalesLine,
  type TotalUnitsLine,
} from '../components/OverviewChart';
import { ResponsiveLine } from '@nivo/line';

const MonthlyStat = () => {
  const theme = useThemeStyle();

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

    data.monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data.push({ x: month, y: totalSales });
      totalUnitsLine.data.push({ x: month, y: totalUnits });
    });

    return record;
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALE" subTitle="Chart of monthly sales." />
      <Box height="75vh">
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

export { MonthlyStat };
