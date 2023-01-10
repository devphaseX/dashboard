import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import {
  TransactionRequestQuery,
  TransactionSortField,
  TransactionSortObject,
  useGetTransactionQuery,
} from '../store/api/transaction';
import { useState } from 'react';
import { dropEmptyProps } from '../util';
import { useThemeStyle } from '../theme';
import { useMemo } from 'react';
import { Header } from '../components/Header';
import { CustomGridToolbar } from '../components/CustomGridToolbar';

const formalizedTranQuery = ({
  page,
  pageSize,
  search,
  sort,
}: TransactionRequestQuery) => {
  return dropEmptyProps(
    {
      page,
      pageSize,
      sort,
      search,
    },
    (_, value) =>
      value == undefined || (typeof value === 'string' && value.trim() === '')
  );
};

const Transaction = () => {
  const theme = useThemeStyle();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortObject, setSortObject] = useState<TransactionSortObject | null>(
    null
  );
  const [search, setSearch] = useState('');
  const query = formalizedTranQuery({
    page,
    pageSize,
    search,
    sort:
      sortObject === null
        ? sortObject
        : (JSON.stringify(sortObject) as TransactionSortField),
  });
  const { data, isLoading } = useGetTransactionQuery(query);
  const tableHeaderInfos = useMemo<GridColumns>(
    () => [
      { field: '_id', headerClassName: 'ID', flex: 1 },
      { field: 'userId', headerName: 'User ID', flex: 1 },
      { field: 'createdAt', headerName: 'Created At', flex: 1 },
      {
        field: 'products',
        headerClassName: '# of products',
        flex: 0.5,
        sortable: false,
        renderCell: (params) => (params.value as any[]).length,
      },
      {
        field: 'cost',
        headerName: 'Cost',
        flex: 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      },
    ],
    []
  );
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subTitle="Entire list of transaction" />
      <Box
        height="80vh"
        sx={{
          overflowX: 'hidden',
          '& .MuiDataGrid-root': {
            border: 'none',
          },

          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },

          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },

          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },

          '& .MuiDataGrid-toolbarContainer . MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          columns={tableHeaderInfos}
          rows={data?.transactions ?? []}
          loading={isLoading || !data}
          getRowId={({ userId }) => userId}
          rowCount={data?.count ?? 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          rowsPerPageOptions={[pageSize]}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(pageSize) => setPageSize(pageSize)}
          onSortModelChange={([sortModel]) => {
            console.log(sortModel);
            setSortObject({
              field: sortModel.field as any,
              method: sortModel.sort as any,
            });
          }}
          components={{ Toolbar: CustomGridToolbar }}
        />
      </Box>
    </Box>
  );
};

export { Transaction };
