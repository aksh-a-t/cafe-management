// @ts-nocheck
import { Toolbar, Card, CardActions, Paper, CardContent, Grid, TextField, Button } from "@mui/material";
import React, {useState} from "react";
import { useAlert } from "react-alert";
import { Endpoint } from "../../../Services/endpoints";
import { useNavigate } from "react-router-dom";

const CreateTable = () => {
  const[table,setTable] = useState("");
  const alert = useAlert();
  const navigate = useNavigate();
  const endpoints = new Endpoint();

  const createTable = async() => {
    if(!table){
      alert.error("Please enter Table Name");
    }else{
      let response = await endpoints.createTable({table});
      if(response!==endpoints.ErrorCode){
        navigate("/internal/support");
      }
    }
  }
  return (
    <>
      <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Create Table</div>
        </CardActions>
      </Card>
      <Card className="card">
        {/* <CardActions> */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <TextField
                fullWidth
                size="small"
                onChange={(e)=>setTable(e.target.value)}
                value={table}
                name="tableName"
                required
                id="outlined-required"
                label="Table Name"
                color="neutral"
                type="text"
              />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2} />
                  <Grid item xs={2}>
                    <Button
                      onClick={createTable}
                      color="neutral"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={8} />

          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateTable;
