// @ts-nocheck
import { Toolbar, Card, CardActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { Endpoint } from '../../Services/endpoints';
import TableSkeleton from "../../SubComponents/TableSkeleton";

const ChefConsole = () => {
  const endpoints = new Endpoint();
  const [socket,setSocket] = useState(endpoints.getInternalSocketInstance());
  const [orderList,setOrderList] = useState([]);
  const [doneItems,setDoneItems] = useState([]);
  useEffect(()=>{
    socket.emit("joinChef");
    socket.on("fetch_order",(res)=>{
      console.log(res);
      setOrderList((pre)=>{
        return[...pre,...res]
      })
    })
    socket.on("chefCompletedOrder",(orderId)=>{
      console.log(orderId);
      setDoneItems((pre)=>{
        return[...pre,orderId]
      })
    })
    socket.on("previousOrders",(res)=>{
      console.log(res);
      setOrderList([...res])
    })
  },[])

  const orderComplete = (orderId) =>{
    socket.emit("orderComplete",orderId);
    setOrderList((pre)=>{
      let ans=pre.filter((val)=>val._id!==orderId)
      return ans;
    })
  }
  const removeOrder = (orderId) =>{
    setDoneItems((pre)=>{
      let ans = pre.filter((val)=>val!==orderId)
      return ans;
    })
    setOrderList((pre)=>{
      let ans = pre.filter((val)=>val._id!==orderId)
      return ans;
    })
  }
  return (
    <>
      <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Chef's Console</div>
        </CardActions>
      </Card>
      <Paper className="card">
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  className="backLime"
                >
                  Product
                </TableCell>
                <TableCell align="center" className="backLime">
                  Quantity
                </TableCell>
                <TableCell align="center" className="backLime">
                Table Name
                </TableCell>
                <TableCell align="center" className='backLime'>
                Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.length>0 && (orderList.map((val, i) => {
                return (
                  <TableRow hover sx={{background:doneItems.includes(val._id)?"wheat":"white"}}  key={val._id}>
                    <TableCell align="center">{val.product}</TableCell>
                    <TableCell align="center">{val.quantity}</TableCell>
                    <TableCell align="center">{val.table}</TableCell>
                    <TableCell align="center">
                    {
                      doneItems.includes(val._id)?(
                        <Button color="neutral"
                        onClick={()=>removeOrder(val._id)} variant="outlined">
                          Remove
                        </Button>
                      ):(
                      <Button
                        color="neutral"
                        onClick={() => orderComplete(val._id)}
                        variant="outlined"
                      >
                      Complete
                      </Button>
                      )
                    }
                    </TableCell>
                  </TableRow>
                );
              }))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </>
  )
}

export default ChefConsole