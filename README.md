# Wallaza API

[![API Status](https://img.shields.io/badge/API-Online-brightgreen)](https://www.wallaza.com/api-reference/)
[![Documentation](https://img.shields.io/badge/Documentation-v1.0-blue)](https://www.wallaza.com/api-reference/)
[![License](https://img.shields.io/badge/License-MIT-orange)](LICENSE)

Wallaza API is a REST API that provides programmatic access to millions of [wallpapers](https://www.wallaza.com). This API allows you to easily access high-quality wallpapers in your applications.

## 🌟 Features

- 📱 Access to millions of high-quality [wallpapers](https://www.wallaza.com)
- 🔍 Search by keywords, categories, and colors
- 🌈 Filter by resolution, aspect ratio, and more
- 🔄 Comprehensive documentation for easy integration
- 🔑 Secure API authentication

## 📚 Documentation

You can access the full API documentation at [wallaza.com/api-reference](https://www.wallaza.com/api-reference/).

## 🔧 Getting Started

To use our API, you first need to obtain an API key. You can generate an API key from our [Authentication page](https://www.wallaza.com/api-reference/).

### Base URL

```
https://api.wallaza.com/v1
```

### Authentication

All API requests require an API key in the header:

```
Authorization: Bearer YOUR_API_KEY
```

## 📱 Example Request

```bash
curl -X GET "https://api.wallaza.com/v1/" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json"
```

## 📊 Rate Limiting

Our API implements rate limiting to ensure fair usage:

* **Free Plan**: 1,000 requests per hour
* **Basic Plan**: 10,000 requests per hour
* **Premium Plan**: 50,000 requests per hour

## 📞 Support

For questions or issues, please send an email to [info@wallaza.com](mailto:info@wallaza.com) or visit our wallpaper website: [wallaza.com](https://www.wallaza.com).

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

**[🌐 Wallpaper Collection](https://www.wallaza.com)** | **[📚 API Reference](https://www.wallaza.com/api-reference/)** | **[💻 GitHub](https://github.com/wallaza/api)**

## Endpoints

### List Wallpapers

```
GET /wallpapers
```

Retrieves a list of [wallpapers](https://www.wallaza.com) with pagination. Returns 20 results per page by default.

#### Parameters

| Parameter | Type | Description |
| --------- | --- | ----------- |
| page | integer | Page number (default: 1) |
| limit | integer | Number of results per page (max: 100) |
| category | string | Filter by category name |

### Get Wallpaper

```
GET /w/{id}
```

Retrieves detailed information about a specific [wallpaper](https://www.wallaza.com).

## Example Response

```json
{
  "data": [
    {
      "id": "12345",
      "title": "Mountain Landscape",
      "url": "https://www.wallaza.com/w/12345",
      "thumbnail_url": "https://www.wallaza.com/uploads/thumbnails/12345.jpg",
      "category": "Nature",
      "resolution": "1920x1080",
      "file_size": 1240000,
      "downloads": 5420,
      "created_at": "2025-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 12,
    "total_results": 230
  }
}
```

## Wallpaper Sources

The Wallaza API provides access to a curated collection of wallpapers from [our main website](https://www.wallaza.com). Our collection includes various categories such as nature, abstract, minimalist, and more to suit different preferences and needs. 
