import { TableRow, TableCell, Skeleton } from "@mui/material";
import React from "react";


const TableRowsLoader = ({ cells }) => {
    return [...Array(4)].map((row, index) => (
      <TableRow key={index}>
      {
        [...Array(cells)].map((val,idx)=>{
            return (
            <TableCell key={idx}>
            <Skeleton animation="wave" variant="text" />
            </TableCell>

            )
        })
      }
      </TableRow>
    ));
};


export default TableRowsLoader;