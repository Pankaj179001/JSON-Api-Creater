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
  return schema.required().typeError(name + " is required");
};
const CustomApiSchema = Yup.object().shape({
  is_array: Required(Yup.boolean(), "Is Array"),
  recordsToCreate: Yup.number().when("is_array", ([is_array], schema) => {
    const reqd = Required(schema.min(1), "Record to Create");
    const Optional = schema.min(1).typeError("invalid value").nullable();
    return is_array ? reqd : Optional;
  }),
  pagination: Yup.boolean().when("is_array", ([is_array], schema) => {
    const reqd = Required(Yup.boolean(), "pagination");
    const Optional = Yup.boolean().nullable();
    return is_array ? reqd : Optional;
  }),
});
export default CustomApiSchema;
