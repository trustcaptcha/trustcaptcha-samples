const apiService = {
    postApi: async (verificationToken) => {
        const url = 'http://localhost:8080/api/example';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verificationToken }),
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error posting data', error);
            throw error;
        }
    },
};

export default apiService;