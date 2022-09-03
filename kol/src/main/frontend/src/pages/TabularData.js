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
  { id: 'topic', label: 'Topic', minWidth: 170 },
  { id: 'press_text', label: 'Press Text', minWidth: 600 },
  {
    id: 'scientific_platform',
    label: 'Scientific Platform',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'url',
    label: 'URL',
    minWidth: 170,
    align: 'right',
    
  },
  
  {
    id: 'key_topic',
    label: 'Key Topic',
    minWidth: 170,
    align: 'right',
    
  },
  
  {
    id: 'other_topic',
    label: 'Other Topic',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'bucket',
    label: 'Bucket',
    minWidth: 170,
    align: 'right',
    
  }
];

function createData(topic,press_text,scientific_platform,date,
    url,key_topic,bucket,other_topic) {
  
  return { topic,press_text,scientific_platform,date,url,
key_topic,bucket,other_topic};
}



export default function TabularData(props) {
    let data = props.Results;
    let results = [];
    const  [tabledata,settabledata] = useState([{}]);
    useEffect(()=>{
        data.map((e)=>{
            let tempobj = {};
            if(e.topic.raw!=null)tempobj.topic = e.topic.raw;
            tempobj.press_text = e.press_text.raw;
            tempobj.scientific_platform = e.scientific_platform.raw;
            tempobj.date = e.date.raw;
            tempobj.url = e.url.raw;
            tempobj.key_topic = e.key_topic.raw;
            tempobj.bucket= e.bucket.raw;
            tempobj.other_topic = e.other_topic.raw;
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
