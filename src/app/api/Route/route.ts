import { NextApiRequest } from "next";
import { connection } from "../utils/(config)/db";
import { UserModel } from "../utils/(models)";
import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import { EndpointModel } from "../utils/(models)";
import { ContentModel, contentType } from "../utils/(models)";

export async function GET(req: NextApiRequest) {
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
    const Isarray = Array.isArray(ApiData);
    const content_type = Isarray
      ? contentType?.ARRAY
      : typeof ApiData == "object"
      ? contentType?.OBJECT
      : contentType?.STRING;
    //create content----
    const Content = await new ContentModel({
      data: fake,
      contentType: content_type,
    });
    const SavedContent = await Content.save();

    const endpoints = await new EndpointModel({
      title: "testing",
      description: "description",
      pagination: false,
      user: data?._id,
      content: SavedContent?._id,
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
