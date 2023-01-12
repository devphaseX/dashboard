import { useMemo } from 'react';
import { Box } from '@mui/material';
import { useThemeStyle } from '../theme';
import { Header } from '../components/Header';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { useGetAdminsQuery } from '../store/api/userApi';
import { CustomColumnMenu } from '../components/customColumnMenu';
const AdminInfo = () => {
  const theme = useThemeStyle();
  const { data, isLoading } = useGetAdminsQuery();

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
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subTitle="Managing admins and List of admins " />
      <Box
        height="75vh"
        mt="40px"
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
          rows={data ?? []}
          getRowId={({ _id: userId }) => userId}
          loading={isLoading || !data}
          components={{ ColumnMenu: CustomColumnMenu }}
        />
      </Box>
    </Box>
  );
};

export { AdminInfo };
