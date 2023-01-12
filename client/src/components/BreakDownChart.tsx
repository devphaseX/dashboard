import React from 'react';
import { Box, Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { useThemeStyle } from '../theme';
import { useGetSaleQuery } from '../store/api/sale';
import { useMemo } from 'react';

interface BreakDownChartProps {
  isDashboard: boolean;
}

type ChartPie = {
  id: string;
  label: string;
  value: number;
  color: string;
};

const BreakDownChart = ({ isDashboard }: BreakDownChartProps) => {
  const { data, isLoading } = useGetSaleQuery();
  const theme = useThemeStyle();
  if (!data || isLoading) return <div>Loading...</div>;

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const graphData = useMemo(() => {
    return Object.entries(data.salesByCategory).map<ChartPie>(
      ([category, sales], i) => ({
        id: category,
        label: category,
        value: sales,
        color: colors[i % colors.length],
      })
    );
  }, [data]);

  return (
    <Box
      height={isDashboard ? '400px' : '100%'}
      width="100%"
      minHeight={isDashboard ? '325px' : 'initial'}
      minWidth={isDashboard ? '326px' : 'initial'}
      position="relative"
    >
      <ResponsivePie
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
        colors={{ datum: 'data.color' }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        sx={{
          transform: isDashboard
            ? 'translate(-75%, -170%)'
            : 'translate(-50%, -100%)',

          pointerEvents: 'none',
        }}
      >
        <Typography variant="h6">
          {!isDashboard && 'Total:'} ${data.yearlyTotalSoldUnits}
        </Typography>
      </Box>
    </Box>
  );
};

export { BreakDownChart };
