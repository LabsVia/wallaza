/**
 * Wallaza API Node.js Client Example
 * ----------------------------------
 * 
 * This example demonstrates how to use the Wallaza API to search for wallpapers,
 * download images, and handle pagination with Node.js.
 * 
 * For full documentation, visit: https://www.wallaza.com/api-reference/
 * 
 * Prerequisites:
 * - Node.js 12+
 * - axios: npm install axios
 * - fs-extra: npm install fs-extra
 */

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

/**
 * Simple client for the Wallaza API (https://www.wallaza.com/api-reference/)
 */
class WallazaAPI {
  /**
   * Initialize the API client with your API key
   * @param {string} apiKey - Your Wallaza API key
   * @param {string} baseUrl - API base URL
   */
  constructor(apiKey, baseUrl = 'https://api.wallaza.com/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Fetch wallpapers with optional filtering
   * @param {Object} options - Query options
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.limit - Results per page (default: 20)
   * @param {string} options.category - Filter by category
   * @returns {Promise<Object>} Wallpapers response
   */
  async getWallpapers({ page = 1, limit = 20, category = null } = {}) {
    const params = { page, limit };
    
    if (category) {
      params.category = category;
    }
    
    try {
      const response = await this.client.get('/wallpapers', { params });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Search wallpapers by keyword and optional resolution
   * @param {string} query - Search query
   * @param {string} resolution - Optional resolution filter (e.g., "1920x1080")
   * @returns {Promise<Object>} Search results
   */
  async searchWallpapers(query, resolution = null) {
    const params = { query };
    
    if (resolution) {
      params.resolution = resolution;
    }
    
    try {
      const response = await this.client.get('/wallpapers/search', { params });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Get details for a specific wallpaper by ID
   * @param {string} wallpaperId - Wallpaper ID
   * @returns {Promise<Object>} Wallpaper details
   */
  async getWallpaper(wallpaperId) {
    try {
      const response = await this.client.get(`/wallpapers/${wallpaperId}`);
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Download a wallpaper and save it to the specified path
   * @param {string} wallpaperId - Wallpaper ID to download
   * @param {string} savePath - Path to save the file
   * @returns {Promise<string>} Path to the saved file
   */
  async downloadWallpaper(wallpaperId, savePath) {
    try {
      // First get the wallpaper details
      const wallpaper = await this.getWallpaper(wallpaperId);
      
      // Get the file URL
      const fileUrl = wallpaper.url;
      
      // Ensure the directory exists
      await fs.ensureDir(path.dirname(savePath));
      
      // Download the file
      const response = await axios({
        method: 'GET',
        url: fileUrl,
        responseType: 'stream'
      });
      
      // Save the file
      const writer = fs.createWriteStream(savePath);
      response.data.pipe(writer);
      
      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(savePath));
        writer.on('error', reject);
      });
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Handle API errors and provide meaningful messages
   * @param {Error} error - Error object
   */
  handleApiError(error) {
    if (error.response) {
      // The request was made, but the server responded with an error
      const status = error.response.status;
      const errorData = error.response.data;
      
      if (status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (errorData && errorData.error) {
        throw new Error(`API Error (${status}): ${errorData.error.message}`);
      } else {
        throw new Error(`API Error (${status}): Request failed`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from API server. Please check your connection.');
    } else {
      // Something else happened while setting up the request
      throw error;
    }
  }
}

/**
 * Example usage of the Wallaza API client
 */
async function main() {
  // Replace with your API key
  // Get your API key at https://www.wallaza.com/api-reference/
  const apiKey = 'YOUR_API_KEY';
  
  // Initialize the client
  const client = new WallazaAPI(apiKey);
  
  try {
    // Get nature wallpapers
    console.log('Fetching nature wallpapers...');
    const natureWallpapers = await client.getWallpapers({ category: 'Nature', limit: 5 });
    console.log(`Found ${natureWallpapers.data.length} nature wallpapers`);
    
    // Print the title of each wallpaper
    natureWallpapers.data.forEach(wallpaper => {
      console.log(`- ${wallpaper.title} (${wallpaper.resolution})`);
    });
    
    // Search for mountain wallpapers
    console.log('\nSearching for mountain wallpapers in 4K...');
    const mountainWallpapers = await client.searchWallpapers('mountain', '3840x2160');
    console.log(`Found ${mountainWallpapers.data.length} mountain wallpapers in 4K`);
    
    // Download the first wallpaper if any are found
    if (mountainWallpapers.data.length > 0) {
      const wallpaper = mountainWallpapers.data[0];
      console.log(`\nDownloading: ${wallpaper.title}`);
      
      // Save to downloads folder
      const filePath = path.join('downloads', `${wallpaper.id}.jpg`);
      await client.downloadWallpaper(wallpaper.id, filePath);
      console.log(`Saved to ${filePath}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Run the example
main().catch(console.error);

/*
* Visit https://www.wallaza.com/api-reference/ for complete API documentation
*/ 