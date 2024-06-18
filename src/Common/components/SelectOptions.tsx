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
  setValueState,
  options,
  variant,
  sx,
  name,
  CustomHandleChange,
}: {
  label: string;
  name?: string;
  Value: T;
  setValueState: React.Dispatch<React.SetStateAction<T>>;
  options: { label: string; value: T }[];
  sx?: SxProps<Theme> | undefined;
  variant?: "filled" | "outlined" | "standard" | undefined;
  CustomHandleChange?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any,
    selected: any
  ) => void;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setValueState(event.target.value as T);
    CustomHandleChange && CustomHandleChange(event, event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{ mt: 1, ml: -1.8 }}
          color="primary"
          id="demo-simple-select-label"
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Value as string}
          name={name}
          label={label}
          slotProps={{ input: { color: "primary.main" } }}
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
