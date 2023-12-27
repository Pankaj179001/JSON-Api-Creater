import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../utils/(config)/db";
import { UserModel } from "../utils/(models)";
import { NextResponse } from "next/server";

export async function GET(req:NextApiRequest) {
    await connection()
   const data =await UserModel.find()

    return NextResponse?.json({data})
}     