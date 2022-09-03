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
  { id: 'position_role', label: 'Position Role', minWidth: 170 },
  { id: 'organization_name', label: 'Organization Name', minWidth: 170 },
  {
    id: 'affiliation_type',
    label: 'Affiliation Type',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'links',
    label: 'Links',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'end_date',
    label: 'End Date',
    minWidth: 170,
    align: 'right',
    
  },
  
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    align: 'right',
    
  },
  
  {
    id: 'country',
    label: 'Country',
    minWidth: 170,
    align: 'right',
    
  }
];

function createData(topic,press_text,scientific_platform,date,
    url,key_topic,bucket,other_topic) {
  
  return { topic,press_text,scientific_platform,date,url,
key_topic,bucket,other_topic};
}



export default function TabularDataprofession(props) {
    let data = props.Results;
    let results = [];
    const  [tabledata,settabledata] = useState([{}]);
    useEffect(()=>{
        data.map((e)=>{
            let tempobj = {};
            // parent_organization: { raw: {} },
// 			position_role: { raw: {} },
// 			organization_name: { raw: {} },
// 			parent_organization_type: { raw: {} },
// 			affiliation_type: { raw: {} },
// 			links: { raw: {} },
// 			end_date: { raw: {} },
// 			city: { raw: {} },
// 			country: { raw: {} }
		
            tempobj.parent_organization = e.parent_organization.raw;
            tempobj.position_role = e.position_role.raw;
            tempobj.organization_name = e.organization_name.raw;
            tempobj.parent_organization_type = e.parent_organization_type.raw;
            tempobj.affiliation_type = e.affiliation_type.raw;
            tempobj.links = e.links.raw;
            tempobj.end_date= e.end_date.raw;
            tempobj.city = e.city.raw;
            tempobj.country = e.country.raw;
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
