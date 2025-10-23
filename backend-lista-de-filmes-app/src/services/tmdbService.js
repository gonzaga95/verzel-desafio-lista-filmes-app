const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function searchMovies(query) {
    if (!query) {
        return { results: [] };
    }
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
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


