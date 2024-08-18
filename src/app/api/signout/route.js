import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.json({
    message: "Signout successful !",
    status: 200,
  });

  res.cookies.set("access_token", "", {
    expires: new Date(0),
  });

  return res;
}
