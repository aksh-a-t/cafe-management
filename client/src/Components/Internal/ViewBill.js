// @ts-nocheck
import { Toolbar, Card, CardActions, Button, TextField, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Tooltip, IconButton, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import axios from "axios";
import Visibility from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';

const ViewBill = () => {
    const [dataList,setDataList]=  useState();
    const [deleteDialog,setDeleteDialog] = useState({
        open:false,
        id:""
    })
    const [viewOpen,setViewOpen] = useState(false);
    const [viewData,setViewData] = useState();
    const alert = useAlert();

    useEffect(()=>{
        let token = localStorage.getItem("token");
        axios.get("http://localhost:5000/api/bill/",{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{
            setDataList(res.data.data);
        })
        .catch((error)=>{
            console.log(error);
            alert.error("Error");
        })
    },[])

    const deleteHandler=()=>{
        let token = localStorage.getItem("token");
        axios.delete(`http://localhost:5000/api/bill/delete/${deleteDialog.id}`,{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{
            setDataList((pre)=>{
                let ans = pre.filter((val)=>val['billId']!==deleteDialog.id)
                return ans;
            })
            setDeleteDialog({open:false,id:""})
            alert.success("Deleted Successfully");
        })
        .catch((error)=>{
            setDeleteDialog({open:false,id:""});
            console.log(error);
            alert.error("Error");
        })
    }
    const closeViewHandler=()=>{
        setViewOpen(false);
        setViewData({});
    }
    const viewHandler=(id)=>{
        let data = dataList.find((val)=>val['billId']===id);
        setViewData(data);
        setViewOpen(true);
        console.log(data);
    }
  return (
    <div>
              <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Create Bill</div>
        </CardActions>
      </Card>
      <Card className="card">
        <CardActions>
          <TextField fullWidth size="small" label="Filter" type="search" />
        </CardActions>
      </Card>
      <Paper className="card">
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Contact</TableCell>
                <TableCell align="center">Total</TableCell>
                {/* <TableCell align="center">Price</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
// @ts-ignore
              dataList&&dataList.map((val, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell align="center">{val["customerName"]}</TableCell>
                    <TableCell align="center">{val["contact"]}</TableCell>
                    <TableCell align="center">{val["totalAmount"]}</TableCell>
                    {/* <TableCell align="center">{val["price"]}</TableCell> */}
                    <TableCell align="center">
                      <ButtonGroup>
                        <Tooltip title="View Details">
                          <IconButton onClick={()=>viewHandler(val['billId'])} >
                            <Visibility sx={{ color: "limegreen" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={()=>setDeleteDialog({open:true,id:val['billId']})}>
                            <DeleteIcon sx={{ color: "limegreen" }} />
                          </IconButton>
                        </Tooltip>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={deleteDialog.open}
        onClose={()=>setDeleteDialog({open:false,id:""})}
      >
        <DialogTitle >
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to Delete Product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDeleteDialog({open:false,id:""})}>Disagree</Button>
          <Button onClick={deleteHandler}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={viewOpen}
        onClose={closeViewHandler}
        sx={{
          "& .MuiDialogContent-root": { padding: "5px 20px" },
          ".MuiDialogTitle-root+.css-ypiqx9-MuiDialogContent-root": {
            paddingTop: "10px  ",
          },
        }}
      >
        <DialogTitle sx={{ background: "limegreen" }}>
        <div style={{display:'flex',justifyContent:"space-between"}}>
            <div>Bill</div>
            <IconButton onClick={closeViewHandler}>
            <CloseIcon/>
            </IconButton>
        </div>
        </DialogTitle>
        <DialogContent>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>
                Name:{viewData&&viewData.customerName}
            </div>
            <div>
                Contact:{viewData&&viewData.contact}
            </div>
        </div>
        </DialogContent>
        <DialogContent>
        <Paper>
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Price</TableCell>
                {/* <TableCell align="center">Price</TableCell> */}
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
// @ts-ignore 
              viewData&&viewData.productDetails&&viewData.productDetails.map((val, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell align="center">{val["product"]}</TableCell>
                    <TableCell align="center">{val["price"]}</TableCell>
                    <TableCell align="center">{val["quantity"]}</TableCell>
                    <TableCell align="center">{val["total"]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

        </DialogContent>
      </Dialog>

    </div>
  )
}

export default ViewBill