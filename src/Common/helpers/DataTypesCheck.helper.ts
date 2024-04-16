export const CheckDataType = (
  dataType: "string" | "number" | "object" | "array" | "boolean"
) => {
  switch (dataType) {
    case "string":
      return [{ field: "max_length", default: 10 }];
    case "array":
      return [
        {
          field: "array_of",
          description: "choose array elements type",
          type: "Select",
          options: [
            [
              { value: "Number" },
              { value: "String" },
              { value: "Boolean" },
              { value: "Object" },
            ],
          ],
          required: true,
        },
        {
          field: "length",
          description: "length of Array",
          type: "Number",
          default: "random_fields",
        },
      ];

    case "object":
      return [
        {
          field: "fields",
          description: "choose object fields",
          type: "Input",
          resursive: true, //to render the default fields again----
          validKeys: 5, //can enter only 5 custom fields for nested object----
        },
      ];
    case "boolean":
    case "number":
    default:
      return;
  }
};
