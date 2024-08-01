import { faker } from "@faker-js/faker";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { connection } from "../utils/(config)/db";
import { EndpointModel, UserModel } from "../utils/(models)";

export async function GET(req: NextApiRequest) {
  try {
    // const { title, description, pagination, data: content } = req?.body ?? {};
    // await connection();

    const fake = {
      first_name: "Corine",
      last_name: "Dicki",
      email: "Vance_McCullough23@gmail.com",
      city: "Charleston",
      image:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/911.jpg",
    };
    // const ApiData = JSON.parse(fake);

    return NextResponse?.json({
      data: fake,
    });
  } catch (error) {
    console.log({ error });
    throw new Error(error + "");
  }
}

export async function POST(req: NextApiRequest) {
  try {
    // const { title, description, pagination, data: content } = req?.body ?? {};
    await connection();
    const username = faker?.person.firstName();
    const user = await new UserModel({ username });
    const data = await user.save();
    const fake = `{
    "first_name":"Corine",
    "last_name":"Dicki",
    "email":"Vance_McCullough23@gmail.com",
    "city":"Charleston",
    "image":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/911.jpg"
  }`;
    const ApiData = JSON.parse(fake);

    const endpoints = await new EndpointModel({
      title: "testing",
      description: "description",
      pagination: false,
      user: data?._id,
      data: JSON.stringify(ApiData),
    });
    endpoints.save();
    // const data = await UserModel.find().populate(["endpoints"]);

    return NextResponse?.json({
      data,
    });
  } catch (error) {
    console.log({ error });
    throw new Error(error + "");
  }
}
