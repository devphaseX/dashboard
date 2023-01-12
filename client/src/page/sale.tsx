import { Box, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { Header } from '../components/Header';
import { ChartType, OverviewChart } from '../components/OverviewChart';
import { useState } from 'react';

const Overview = () => {
  const [view, setView] = useState<ChartType>('units');

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subTitle="Overview of general revenue and profit"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value as typeof view)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} isDashboard />
      </Box>
    </Box>
  );
};

export { Overview };
