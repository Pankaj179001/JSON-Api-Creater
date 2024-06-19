import { RemoveListItem } from "@/Components/StyledComponent/RemoveItem";
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
  CustomHandleChange?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any,
    selected: string | undefined
  ) => void;
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
    CustomHandleChange,
  } = props;
  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const text = event?.currentTarget?.innerText;
    let selected = text?.split("(")?.shift()?.toLowerCase();
    CustomHandleChange && CustomHandleChange(event, selected);
    selected == Value && (selected = ""); //to unselect
    setDataType(selected ?? "string");
  };
  const selectedButtonCss = {
    backgroundColor: "black",
    color: "white",
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        m: 1,
        alignItems: "center",
        ...sx,
      }}
    >
      {label && <>{label} :</>}
      {items?.map((item, index) => {
        const Selected = item?.value == Value ? selectedButtonCss : {};
        return (
          <Box key={index} sx={{ position: "relative", margin: "5px" }}>
            <button
              style={{
                width: "max-content",
                padding: 6,
                fontSize: "100%",
                ...buttonStyle,
                ...Selected,
              }}
              type="button"
              value={Value}
              onClick={handleChange}
            >
              {item?.itemName}
            </button>

            {displayRemoveIcon && (
              <RemoveListItem
                sx={{ display: "flex" }}
                onClick={() => {
                  if (OnRemove) {
                    OnRemove(item);
                  }
                }}
              >
                x
              </RemoveListItem>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
