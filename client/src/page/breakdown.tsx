import React from 'react';
import { Box } from '@mui/material';
import { Header } from '../components/Header';
import { BreakDownChart } from '../components/BreakDownChart';

const BreakDownStat = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subTitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakDownChart isDashboard={false} />
      </Box>
    </Box>
  );
};

export { BreakDownStat };
