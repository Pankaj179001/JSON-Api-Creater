import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SxProps, Theme } from "@mui/material";

export default function SelectOptions<T extends string | undefined>({
  label,
  Value,
  setValue,
  options,
  variant,
  sx,
}: {
  label: string;
  Value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  options: { label: string; value: T }[];
  sx?: SxProps<Theme> | undefined;
  variant?: "filled" | "outlined" | "standard" | undefined;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as T);
  };

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Value as string}
          label={label}
          onChange={handleChange}
          variant={variant || "standard"}
        >
          {options?.map(({ label, value }, i) => {
            return (
              <MenuItem key={i} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
