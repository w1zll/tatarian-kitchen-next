import { getToken, GetTokenParams } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;

   let params: GetTokenParams = {
      req: request,
      secret: process.env.AUTH_SECRET ?? 'secret',
   };

   if (process.env.NODE_ENV === 'production') {
      params = {
         ...params,
         cookieName: '__Secure-authjs.session-token',
      };
   }
   const token = await getToken(params);
   const protectedRoutes = ['/ingredients', '/recipes/new', '/recipes/:path*'];

   if (
      protectedRoutes.some((route) =>
         pathname.startsWith(route.replace(':path*', ''))
      )
   ) {
      if (!token) {
         const url = new URL('/error', request.url);
         url.searchParams.set('message', 'Недостаточно прав');
         return NextResponse.redirect(url);
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/ingredients', '/recipes/new', '/recipes/:path*'],
};
