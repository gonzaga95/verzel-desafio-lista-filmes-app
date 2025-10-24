const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_AUTH_TOKEN = process.env.TMDB_BEARER_TOKEN;

const tmdbAxios = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TMDB_AUTH_TOKEN}`
    },
});

async function searchMovies(query) {
    if (!query) {
        return { results: [] };
    }
    try {
        const response = await tmdbAxios.get('/search/movie', {
            params: {
                query: query,
                language: 'pt-BR',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error.message);
        throw new Error('Falha ao comunicar com o TMDB');
    }
}

module.exports = {
    searchMovies,
};


