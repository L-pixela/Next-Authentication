import { NextRequest, NextResponse } from 'next/server'
import { getServerAuthSession } from '@/src/lib/auth'

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8000'

type RouteContext = { params: Promise<{ path: string[] }> }

async function buildHeaders(req: NextRequest): Promise<Record<string, string>> {
  const session = await getServerAuthSession()
  const headers: Record<string, string> = {
    'Content-Type': req.headers.get('content-type') ?? 'application/json',
  }
  if (session?.accessToken) {
    headers['Authorization'] = `Bearer ${session.accessToken}`
  }
  return headers
}

async function proxyRequest(req: NextRequest, context: RouteContext): Promise<NextResponse> {
  const { path } = await context.params
  const pathname = path.join('/')
  const search = req.nextUrl.search
  const targetUrl = `${API_BASE_URL}/${pathname}${search}`

  const headers = await buildHeaders(req)
  const body =
    req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined

  try {
    const upstream = await fetch(targetUrl, { method: req.method, headers, body })
    const responseData = await upstream.text()
    return new NextResponse(responseData, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') ?? 'application/json',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Upstream request failed' }, { status: 502 })
  }
}

export async function GET(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context)
}
export async function POST(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context)
}
export async function PUT(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context)
}
export async function DELETE(req: NextRequest, context: RouteContext) {
  return proxyRequest(req, context)
}
