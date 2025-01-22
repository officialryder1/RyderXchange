import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
    cookies.delete('access_token', {path: '/'})
    cookies.delete('refresh_token', {path: '/'})

    throw redirect(302, '/login')
}