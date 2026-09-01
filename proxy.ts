import { NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  const { auth } = await import("@/lib/auth/server");
  return auth.middleware({ loginUrl: "/auth/signi-in" })(req);
}
