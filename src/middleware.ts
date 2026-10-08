import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/resume(.*)',
    '/api/resumes(.*)',
    '/api/user(.*)',
    '/api/payment/create-order(.*)',
    '/api/payment/verify(.*)',
    // NOTE: /api/payment/webhook is intentionally excluded — CCAvenue calls it
    // server-to-server without a Clerk session.
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
