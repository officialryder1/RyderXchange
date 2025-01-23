import { redirect } from "@sveltejs/kit";

export const load = async({ locals }) => {

    const user = locals.user

    if(!user){
        throw redirect(302, '/login')
    }

    if(user.is_verify) {
        throw redirect(302, '/dashboard/account')
    }
}