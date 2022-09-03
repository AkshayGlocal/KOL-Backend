import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useState } from 'react';


const styles ={
    width:'60rem',
    
}

const columns = [
  { id: 'parent_organization', label: 'Parent Organization', minWidth: 170 },
  { id: 'degree', label: 'Degree', minWidth: 170 },
  {
    id: 'additional_links',
    label: 'Additional Links',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'institution_name',
    label: 'Institution Name',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'education_type',
    label: 'Education Type',
    minWidth: 170,
    align: 'right',
    
  },
  
  {
    id: 'honors',
    label: 'Honors',
    minWidth: 170,
    align: 'right',
    
  },
  
  {
    id: 'url',
    label: 'Url',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'start_date',
    label: 'Start Date',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'end date',
    label: 'End Date',
    minWidth: 170,
    align: 'right',
    
  }
];

function createData(topic,press_text,scientific_platform,date,
    url,key_topic,bucket,other_topic) {
  
  return { topic,press_text,scientific_platform,date,url,
key_topic,bucket,other_topic};
}



export default function TabularDataQualifications(props) {
    let data = props.Results;
    let results = [];
    const  [tabledata,settabledata] = useState([{}]);
    useEffect(()=>{
        data.map((e)=>{
            let tempobj = {};
           // end_date:{raw:{}},
// parent_organization:{raw:{}},
// degree:{raw:{}},
// additional_links:{raw:{}},
// institution_name:{raw:{}},
// education_type:{raw:{}},
// honors:{raw:{}},
// url:{raw:{}},
// start_date:{raw:{}}
		
            tempobj.end_date = e.end_date.raw;
            tempobj.parent_organization = e.parent_organization.raw;
            tempobj.degree = e.degree.raw;
            tempobj.additional_links = e.additional_links.raw;
            tempobj.institution_name = e.institution_name.raw;
            tempobj.education_type = e.education_type.raw;
            tempobj.honors= e.honors.raw;
            tempobj.url = e.url.raw;
            tempobj.start_date = e.start_date.raw;
            results.push(tempobj);
        });
        settabledata(results);
    },[data])
  
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={styles}>
         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {tabledata
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tabledata.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>


    </div>
     );
}
