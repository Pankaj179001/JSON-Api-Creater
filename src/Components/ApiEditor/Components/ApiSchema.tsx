"use client";

import FormDialog from "@/Common/components/DialogBox";
import SelectOptions from "@/Common/components/SelectOptions";
import Selector from "@/Common/components/Selector";
import { CustomText } from "@/Components/StyledComponent/CustomText";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomFieldSchema from "../Yup/CustomFieldSchema";
import CustomApiSchema from "../Yup/CustomApiSchema";
const ErrorStyle = {
  color: "red",
  fontSize: "small",
  marginTop: "-10px",
  maxHeight: "4px",
};
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
  //------props-------
  const { ApiTesting, setApiTesting } = props;

  //-----yup use form for custom field form---
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(CustomFieldSchema),
    defaultValues: { maxLength: 5, dataType: "string" },
    mode: "onChange",
  });

  //-----yup use form for custom Api create form---
  const {
    handleSubmit: CustomApiSubmit,
    control: CustomApiControl,
    formState: {
      errors: CustomApiError,
      // isDirty: isCustomApiDirty,
      isValid: IsCustomApiValid,
    },
    setValue: SetApiValue,
    reset: CustomApiReset,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(CustomApiSchema),
    defaultValues: { is_array: false, pagination: false, recordsToCreate: 1 },
    mode: "onChange",
  });
  const IsArrayField = watch("is_array");
  //-----------states--------------
  const [OpenDialog, setOpenDialog] = React.useState(false);
  const [IsArray, setIsArray] = React.useState(false);
  const [Pagination, setPagination] = React.useState(false);
  const [SelectedSchema, setSelectedSchema] = React.useState("");
  const [SelectedDataType, setSelectedDataType] = React.useState("string");
  const [Schema, setSchema] = React.useState<Array<IField>>([]);

  const IgNoreLengthTypes = ["object", "array", "boolean"];

  //------use effects----
  useEffect(() => {
    setValue("dataType", SelectedDataType);
  }, [SelectedDataType, setValue]);

  useEffect(() => {
    const SelectedField = SelectedSchema?.split(/["(",")"]/).slice(0, 2);
    const Existingitem = Schema.find(
      ({ name }) => name?.toLowerCase() == SelectedField[0]
    );
    if (Existingitem) {
      setValue("name", Existingitem?.name);
      setValue("maxLength", Existingitem?.maxLength);
      setSelectedDataType(() => Existingitem?.dataType);
    }
  }, [Schema, SelectedSchema, setValue]);

  //---use effect for custom api---
  useEffect(() => {
    if (!IsArrayField) {
      SetApiValue("pagination", false);
      SetApiValue("recordsToCreate", 1);
    }
  }, [IsArrayField, SetApiValue]);

  //-------submit handler------
  const OnSubmitHandler = (data: any) => {
    setSchema((prev) => {
      const IsKeyRepeated = Schema.findIndex(({ name }) => name === data?.name);
      if (IsKeyRepeated !== -1) {
        const PrevData = [...prev];
        PrevData[IsKeyRepeated] = Object.assign(PrevData[IsKeyRepeated], data);
        return PrevData;
      } else {
        return [...prev, { ...data }];
      }
    });
    setSelectedDataType(() => `string`);
    reset({ maxLength: 5, dataType: SelectedDataType, name: "" });
  };

  const OnCustomApiSubmit = (data: any) => {
    console.log({ data }, "data");
    setIsArray(() => false);
    setPagination(() => false);
    CustomApiReset({ is_array: false, pagination: false, recordsToCreate: 1 });
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
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <form style={{ width: "45%" }} onSubmit={handleSubmit(OnSubmitHandler)}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              flexFlow: "column",
              alignItems: "center",
              py: 3,
              textAlign: "center",
            }}
          >
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched
                    label="Field Name"
                    value={value?.split(" ").join("_")}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    ref={ref}
                  />
                  {errors?.name?.message && (
                    <span style={ErrorStyle}>{errors?.name.message}</span>
                  )}
                </>
              )}
            />

            <Box sx={{ m: "auto" }}>
              <Selector
                label={"Field Type"}
                items={[
                  { itemName: "String", value: "string" },
                  { itemName: "Number", value: "number" },
                  {
                    itemName: "Array-String",
                    value: "array-string",
                  },

                  { itemName: "Boolean", value: "boolean" },
                  {
                    itemName: "Array-Numbers",
                    value: "array-numbers",
                  },
                  {
                    itemName: "Text-Area",
                    value: "text-area",
                  },
                ]}
                setDataType={setSelectedDataType}
                Value={SelectedDataType || "string"}
                buttonStyle={{ padding: 3 }}
                sx={{
                  gap: 0,
                  width: "222px",
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                }}
                CustomHandleChange={(_, selected) =>
                  setValue("dataType", selected ?? "string")
                }
              />
              {errors?.dataType?.message && (
                <span style={ErrorStyle}>{errors?.dataType.message}</span>
              )}
            </Box>
            {!IgNoreLengthTypes?.includes(SelectedDataType) && (
              <Controller
                control={control}
                name="maxLength"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <>
                    <TextField
                      label="Max-length"
                      onChange={onChange} // send value to hook form
                      onBlur={onBlur} // notify when input is touched
                      type="number"
                      disabled={IgNoreLengthTypes?.includes(SelectedDataType)}
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      size="small"
                      ref={ref}
                    />
                    {errors?.maxLength?.message && (
                      <span style={ErrorStyle}>
                        {errors?.maxLength?.message}
                      </span>
                    )}
                  </>
                )}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={!isDirty || !isValid}
              // disabled={!Field?.name?.trim() || !Field?.dataType?.trim()}
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
          onSubmit={CustomApiSubmit(OnCustomApiSubmit)}
          buttonDisabled={false}
          onClose={() => CustomApiReset()}
        >
          <SelectOptions
            name="is_array"
            label={"Is Array"}
            Value={IsArray as unknown as string}
            setValueState={
              setIsArray as unknown as React.Dispatch<
                React.SetStateAction<string>
              >
            }
            CustomHandleChange={(_, selected) =>
              SetApiValue("is_array", selected ?? false)
            }
            options={[
              { label: "No", value: false as any },
              { label: "Yes", value: true as any },
            ]}
          />{" "}
          {CustomApiError?.is_array?.message && (
            <span style={ErrorStyle}>{CustomApiError?.is_array.message}</span>
          )}
          {IsArray && (
            <>
              <SelectOptions
                name="pagination"
                label={"Pagination required"}
                Value={Pagination as unknown as string}
                setValueState={
                  setPagination as unknown as React.Dispatch<
                    React.SetStateAction<string>
                  >
                }
                CustomHandleChange={(_, selected) =>
                  SetApiValue("pagination", selected ?? false)
                }
                options={[
                  { label: "No", value: false as any },
                  { label: "Yes", value: true as any },
                ]}
              />
              {CustomApiError?.pagination?.message && (
                <span style={ErrorStyle}>
                  {CustomApiError?.pagination.message}
                </span>
              )}
            </>
          )}
          {IsArray && (
            <>
              <Controller
                control={CustomApiControl}
                name="recordsToCreate"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <>
                    <TextField
                      onChange={onChange}
                      onBlur={onBlur}
                      ref={ref}
                      value={value}
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
                    {errors?.name?.message && (
                      <span style={ErrorStyle}>{errors?.name.message}</span>
                    )}
                  </>
                )}
              />

              {CustomApiError?.recordsToCreate?.message && (
                <span style={ErrorStyle}>
                  {CustomApiError?.recordsToCreate.message}
                </span>
              )}
            </>
          )}
        </FormDialog>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ApiSchema;
