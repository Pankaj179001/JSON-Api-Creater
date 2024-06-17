"use client";

import FormDialog from "@/Common/components/DialogBox";
import SelectOptions from "@/Common/components/SelectOptions";
import Selector from "@/Common/components/Selector";
import { CustomText } from "@/Components/StyledComponent/CustomText";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
interface IField {
  id?: string;
  name: string;
  dataType: string;
  maxLength: number;
}
interface CardProps {
  ApiTesting: boolean;
  setApiTesting: React.Dispatch<React.SetStateAction<boolean>>;
}
const ApiSchema = (props: CardProps) => {
  const { ApiTesting, setApiTesting } = props;
  const [OpenDialog, setOpenDialog] = React.useState(false);
  const [SelectedValue, setSelectedValue] = React.useState(false); //set dia

  const [SelectedSchema, setSelectedSchema] = React.useState("");
  const [SelectedDataType, setSelectedDataType] = React.useState("string");
  const InitialField: IField = {
    name: ``,
    dataType: ``,
    maxLength: 5,
  };
  const IgNoreLengthTypes = ["object", "array", "boolean"];

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
    const item = Schema.find(
      ({ name }) => name?.toLowerCase() == SelectedField[0]
    );
    setField((pre) => ({ ...pre, ...item }));
    if (item) {
      setSelectedDataType(() => item?.dataType);
    }
  }, [Schema, SelectedSchema]);

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
            <Box sx={{ m: "auto" }}>
              <Selector
                label={"Field Type"}
                items={[
                  { itemName: "String", value: "string", selected: true },
                  { itemName: "Number", value: "number", selected: false },
                  {
                    itemName: "Array-String",
                    value: "array-string",
                    selected: false,
                  },

                  { itemName: "Boolean", value: "boolean", selected: false },
                  {
                    itemName: "Array-Numbers",
                    value: "array-numbers",
                    selected: false,
                  },
                  {
                    itemName: "Text Area",
                    value: "text_area",
                    selected: false,
                  },
                ]}
                setDataType={setSelectedDataType}
                Value={SelectedDataType}
                buttonStyle={{ padding: 3 }}
                sx={{
                  gap: 0,
                  width: "222px",
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                }}
              />
            </Box>
            {!IgNoreLengthTypes?.includes(SelectedDataType) && (
              <TextField
                label="Max-length"
                type="number"
                disabled={IgNoreLengthTypes?.includes(SelectedDataType)}
                name="maxLength"
                onChange={OnChangeHandler}
                value={Field.maxLength ?? 5}
                variant="outlined"
                size="small"
              />
            )}
            {/* {SelectedDataType == "array" && (
              <Box sx={{ m: "auto" }}>
                <Selector
                  label={"Select Sub Type"}
                  items={[
                    { itemName: "string", value: "string", selected: true },
                    { itemName: "number", value: "number", selected: false },
                  ]}
                  setDataType={setSelectedDataType}
                  Value={SelectedDataType}
                  buttonStyle={{ padding: 4 }}
                  sx={{
                    gap: 0,
                    width: "222px",
                    display: "grid",
                    gridTemplateColumns: "auto auto auto",
                  }}
                />
              </Box>
            )} */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={!Field?.name?.trim() || !Field?.dataType?.trim()}
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
            sx={{ width: "100%", p: 0.5 }}
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
        <button
          onClick={() => {
            Schema?.length
              ? setOpenDialog((pre) => !pre)
              : window.alert("please select atleast one field to create api");
          }}
          type="button"
        >
          Create API
        </button>
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
      {OpenDialog ? (
        <FormDialog
          open={OpenDialog}
          setOpen={setOpenDialog}
          heading={"Select Options"}
        >
          <SelectOptions
            label={"Is Array"}
            Value={SelectedValue as unknown as string}
            setValueState={
              setSelectedValue as unknown as React.Dispatch<
                React.SetStateAction<string>
              >
            }
            options={[
              { label: "false", value: false as any },
              { label: "true", value: true as any },
            ]}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="recordsToCreate"
            name="recordsToCreate"
            label="Number of records to Create"
            type="number"
            fullWidth
            variant="standard"
          />{" "}
          <TextField
            autoFocus
            required
            margin="dense"
            id="recordsToCreate"
            name="recordsToCreate"
            label="Number of records to Create"
            type="number"
            fullWidth
            variant="standard"
          />
          {/* <SelectOptions
            label={"Pagination Required"}
            Value={SelectedValue as unknown as string}
            setValueState={
              setSelectedValue as unknown as React.Dispatch<
                React.SetStateAction<string>
              >
            }
            options={[
              { label: "false", value: false as any },
              { label: "true", value: true as any },
            ]}
          /> */}
        </FormDialog>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ApiSchema;
