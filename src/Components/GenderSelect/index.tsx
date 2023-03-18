import React from "react";

import {
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const GenderSelect = ({ setGender, gender }: any) => {
  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='gender-select-label'>Gender</InputLabel>
        <Select
          labelId='gender-select-label'
          id='gender-select'
          value={gender}
          label='Gender'
          onChange={handleChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default GenderSelect;
