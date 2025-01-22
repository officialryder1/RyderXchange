const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export async function fetchMarketData() {
    try{
        const response = await fetch(`${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkling=false`)
        if(!response.ok){
            throw new Error(`Error fetching market data: ${response.statusText}`)
        }
        return await response.json()
    } catch(error) {
        console.error(`Error:`, error)
        return []
    }
}