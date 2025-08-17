const BASE_URL = "https://api.tvmaze.com";

async function handleJson(res) {
    if(!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status}: ${text || res.statusText}`);
    }
    return res.json();
}

export const searchShows = async (query, { signal } = {}) => {
  const url = `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  return handleJson(res); 
};

export const getShowById = async (id, { signal } = {}) => {
    const url = `${BASE_URL}/shows/${id}`;
    const res = await fetch(url, {signal} );
    return handleJson(res); 
};

