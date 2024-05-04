// @ts-nocheck
import { Toolbar, Card, CardActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Endpoint } from '../../../Services/endpoints';
import { NavLink } from 'react-router-dom';
import TableSkeleton from "../../../SubComponents/TableSkeleton";

const ViewUsers = () => {
    const [usersList,setUsersList] = useState([]);
    const [page,setPage] = useState(0);
    // const [visibleRows,setVisibleRows] = useState([]);
    const endpoints = new Endpoint();
    useEffect(()=>{
        const getUsers=async()=>{
            let response = await endpoints.getAllInternalUsers();
            if(response!==endpoints.ErrorCode){
                console.log(response);
                setUsersList(response);
            }
        }
        getUsers();
    },[])

    const handlePageChange = (event,newpage) => {
        setPage(newpage);
    }

    const visibleRows = usersList.slice(
        page * 10,
        page * 10 + 10,
      );
  return (
    <>
    <div>
    <Toolbar />
        <Card className="card">
          <CardActions>
            <div>View User</div>
          </CardActions>
        </Card>
        <Paper className="card">
        <TableContainer >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  className="backLime"
                >
                  User
                </TableCell>
                <TableCell align="center" className="backLime">
                  Created At
                </TableCell>
                <TableCell align="center" className="backLime">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              visibleRows.length===0?(
                <TableSkeleton cells={3}/>
              ):(
                visibleRows.map((val,index)=>{
                    return (
                        <TableRow hover key={index}>
                            <TableCell align="center">
                             <NavLink color='neutral' style={{textDecoration:'none',color:'limegreen'}} to={`/internal/support/user/edit/${val.id}`}>
                             {val.email}
                             </NavLink> 
                            </TableCell>
                            <TableCell align="center">{new Date(val.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell align="center">
                              {val.status}
                            </TableCell>
                        </TableRow>
                    )
                })
              )
            }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination count={usersList.length} 
        component="div" rowsPerPage={10} page={page} rowsPerPageOptions={[10]}
        onPageChange={handlePageChange}
         />
      </Paper>

    </div>

    </>
  )
}

export default ViewUsers