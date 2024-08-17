import nookies from 'nookies';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    nookies.destroy(null, 'access_token');

    return NextResponse.json({ status: 200, message: 'Signout done.........' });
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Something went wrong!' });
  }
}
