"use client";
import Selector from "@/Common/components/Selector";
import { CustomText } from "@/Pages/StyledComponent/CustomText";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import "./card.css";
interface IField {
  id?: string;
  name: string;
  dataType: string;
  maxLength: string;
}
interface CardProps {
  ApiTesting: boolean;
  setApiTesting: React.Dispatch<React.SetStateAction<boolean>>;
}
const ApiSchema = (props: CardProps) => {
  const id = React.useId();
  const { ApiTesting, setApiTesting } = props;
  const [SelectedSchema, setSelectedSchema] = React.useState("");
  const [SelectedDataType, setSelectedDataType] = React.useState("");
  const InitialField: IField = {
    name: ``,
    dataType: ``,
    maxLength: ``,
  };
  const [Field, setField] = React.useState<IField>(InitialField);
  const [Schema, setSchema] = React.useState<Array<IField>>([]);
  const OnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setField((pre) => ({
      ...pre,
      [name]: value?.split(" ").join("_"),
    }));
  };

  useEffect(() => {
    setField((pre) => ({ ...pre, dataType: SelectedDataType }));
  }, [SelectedDataType]);

  useEffect(() => {
    const SelectedField = SelectedSchema?.split(/["(",")"]/).slice(0, 2);
    const item = Schema.find(({ name }) => name == SelectedField[0]);
    setField((pre) => ({ ...pre, ...item }));
    if (item) {
      setSelectedDataType(() => item?.dataType);
    }
  }, [SelectedSchema]);

  const OnSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSchema((prev) => {
      const IsKeyRepeated = Schema.findIndex(
        ({ name }) => name === Field?.name
      );
      if (IsKeyRepeated !== -1) {
        const PrevData = [...prev];
        PrevData[IsKeyRepeated] = Object.assign(PrevData[IsKeyRepeated], Field);
        return PrevData;
      } else {
        return [...prev, { ...Field }];
      }
    });
    setField(() => InitialField);
    setSelectedDataType(() => ``);
  };
  return (
    <Box className="card1" gap={1}>
      <CustomText variant="h4">Free API Editor</CustomText>
      <CustomText variant="h6">Create Your Schema For Fake Data</CustomText>

      <Box
        sx={{
          display: "flex",
          m: "auto",
          width: "100%",
          mt: 5,
          gap: 1,
          p: 2,
          height: "100%",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <form style={{ width: "45%" }} onSubmit={OnSubmitHandler}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              flexFlow: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Field Name"
              name="name"
              value={Field.name}
              onChange={OnChangeHandler}
              variant="outlined"
              size="small"
            />

            <TextField
              label="Max-length"
              type="number"
              name="maxLength"
              onChange={OnChangeHandler}
              value={Field.maxLength}
              variant="outlined"
              size="small"
            />
            <Box sx={{ m: "auto" }}>
              <Selector
                label={"Type"}
                items={[
                  { itemName: "string", value: "string", selected: true },
                  { itemName: "number", value: "number", selected: false },
                  { itemName: "object", value: "object", selected: false },
                  { itemName: "array", value: "array", selected: false },
                  { itemName: "boolean", value: "boolean", selected: false },
                ]}
                setDataType={setSelectedDataType}
                Value={SelectedDataType}
                buttonStyle={{ padding: 2 }}
                sx={{
                  gap: 0,
                  width: "222px",
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={
                !Field?.name?.trim() ||
                !Field?.dataType?.trim() ||
                !Field?.maxLength
              }
            >
              Add Field
            </Button>
          </Box>
        </form>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            // border: "2px solid black",
            minHeight: "200px",
          }}
        >
          <Selector
            label={"Your Schema Fields"}
            items={Schema?.map((i) => ({
              itemName: i?.name + `(${i?.dataType})`,
              value: i?.name,
              selected: false,
            }))}
            sx={{ width: ApiTesting ? "50%" : "25%", p: 0.5 }}
            setDataType={setSelectedSchema}
            displayRemoveIcon={true}
            Value={SelectedSchema}
            OnRemove={(val: any) => {
              const Fieldname = val?.itemName?.split("(")[0];
              setSchema((prev) => {
                return [...prev].filter(({ name }) => name !== Fieldname);
              });
            }}
          />
        </Box>
      </Box>
      <div style={{ display: "flex" }}>
        <button type="button">Create API</button>
        {/* <button style={{ marginLeft: "20px", cursor: "auto" }}>
            Create API
          </button> */}
        <div
          style={{
            display: "flex",
            margin: "auto",
            gap: 7,
            marginLeft: 23,
          }}
        >
          <p> Test Your API</p>
          <label className="toggle-btn">
            {/* <label htmlFor="checkbox">Test Api</label> */}
            <input type="checkbox" onClick={() => setApiTesting(!ApiTesting)} />
            <div className="slider"></div>
          </label>
        </div>
      </div>
    </Box>
  );
};

export default ApiSchema;
