#!/usr/bin/env python3
"""
Wallaza API Python Client Example (https://www.wallaza.com/api-reference/)
-------------------------------------------------------------------------

This example demonstrates how to use the Wallaza API to search for wallpapers,
download images, and handle pagination.

Prerequisites:
- Python 3.6+
- requests library: pip install requests
"""

import requests
import json
import os
from typing import Dict, List, Any, Optional


class WallazaAPI:
    """Simple client for the Wallaza API (https://www.wallaza.com/api-reference/)."""
    
    def __init__(self, api_key: str, base_url: str = "https://api.wallaza.com/v1"):
        """Initialize the API client with your API key."""
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def get_wallpapers(self, page: int = 1, limit: int = 20, category: Optional[str] = None) -> Dict[str, Any]:
        """Fetch wallpapers with optional filtering."""
        params = {
            "page": page,
            "limit": limit
        }
        
        if category:
            params["category"] = category
            
        response = requests.get(
            f"{self.base_url}/wallpapers",
            headers=self.headers,
            params=params
        )
        
        response.raise_for_status()  # Raise exception for 4XX/5XX errors
        return response.json()
    
    def search_wallpapers(self, query: str, resolution: Optional[str] = None) -> Dict[str, Any]:
        """Search wallpapers by keyword and optional resolution."""
        params = {"query": query}
        
        if resolution:
            params["resolution"] = resolution
            
        response = requests.get(
            f"{self.base_url}/wallpapers/search",
            headers=self.headers,
            params=params
        )
        
        response.raise_for_status()
        return response.json()
    
    def get_wallpaper(self, wallpaper_id: str) -> Dict[str, Any]:
        """Get details for a specific wallpaper by ID."""
        response = requests.get(
            f"{self.base_url}/wallpapers/{wallpaper_id}",
            headers=self.headers
        )
        
        response.raise_for_status()
        return response.json()
    
    def download_wallpaper(self, wallpaper_id: str, save_path: str) -> str:
        """Download a wallpaper and save it to the specified path."""
        # First get the wallpaper details
        wallpaper = self.get_wallpaper(wallpaper_id)
        
        # Get the file URL
        file_url = wallpaper["url"]
        
        # Create the directory if it doesn't exist
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        # Download the file
        response = requests.get(file_url, stream=True)
        response.raise_for_status()
        
        with open(save_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
                
        return save_path


def main():
    """Example usage of the Wallaza API client."""
    # Replace with your API key
    # Get your API key at https://www.wallaza.com/api-reference/
    api_key = "YOUR_API_KEY"
    
    # Initialize the client
    client = WallazaAPI(api_key)
    
    try:
        # Get nature wallpapers
        print("Fetching nature wallpapers...")
        nature_wallpapers = client.get_wallpapers(category="Nature", limit=5)
        print(f"Found {len(nature_wallpapers['data'])} nature wallpapers")
        
        # Print the title of each wallpaper
        for wallpaper in nature_wallpapers["data"]:
            print(f"- {wallpaper['title']} ({wallpaper['resolution']})")
        
        # Search for mountain wallpapers
        print("\nSearching for mountain wallpapers in 4K...")
        mountain_wallpapers = client.search_wallpapers("mountain", resolution="3840x2160")
        print(f"Found {len(mountain_wallpapers['data'])} mountain wallpapers in 4K")
        
        # Download the first wallpaper if any are found
        if mountain_wallpapers["data"]:
            wallpaper = mountain_wallpapers["data"][0]
            print(f"\nDownloading: {wallpaper['title']}")
            
            # Save to downloads folder
            file_path = os.path.join("downloads", f"{wallpaper['id']}.jpg")
            client.download_wallpaper(wallpaper["id"], file_path)
            print(f"Saved to {file_path}")
            
    except requests.exceptions.HTTPError as e:
        print(f"API Error: {e}")
        if e.response.status_code == 401:
            print("Please check your API key")
        elif e.response.status_code == 429:
            print("Rate limit exceeded. Please try again later")
        else:
            print(e.response.text)


if __name__ == "__main__":
    main()


# For more information and detailed documentation, visit:
# https://www.wallaza.com/api-reference/ 