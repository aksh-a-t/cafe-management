// @ts-nocheck
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import { useAlert } from "react-alert";
import { Endpoint } from "../../Services/endpoints";
import TableSkeleton from "../../SubComponents/TableSkeleton"
const Category = () => {
  const [dataList, setDataList] = useState([]);
  const [createDialog, setCreateDialog] = useState(false);
  const [categoryVal, setCategoryVal] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [editVal, setEditVal] = useState({
    value: "",
    id: "",
  });
  const alert = useAlert();
  const endpoints = new Endpoint();

  useEffect(() => {
    const getCategories = async () => {
      let response = await endpoints.getCategories();
      if (response !== endpoints.ErrorCode) {
        setDataList(response);
      }
    };
    getCategories();
  }, []);
  const handleEdit = (id, value) => {
    setEditVal((pre) => {
      return {
        value: value,
        id: id,
      };
    });
    setEditDialog(true);
    console.log(editVal);
  };
  const createAgree = async () => {
    if (categoryVal) {
      let response = await endpoints.createCategory({ category: categoryVal });
      if (response !== endpoints.ErrorCode) {
        setDataList((pre) => [response, ...pre]);
        alert.success("Category Created");
        setCreateDialog(false);
        setCategoryVal("");
      }
    } else {
      setCreateDialog(false);
      alert.error("Enter Category");
    }
  };
  const agreeEdit = async () => {
    let response = await endpoints.updateCategory({
      id: editVal.id,
      category: editVal.value,
    });
    if (response !== endpoints.ErrorCode) {
      setDataList((pre) => {
        let ans = pre.map((val) => {
          if (val["id"] === editVal.id) {
            return { category: editVal.value, id: editVal.id };
          }
          return val;
        });
        console.log(ans);
        return ans;
      });

      setEditDialog(false);
      alert.success("Category updated");
    }
  };
  return (
    <>
      <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Manage Categories</div>
          <Button className="button" onClick={() => setCreateDialog(true)}>
            Add Category
          </Button>
        </CardActions>
      </Card>
      <Card className="card">
        <CardActions>
          <TextField
            id="filter"
            fullWidth
            size="small"
            label="Filter"
            type="search"
          />
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
                  Category
                </TableCell>
                <TableCell align="center" className="backLime">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.length>0 ? (dataList.map((val, i) => {
                return (
                  <TableRow hover role="checkbox"  key={i}>
                    <TableCell align="center">{val["category"]}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="neutral"
                        onClick={() => handleEdit(val["id"], val["category"])}
                      >
                        <EditIcon color="neutral" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })):(
                <TableSkeleton cells={2}/>
              )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* </div> */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={createDialog}
        onClose={() => setCreateDialog(false)}
      >
        <DialogTitle sx={{ background: "limegreen" }}>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            color="neutral"
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={categoryVal}
            onChange={(e) => setCategoryVal(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="neutral" onClick={() => setCreateDialog(false)}>
            Cancel
          </Button>
          <Button color="neutral" onClick={createAgree}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={editDialog}
        onClose={() => setEditDialog(false)}
      >
        <DialogTitle sx={{ background: "limegreen" }}>
          Edit Category
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            color="neutral"
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={editVal.value}
            onChange={(e) =>
              setEditVal((pre) => {
                return {
                  ...pre,
                  value: e.target.value,
                };
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button color="neutral" onClick={() => setEditDialog(false)}>
            Cancel
          </Button>
          <Button color="neutral" onClick={agreeEdit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Category;
