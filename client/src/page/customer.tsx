import { useGetCustomersQuery } from '../store/api/userApi';
import { Box } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { Header } from '../components/Header';
import { useMemo } from 'react';

const Customer = () => {
  const tableHeaderInfos = useMemo<GridColumns>(
    () => [
      { field: '_id', headerClassName: 'ID', flex: 1 },
      { field: 'name', headerName: 'Name', flex: 0.5 },
      { field: 'email', headerName: 'Email', flex: 1 },
      {
        field: 'phoneNumber',
        headerClassName: 'Phone Number',
        flex: 0.5,
        renderCell: (params) =>
          (params.value as string).replace(
            /^(\d{3})(\d{3})(\d{3})/,
            '($1)$2-$3'
          ),
      },
      { field: 'country', headerName: 'Country', flex: 0.4 },
      { field: 'occupation', headerName: 'Occupation', flex: 1 },
      { field: 'role', headerName: 'Role', flex: 0.5 },
    ],
    []
  );

  const { data, isLoading } = useGetCustomersQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Customers" subTitle="" />
      <DataGrid
        columns={tableHeaderInfos}
        rows={data ?? []}
        getRowId={({ _id: userId }) => userId}
        loading={isLoading || !data}
      />
    </Box>
  );
};

export { Customer };
