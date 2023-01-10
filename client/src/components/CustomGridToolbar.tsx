import React from 'react';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridSearchIcon,
} from '@mui/x-data-grid';
import { FlexBetween } from './FlexBetween';

const CustomGridToolbar = () => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Searching..."
          sx={{ mb: '0.5rem', width: '15rem' }}
          inputProps={{
            endadornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <GridSearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export { CustomGridToolbar };
