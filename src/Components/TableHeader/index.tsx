import React from "react";
import { TableCell, TableRow, TableHead } from "@mui/material";

const TableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">
          ID
        </TableCell>
        <TableCell align="center">NAME</TableCell>
        <TableCell align="center">E-MAIL</TableCell>
        <TableCell align="center">GENDER</TableCell>
        <TableCell align="center">STATUS</TableCell>
        <TableCell align="center">DELETE</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
