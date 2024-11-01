// Code referenced from https://vatsim.dev/api/core-api
export class VatsimCoreService_ATC {
    async fetchAtc(options: string): Promise<any> {
        const url = `https://api.vatsim.net/v2/atc/${options}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}
