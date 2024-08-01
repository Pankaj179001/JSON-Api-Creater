import { RemoveListItem } from "@/View/Components/StyledComponent/RemoveItem";
import { Theme } from "@emotion/react";
import { Box, Button, SxProps } from "@mui/material";
import * as React from "react";

interface Selector {
  label: string;
  Value?: string;
  setValue?: string;
  items: { itemName: string; value: string | number; selected?: boolean }[];
  sx?: SxProps<Theme>;
  setDataType: React.Dispatch<React.SetStateAction<string>>;
  dataType?: any;
  displayRemoveIcon?: boolean;
  OnRemove?: (val: unknown) => void | unknown;
  buttonStyle?: React.CSSProperties | undefined;
}

export default function Selector(props: Selector) {
  const {
    label,
    items,
    sx,
    Value,
    setDataType,
    OnRemove,
    displayRemoveIcon,
    buttonStyle,
  } = props;
  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let selected = event?.currentTarget.innerText?.toLowerCase();
    selected == Value ? (selected = "") : ""; //to unselect
    setDataType(selected);
  };
  const selectedButtonCss = {
    backgroundColor: "black",
    color: "white",
  };

  return (
    <Box sx={{ display: "flex", gap: 1, m: 1, alignItems: "center", ...sx }}>
      {label && <>{label} :</>}
      {items?.map((item, index) => {
        const Selected = item?.itemName == Value ? selectedButtonCss : {};
        return (
          <Box key={index} sx={{ position: "relative", margin: "5px" }}>
            <button
              style={{
                width: "max-content",
                padding: 6,
                fontSize: "100%",
                ...Selected,
                ...buttonStyle,
              }}
              type="button"
              value={Value || "object"}
              onClick={handleChange}
            >
              {item?.itemName}
            </button>
            <RemoveListItem
              sx={{ display: displayRemoveIcon === true ? "flex" : "none" }}
              onClick={() => {
                if (OnRemove) {
                  OnRemove(item);
                }
              }}
            >
              x
            </RemoveListItem>
          </Box>
        );
      })}
    </Box>
  );
}
