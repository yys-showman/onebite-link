import { NextRequest, NextResponse } from "next/server";
import { fetchOpenGraphInfo } from "@/lib/og";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "url 쿼리 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json(
      { error: "올바른 URL 형식이 아닙니다." },
      { status: 400 },
    );
  }

  try {
    const info = await fetchOpenGraphInfo(url);
    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "오픈 그래프 정보를 가져오지 못했습니다.",
      },
      { status: 502 },
    );
  }
}
