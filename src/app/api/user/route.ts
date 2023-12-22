import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { connection } from "../(config)/db";
import { UserModel } from "../(models)";

export async function GET(req:NextApiRequest,res:NextApiResponse) {
    await connection()
    // console.log("GET REQUEST");
   const data =await UserModel.find()
    return NextResponse.json({      type: "GET REQUEST",
      data,
    });
}     