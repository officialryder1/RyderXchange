import { redirect } from "@sveltejs/kit";


export const actions = {
    default: async({cookies, request}) => {

        const access_token = cookies.get('access_token')

        const data = await request.formData()
        const id_document = data.get('document')

        
        if(!id_document) {
            return {
                error: 'Please select a document image'
            }
        }

        try{
            const formData = new FormData()
            formData.append('id_document', id_document)

            const res = await fetch('http://localhost:8000/api/kyc/upload_document/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                body: formData,
            })

            if(!res.ok){
                const msg = await res.json()
                console.error(msg)
                return {
                    error: msg.detail || 'Failed to upload document'
                }
            }

            // if(res.ok){
            //    return {
            //         success: "submitted successfully"
            //    }
            // }
            
        } catch(err) {
            console.log(err)
            return {
                error: 'An unexpected error occurred. Please try again later.'
            }
        }

        throw redirect(302, '/dashboard/account')
    }    
};