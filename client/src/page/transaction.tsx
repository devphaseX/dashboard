import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionQuery } from '../store/api/transaction';

const Transaction = () => {
  const { data } = useGetTransactionQuery({});
  console.log(data);
  return <div>transaction</div>;
};

export { Transaction };
