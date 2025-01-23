import { redirect } from "@sveltejs/kit";


export const load = async ({locals}) => {
    const user = locals.user

    if(!user) {
        throw redirect(302, '/login')
    }

    if(user.kyc_status === 'Verified'){
        throw redirect(302, '/dashboard/account')
    }

    return {
        user
    }
}

export const actions = {
    default: async ({ cookies, request }) => {
        const accessToken = cookies.get('access_token');

        // Extract form data
        const data = await request.formData();
        const full_name = data.get('full_name');
        const date_of_birth = data.get('date_of_birth');
        const address = data.get('address');
        const identification_type = data.get('identification_type');
        const identification_number = data.get('identification_number');

        // Basic validation
        if (!full_name || !date_of_birth || !address || !identification_type || !identification_number) {
            return {
                error: 'All fields are required.',
                values: { full_name, date_of_birth, address, identification_type, identification_number }
            };
        }

        try {
            // Make the POST request to your API
            const res = await fetch('http://localhost:8000/api/kyc/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name,
                    date_of_birth,
                    address,
                    identification_type,
                    identification_number,
                }),
            });

            // Handle response
            if (!res.ok) {
                const errorData = await res.json();
                console.error('API Error:', errorData);
                return {
                    error: 'Failed to submit KYC. Please try again later.',
                    details: errorData,
                };
            }

            // Redirect to the upload documents page
        } catch (error) {
            console.error('Error during KYC submission:', error);
            return {
                error: 'An unexpected error occurred. Please try again later.',
            };
        }
        throw redirect(302, '/kyc/upload_document');
    },
};