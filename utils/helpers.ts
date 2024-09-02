import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";


export async function currentUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
   return null
  }
return session.user
}




export function response(success: boolean, data: any, clientMsg: string, devMsg: string,status : number = 200) {
  return NextResponse.json({
    success,
    data,
    clientMsg,
    devMsg
  },{
    status
  });
}