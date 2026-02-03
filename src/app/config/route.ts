import { NextResponse } from "next/server";
import { CONFIG } from "@/lib/config/index";

export async function GET() {
  return NextResponse.json({
    env: CONFIG.getEnv(),
    appUrl: CONFIG.getAppUrl(),
    graphqlEndpoint: CONFIG.getGraphqlEndpoint(),
    graphqlWsEndpoint: CONFIG.getGraphqlWsEndpoint(),
    apiEndpoint: CONFIG.getApiEndpoint(),
  });
}

export function POST() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export function PUT() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export function DELETE() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
