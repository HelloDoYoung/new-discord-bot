export class AvwxService {
    private readonly token: string;

    constructor() {
        this.token = require('../../../data/config.json').avwx_token;
        if (!this.token) {
            throw new Error('avwx_token is not defined in environment variables');
        }
    }

    async fetchMetar(icao: string, options: string[] = []): Promise<any> {
        const optionsParam = options.length > 0 ? `?options=${options.join(',')}` : '';
        const url = `https://avwx.rest/api/metar/${icao}${optionsParam}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': this.token
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching METAR:', error);
            throw error;
        }
    }

    async fetchTaf(icao: string, options: string[] = []): Promise<any> {
        const optionsParam = options.length > 0 ? `?options=${options.join(',')}` : '';
        const url = `https://avwx.rest/api/taf/${icao}${optionsParam}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': this.token
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching METAR:', error);
            throw error;
        }
    }
}
