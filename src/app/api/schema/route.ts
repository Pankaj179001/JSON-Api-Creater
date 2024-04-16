import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";
import { UserModel } from "../utils/(models)";

export async function POST(req: Request) {
  try {
    const { data } = await req?.json();
    console.log(data, "data", req?.url);
    const { json } = NextResponse;
    return json(
      {
        message: "success",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export function ReturnSampleArray(size = 5) {
  const array = Array.from(new Array(size), (d, index) => {
    return {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      image: faker.image.avatar(),
    };
  });
  let SampleArray = JSON.stringify(array);
  let indentation = 0;
  let result = "";

  for (let i = 0; i < SampleArray.length; i++) {
    const char = SampleArray[i];

    if (char === "[" || char === "{") {
      // Increase the indentation level and add a line break
      indentation++;
      result += char + "\n" + "  ".repeat(indentation);
    } else if (char === "]" || char === "}") {
      // Decrease the indentation level and add a line break
      indentation--;
      result += "\n" + "  ".repeat(indentation) + char;
    } else if (char === ",") {
      // Add a line break after a comma
      result += char + "\n" + "  ".repeat(indentation);
    } else {
      // Add the character to the result
      result += char;
    }
  }
  return (SampleArray = result);
}

function DataTypeRule(type: string, length: number) {
  switch (type) {
    case "string":
      return length > 20 ? "string maximum length can not be more than 20" : "";
    case "number":
      return length > 8 ? "number maximum length can not be more than 8" : "";
    case "boolean":
    default:
      return "";
  }
}
