"use client";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SxProps } from "@mui/material";
import { Theme } from "@emotion/react";

interface Selector {
  label: string;
  Value?: string;
  setValue?: string;
  items: { itemName: string; value: string | number }[];
  sx?: SxProps<Theme>;
}

export default function Selector(props: Selector) {
  const { label, items, sx } = props;
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, ...sx }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label={label}
        onChange={handleChange}
      >
        {/* <MenuItem disabled value="">
          <em>None</em>
        </MenuItem> */}
        {items?.map((item, index) => {
          return (
            <MenuItem key={index} value={item?.value}>
              {item?.itemName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
