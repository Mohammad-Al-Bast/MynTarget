import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target. Publishing content in the Studio calls this so the site
 * updates straight away instead of waiting for the hourly refresh.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new NextResponse("Revalidation is not configured", { status: 500 });

  const { isValidSignature } = await parseBody(req, secret);
  if (!isValidSignature) return new NextResponse("Invalid signature", { status: 401 });

  revalidateTag("sanity", { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
