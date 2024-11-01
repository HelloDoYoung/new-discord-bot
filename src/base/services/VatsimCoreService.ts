// Code referenced from https://vatsim.dev/api/core-api
export class VatsimCoreService {
    async fetchVatsimCore_Community(discord_id:string, options: string): Promise<any> {
        const url = `https://api.vatsim.net/v2/members/${options}/${discord_id}`;

        const response = await fetch(url, {
            method: 'GET',
        });
        
        return await response.json();
    }

    async fetchVatsimCore_Atc(options: string): Promise<any> {
        const url = `https://api.vatsim.net/v2/atc/${options}`;
        
        const response = await fetch(url, {
            method: 'GET',
        });
        
        return await response.json();
    }
}