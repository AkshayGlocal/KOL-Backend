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
// country:{raw:{}},
// abstract_url_other_sources:{raw:{}},
// city:{raw:{}},
// other_topics:{raw:{}},
// link:{raw:{}},
// kol_name:{raw:{}},
// description:{raw:{}},
// type_of_link:{raw:{}},
// abstract_discription:{raw:{}},
// event_part_date:{raw:{}},
// event_role:{raw:{}},
// event_type:{raw:{}},
// link__1:{raw:{}},
// state:{raw:{}},
// sponsor_name:{raw:{}},
// event_end_date:{raw:{}},
// abstract_yes_no:{raw:{}},
// bucket:{raw:{}},
// additional_links:{raw:{}},
// event_name:{raw:{}},
// key_topic:{raw:{}},
// location:{raw:{}},
// event_start_date:{raw:{}},
// description__1:{raw:{}}
const columns = [
  { id: 'country', label: 'Country', minWidth: 170 },
  { id: 'abstract_url_other_sources', label: 'Abstract URL ', minWidth: 170 },
  {
    id: 'abstract_discription',
    label: 'Abstract Discription',
    minWidth: 800,
    align: 'left',
    
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    align: 'left',
    
  },
  {
    id: 'other_topics',
    label: 'Other Topics',
    minWidth: 170,
    align: 'left',
    
  },
  {
    id: 'link',
    label: 'Link',
    minWidth: 170,
    align: 'left',
    
  },
  
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
    
  },
  
  {
    id: 'type_of_link',
    label: 'Type of Link',
    minWidth: 170,
    align: 'left',
    
  },

  {
    id: 'event_part_date',
    label: 'Event Part Date',
    minWidth: 170,
    align: 'left',
    
  },
  {
    id: 'event_role',
    label: 'Event Role',
    minWidth: 170,
    align: 'left',
    
  },
  {
    id: 'event_type',
    label: 'Event Type',
    minWidth: 170,
    align: 'left',
    
  },
//   {
//     id: 'link__1',
//     label: 'Link',
//     minWidth: 170,
//     align: 'right',
    
//   },
  {
    id: 'state',
    label: 'State',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'sponsor_name',
    label: 'Sponsor Name',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'event_end_date',
    label: 'Event End Date',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'abstract_yes_no',
    label: 'Abstract Yes/No',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'bucket',
    label: 'Bucket',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'additional_links',
    label: 'Additional Links',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'event_name',
    label: 'Event Name',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'key_topic',
    label: 'Kep Topic',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'event_start_date',
    label: 'Event Start Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'description__1',
    label: 'Description',
    minWidth: 170,
    align: 'right',
    
  }
  
];

function createData(topic,press_text,scientific_platform,date,
    url,key_topic,bucket,other_topic) {
  
  return { topic,press_text,scientific_platform,date,url,
key_topic,bucket,other_topic};
}



export default function TabularDataConference(props) {
    let data = props.Results;
    let results = [];
    const  [tabledata,settabledata] = useState([{}]);
    useEffect(()=>{
        data.map((e)=>{
            let tempobj = {};
            tempobj.country = e.country.raw;
            tempobj.abstract_url_other_sources = e.abstract_url_other_sources.raw;
            tempobj.city = e.city.raw;
            tempobj.other_topics = e.other_topics.raw;
            tempobj.link = e.link.raw;
            tempobj.description = e.description.raw;
            tempobj.type_of_link= e.type_of_link.raw;
            tempobj.abstract_discription = e.abstract_discription.raw;
            tempobj.event_part_date = e.event_part_date.raw;
            tempobj.event_role = e.event_role.raw;
            tempobj.event_type = e.event_type.raw;
            // tempobj.links__1 = e.links__1.raw;
            tempobj.state = e.state.raw;
            tempobj.sponsor_name = e.sponsor_name.raw;
            tempobj.event_end_date = e.event_end_date.raw;
            tempobj.abstract_yes_no = e.abstract_yes_no.raw;
            tempobj.bucket = e.bucket.raw;
            tempobj.additional_links = e.additional_links.raw;
            tempobj.event_name = e.event_name.raw;
            tempobj.key_topic = e.key_topic.raw;
            tempobj.location = e.location.raw;
            tempobj.event_start_date = e.event_start_date.raw;
            tempobj.description__1 = e.description__1.raw;

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
