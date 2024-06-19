import * as Yup from "yup";
const IgNoreLengthTypes = ["object", "boolean"];
const AllowedTypes = [
  "string",
  "number",
  "array-string",
  "boolean",
  "array-numbers",
  "text-area",
];
type RqdSchema = Yup.NumberSchema | Yup.StringSchema | Yup.BooleanSchema;
const Required = (schema: RqdSchema, name: string) => {
  const msg = name + " is required";
  return schema.required(msg).typeError(msg);
};
const CustomApiSchema = Yup.object().shape({
  is_array: Required(Yup.boolean(), "Is Array"),
  delete_after: Required(
    Yup.number().max(60, "value must be less than 60"),
    "Delete After"
  ),
  recordsToCreate: Yup.number().when("is_array", ([is_array]) => {
    const reqd = Required(Yup.number().min(1).max(100), "Record to Create");
    const Optional = Yup.number()
      .min(1)
      .max(100)
      .typeError("invalid value")
      .nullable();
    return is_array ? reqd : Optional;
  }),
  pagination: Yup.boolean().when("is_array", ([is_array]) => {
    const reqd = Required(Yup.boolean(), "pagination");
    const Optional = Yup.boolean().nullable();
    return is_array ? reqd : Optional;
  }),
});
export default CustomApiSchema;
