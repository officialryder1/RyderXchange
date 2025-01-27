import { isTokenExpire } from '$lib/tokenUtil'
import { sequence } from '@sveltejs/kit/hooks'


const firstHandle = async ({event, resolve}) => {
	const accessToken = event.cookies.get(
		'access_token'
	)
	

	if(accessToken && !isTokenExpire(accessToken)) {
		try{
			const res = await fetch(`http://localhost:8000/api/auth/token/?token=${encodeURIComponent(accessToken)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			

			if (res.ok) {
				event.locals.user = await res.json()

			} else {
				console.error(`API response error: ${res.statusText}`)
			}
		} catch(err){
			console.error("Invalid token", err.message)
		}
	}else {
		event.cookies.delete('access_token', {path: '/', secure: true})
		event.cookies.delete('refresh_token', {path: '/', secure: true})
	}

	const response = await resolve(event)

	return response
}

export const handle = sequence(firstHandle)