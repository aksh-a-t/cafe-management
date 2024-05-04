// @ts-nocheck
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import React, { useState } from "react";

const TablesInfo = () => {
  const [tableList, setTableList] = useState([
    "M5",
    "D6",
    "F9",
    "I8",
    "T2",
    "R7",
    "X1",
    "G3",
    "L8",
    "K4",
    "P5",
  ]);
  const [infoDialog,setInfoDialog] = useState(false);

  const openDialoge = ()=>{
    setInfoDialog(true)
  }
  return (
    <div>
      <Grid container >
        {[1, 2, 3, 4].map((row, idx) => {
          return (
            <>
              <Grid container item >
                <Grid item></Grid>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col, i) => {
                  return (
                    <>
                      <Grid item sx={{padding:'8px'}}>
                        {tableList[idx * 10 + i] ? (
                          <div className="TableBoxes" onClick={openDialoge} >
                            {tableList[idx * 10 + i]}
                          </div>
                        ) : (
                          <div className="TableBoxes"></div>
                        )}
                      </Grid>
                    </>
                  );
                })}
                <Grid item></Grid>
              </Grid>
            </>
          );
        })}
      </Grid>
      <Dialog
        open={infoDialog}
        onClose={() => setInfoDialog(false)}
      >
        <DialogTitle>{"Table "}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            OTP
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button
            color="neutral"
            onClick={() => setDeleteDialog({ open: false, id: "" })}
          >
            Disagree
          </Button>
          <Button color="neutral" onClick={deleteHandler}>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>

    </div>
  );
};

export default TablesInfo;
