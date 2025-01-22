import { redirect } from "@sveltejs/kit";
import { fetchMarketData } from "$lib/api.js";
export let prerender = true

export const load = async ({locals}) => {
    async function getUser(){
        const user = locals.user
        

        if(!user) {
            throw redirect(302, '/login')
        }

        return await user
    }

    async function getMarket(){
        const marketData = await fetchMarketData();

        return marketData
    }
    
    return {
        user: await getUser(),
        marketData: await getMarket()
    }
}