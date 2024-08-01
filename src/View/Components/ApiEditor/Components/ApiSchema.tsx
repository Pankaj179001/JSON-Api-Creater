"use client";

import FormDialog from "@/Common/components/DialogBox";
import SelectOptions from "@/Common/components/SelectOptions";
import Selector from "@/Common/components/Selector";
import { CustomText } from "@/View/Components/StyledComponent/CustomText";
import { useAppDispatch } from "@/feature/Hooks";
import { createApiRecords } from "@/feature/Slices/CreateApiSlice";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
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
  const { ApiTesting, setApiTesting } = props;
  const [OpenDialog, setOpenDialog] = React.useState(false);
  const [SelectedValue, setSelectedValue] = React.useState(false); //set dia
  const dispatch = useAppDispatch();
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
          gap: 2,
          p: 2,
          height: "100%",
          boxShadow: "inset 0 -2em 3em rgb(95 117 95 / 30%)",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <form
          style={{
            boxSizing: "border-box",
            borderRadius: "7px",
            margin: "auto",
          }}
          onSubmit={OnSubmitHandler}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              flexFlow: "column",
              alignItems: "center",
              py: 3,
              textAlign: "center",
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
            <Selector
              label={"Type"}
              items={[
                { itemName: "string", value: "string", selected: true },
                { itemName: "number", value: "number", selected: false },
                // { itemName: "object", value: "object", selected: false },
                // { itemName: "array", value: "array", selected: false },
                { itemName: "boolean", value: "boolean", selected: false },
              ]}
              setDataType={setSelectedDataType}
              Value={SelectedDataType}
              buttonStyle={{ padding: 4 }}
              sx={{
                gap: 0.5,
                // width: "222px",
                display: "grid",
                gridTemplateColumns: "auto auto auto",
              }}
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
            borderRadius: "10px",
          }}
        >
          <Selector
            label={"Your Schema Fields"}
            items={Schema?.map((i) => ({
              itemName: i?.name + `(${i?.dataType})`,
              value: i?.name,
              selected: false,
            }))}
            sx={{
              // width: ApiTesting ? "50%" : "25%",
              p: 0.8,
              gap: 1,
              display: "flex",
              flexWrap: "wrap",
            }}
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
              : toast.error(
                  "please select atleast one schema field to create api"
                );
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
          handleSubmit={(body) => {
            const records = +body?.recordsToCreate;
            const paginate = body?.pagination;
            body["recordsToCreate"] = !isNaN(records) ? records : 0;
            body["pagination"] = Boolean(paginate)
              ? JSON.parse(paginate)
              : false;
            if (records > 50) {
              toast.error("Maximum limit of records to create is 50");
            } else {
              dispatch(
                createApiRecords({
                  data: Schema,
                  config: { ...body, pagination: SelectedValue },
                })
              ).then(() => setOpenDialog(!OpenDialog));
            }
          }}
        >
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
            sx={{ p: 0 }}
          />

          <SelectOptions
            label={"Pagination Required"}
            Value={SelectedValue as unknown as string}
            setValue={
              setSelectedValue as unknown as React.Dispatch<
                React.SetStateAction<string>
              >
            }
            name="pagination"
            options={[
              { label: "false", value: false as any },
              { label: "true", value: true as any },
            ]}
          />
        </FormDialog>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ApiSchema;
