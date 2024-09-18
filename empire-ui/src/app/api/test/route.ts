import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  return new NextResponse("test", { status: 200 });
}
