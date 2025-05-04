# Contributing Guide

Thank you for your interest in contributing to the [Wallaza API](https://www.wallaza.com/api-reference/) project! This document will help you understand the contribution process.

## Getting Started

1. Fork the project
2. Clone your repository (`git clone https://github.com/YOUR_USERNAME/wallaza-api.git`)
3. Create a new branch (`git checkout -b feature/amazing-feature`)
4. Commit your changes (`git commit -m 'Amazing feature added'`)
5. Push your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Development Environment

To develop the API, you need to install the following requirements:

- PHP 7.4 or higher
- Composer
- MySQL 5.7 or higher

### Installation

```bash
# Install dependencies
composer install

# Set up environment variables
cp .env.example .env
# Edit .env file

# Create the database
php artisan migrate
```

## Coding Standards

- Follow PSR-12 coding standards
- Add documentation for all new methods
- Write tests whenever possible

## Testing

Before contributing, run the tests to make sure everything works properly:

```bash
composer test
```

## Documentation

When adding new features, please update the [API Documentation](https://www.wallaza.com/api-reference/). Documentation is crucial for understanding how to use the API.

## Communication

If you have questions or suggestions, please send an email to [developers@wallaza.com](mailto:developers@wallaza.com) or open an issue.

You can also visit the [Wallaza Official Website](https://www.wallaza.com).

## License

By contributing to this project, you agree that your contributions will be licensed under the project's license. 