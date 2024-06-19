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

const CustomFieldSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  dataType: Yup.string().required("Data Type is required").oneOf(AllowedTypes),
  maxLength: Yup.number()
    .typeError("Maximum length is required")
    .when("dataType", ([dataType], schema) => {
      const MaxLength = {
        string: [3, 20],
        number: [1, 5],
        "array-string": [1, 10],
        "array-numbers": [1, 10],
        "text-area": [20, 150],
      } as Record<string, [number, number]>;
      const [Min, Max] = MaxLength[(dataType as string) ?? "string"] ?? [];
      const IgnorLength = Yup.number()
        .typeError("Max Length is required")
        .required("Max Length is required")
        .positive("Max Length must be a positive number")
        .min(Min ?? 1)
        .max(Max ?? 20);
      return !IgNoreLengthTypes?.includes(dataType)
        ? IgnorLength
        : schema.nullable();
    }),
});
export default CustomFieldSchema;
