import { IconButton, TextField, InputAdornment, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridSearchIcon,
} from '@mui/x-data-grid';
import { FlexBetween } from './FlexBetween';
import { useState } from 'react';

interface SubmitFeature {
  submit: (search: string) => void;
}
interface CustomGridToolbarProps extends SubmitFeature {}

const CustomGridToolbar = ({ submit }: CustomGridToolbarProps) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <SearchInput submit={submit} />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

interface SearchInputProps extends SubmitFeature {}

const SearchInput = ({ submit }: SearchInputProps) => {
  const [userInput, setUserInput] = useState('');

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        label="Searching..."
        sx={{ mb: '0.5rem', width: '15rem' }}
        onChange={(event) => setUserInput(event.target.value)}
        value={userInput}
        variant="standard"
      ></TextField>

      <IconButton
        onClick={() => {
          const searchText = userInput.trim();
          if (!searchText) return;
          submit(searchText);
          setUserInput('');
        }}
        sx={{
          position: 'absolute',
          right: '6px',
          top: '50%',
          transform: 'translateY(-60%)',
        }}
      >
        <Search sx={{ fontSize: '24px', color: '#ffffff' }} />
      </IconButton>
    </Box>
  );
};

export { CustomGridToolbar };
