
import { redirect } from "@sveltejs/kit";

export async function load({locals, url}) {
    const user = locals.user;

    if(url.pathname === '/validate_mail' && user?.is_verify){
        throw redirect(302,'/')
    }

    if(!user) {
        throw redirect(302, '/login')
    }
}