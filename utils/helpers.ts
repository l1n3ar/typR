import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";

export async function currentUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return response(false, null, "You must be logged in.", "You must be logged in.")
  }
 return response(true, session, "User retrieved successfully", "User retrieved successfully")
}


export function response(success: boolean, data: any, clientMsg: string, devMsg: string) {
  return NextResponse.json({
    success,
    data,
    clientMsg,
    devMsg
  });
}