import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { tableApi } from '../../store/api';
import {
  DataGrid,
  GridApi,
  GridCsvExportMenuItem,
  GridCsvExportOptions,
  GridExportMenuItemProps,
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarExportContainer,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import {
  ButtonProps,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'report_type',
    headerName: 'Report Type',

    width: 150,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 50,

    type: 'number',
  },
  {
    field: 'sales',
    headerName: 'Sale',
    type: 'number',
    width: 150,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
  },
  {
    field: 'month',
    headerName: 'Month',

    width: 150,
  },
];

const getJson = (apiRef: React.MutableRefObject<GridApi>) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row: Record<string, any> = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return JSON.stringify(data, null, 2);
};

const exportBlob = (blob: Blob, filename: string) => {
  // Save the blob in a json file
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};

function JsonExportMenuItem(props: GridExportMenuItemProps<{}>) {
  const apiRef = useGridApiContext();

  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef);
        const blob = new Blob([jsonString], {
          type: 'text/json',
        });
        exportBlob(blob, 'DataGrid_demo.json');

        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Export JSON
    </MenuItem>
  );
}

function CustomToolbar(props: GridToolbarContainerProps) {
  return (
    <GridToolbarContainer {...props}>
      <CustomExportButton />
    </GridToolbarContainer>
  );
}

const csvOptions: GridCsvExportOptions = { delimiter: ';' };

function CustomExportButton(props: ButtonProps) {
  return (
    <GridToolbarExportContainer {...props}>
      <GridCsvExportMenuItem options={csvOptions} />
      <JsonExportMenuItem />
    </GridToolbarExportContainer>
  );
}

const MISTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [reportType, setReportType] = useState('type1');

  const {
    data: apiResponse,
    refetch,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: tableApi({ page, limit, report_type: reportType }),
  });

  

  useEffect(() => {
    if (isSuccess) refetch();
  }, [reportType]);

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }
  return (
    <>
      <FormControl variant='standard' sx={{ width: '200px' }}>
        <Typography fontSize='12px'>Select type</Typography>
        <Select
          value={reportType}
          label='Role'
          placeholder='Select role'
          onChange={(e) => setReportType(e.target.value)}
        >
          <MenuItem value={'type1'}>Type1</MenuItem>
          <MenuItem value={'type2'}>Type2</MenuItem>
          <MenuItem value={'type3'}>Type3</MenuItem>
        </Select>
      </FormControl>
      <DataGrid
        rows={apiResponse?.data || []}
        // @ts-ignore
        rowsPerPageOptions={[5, 10, 25]}
        columns={columns}
        autoHeight
        paginationMode='server'
        // @ts-ignore
        page={parseInt(page.toString())}
        pageSize={parseInt(limit.toString())}
        pagination
        onPageSizeChange={() => console.log('sdf')}
        onPageChange={() => console.log('sdf')}
        getRowId={(row) => row._id}
        slots={{ toolbar: CustomToolbar }}
      />
    </>
  );
};
export default MISTable;
