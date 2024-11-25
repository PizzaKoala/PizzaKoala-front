import { NextRequest, NextResponse } from "next/server";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     res.redirect("http://localhost:8080/oauth2/authorization/google"); // 백엔드 엔드포인트로 리다이렉트
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

export async function GET(req: NextRequest) {
  // 백엔드로 리다이렉트
  return NextResponse.redirect(
    "http://localhost:8080/oauth2/authorization/google"
  );
}
