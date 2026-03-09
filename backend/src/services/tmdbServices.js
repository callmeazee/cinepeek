const axios = require('axios')

const BASE_URL = process.env.TMDB_BASE_URL
const API_KEY = process.env.TMDB_API_KEY

const fetchFromTMDB = async (endpoint) => {
     try {
          const response = await axios.get(`${BASE_URL}${endpoint}`, {
               params: {
                    api_key: API_KEY
               }
          })
          return response.data
          
     } catch (error) {
          console.error("TMDB API Error", error.message)
          throw error
     }
}

module.exports = fetchFromTMDB