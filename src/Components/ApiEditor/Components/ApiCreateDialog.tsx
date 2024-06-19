import FormDialog from "@/Common/components/DialogBox";
import SelectOptions from "@/Common/components/SelectOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import CustomApiSchema from "../Yup/CustomApiSchema";
const ErrorStyle = {
  color: "red",
  fontSize: "small",
  marginTop: "-10px",
  maxHeight: "4px",
};
const BoolOptns = [
  { label: "No", value: false as any },
  { label: "Yes", value: true as any },
];
const ApiCreateDialog = (props: {
  OpenDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { OpenDialog, setOpenDialog } = props ?? {};
  //-------states-----
  const [IsArray, setIsArray] = React.useState(false);
  const [Pagination, setPagination] = React.useState(false);

  //-----yup use form for custom Api create form---
  const {
    handleSubmit,
    control: CustomApiControl,
    formState: { errors: CustomApiError, isValid },
    setValue: SetApiValue,
    reset: CustomApiReset,
    getValues,
  } = useForm({
    resolver: yupResolver(CustomApiSchema),
    defaultValues: { is_array: false, pagination: false },
    mode: "all",
  });
  const OnCustomApiSubmit = (data: any) => {
    console.log({ data }, "data");
    CustomApiReset({ is_array: false, pagination: false });
    setIsArray(() => false);
    setPagination(() => false);
  };
  console.log({ getValues: getValues(), CustomApiError });
  return (
    <FormDialog
      open={OpenDialog}
      setOpen={setOpenDialog}
      heading={"Select Options"}
      onSubmit={handleSubmit(OnCustomApiSubmit)}
      //   onClose={() => CustomApiReset()}
      buttonDisabled={!isValid}
    >
      <SelectOptions
        name="is_array"
        label={"Is Array"}
        Value={IsArray as unknown as string}
        setValueState={
          setIsArray as unknown as React.Dispatch<React.SetStateAction<string>>
        }
        CustomHandleChange={(_, selected) =>
          SetApiValue("is_array", selected ?? false)
        }
        options={BoolOptns}
      />
      {CustomApiError?.is_array?.message && (
        <span style={ErrorStyle}>{CustomApiError?.is_array.message}</span>
      )}
      <Controller
        control={CustomApiControl}
        name="delete_after"
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
              id="delete_after"
              name="delete_after"
              label="Delete Api After"
              type="number"
              fullWidth
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Days</InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />
            {CustomApiError?.delete_after?.message && (
              <span style={ErrorStyle}>
                {CustomApiError?.delete_after.message}
              </span>
            )}
          </>
        )}
      />
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
            options={BoolOptns}
          />
          {CustomApiError?.pagination?.message && (
            <span style={ErrorStyle}>{CustomApiError?.pagination.message}</span>
          )}
        </>
      )}
      {IsArray && (
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
              {CustomApiError?.recordsToCreate?.message && (
                <span style={ErrorStyle}>
                  {CustomApiError?.recordsToCreate.message}
                </span>
              )}
            </>
          )}
        />
      )}
    </FormDialog>
  );
};

export default ApiCreateDialog;
