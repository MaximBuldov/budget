import { BALANCE_ROUTE } from "@/utils/constants";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.redirect(new URL(BALANCE_ROUTE, req.url));
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!login|api|_next|favicon.ico).*)"],
};
