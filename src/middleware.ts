import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // return Response.json(
  //   { success: false, message: "unauthorized" },
  //   { status: 401 }
  // );
  // return true;
}

export const config = {
  // matcher: ["/api/schema/:path*"],
};
