# Contributing to Legal Adviser

Thank you for your interest in contributing to Legal Adviser! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment
- Report unacceptable behavior

## How to Contribute

### Reporting Bugs

1. Check if the bug is already reported in Issues
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check if feature is already requested
2. Create a feature request issue with:
   - Clear description of the feature
   - Use case and benefits
   - Mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Legal-Adviser.git
cd Legal-Adviser

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

# Create .env file
cp backend/.env.example backend/.env
# Add your API keys

# Start development
npm run dev
```

## Code Style

### JavaScript/React
- Use ES6+ features
- Use functional components with hooks
- Follow existing code patterns
- Add comments for complex logic
- Use meaningful variable names

### File Organization
- Backend routes in `backend/src/routes/`
- Backend services in `backend/src/services/`
- Frontend pages in `frontend/src/pages/`
- Frontend components in `frontend/src/components/`

### Naming Conventions
- Components: PascalCase (`UserProfile.jsx`)
- Functions: camelCase (`getUserData()`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Files: kebab-case for utilities (`date-utils.js`)

## Testing Guidelines

### Before Submitting PR
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test responsive design (mobile, tablet, desktop)
- Test with different API configurations
- Test error scenarios
- Verify no console errors

### Manual Testing Checklist
- [ ] All existing features still work
- [ ] New feature works as expected
- [ ] No breaking changes
- [ ] Error handling works
- [ ] Loading states display correctly
- [ ] Forms validate properly
- [ ] API responses handled correctly

## Documentation

- Update README.md if needed
- Add JSDoc comments for complex functions
- Update API documentation for new endpoints
- Include examples in comments

## Commit Message Format

```
type: brief description

Detailed explanation if needed

Fixes #123
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build/config changes

Examples:
```
feat: add voice input for case description

Added speech recognition API integration to allow users
to describe their case using voice input.

Fixes #45
```

```
fix: resolve OCR timeout on large documents

Increased timeout from 30s to 60s and added progress
indicator during OCR processing.

Fixes #67
```

## Areas for Contribution

### High Priority
- [ ] Add unit tests
- [ ] Improve error handling
- [ ] Add more educational content
- [ ] Enhance mobile UI
- [ ] Add more language translations
- [ ] Improve AI prompts
- [ ] Add user authentication
- [ ] Implement database

### Features
- [ ] Voice input for case description
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Calendar integration for lawyer bookings
- [ ] Payment integration
- [ ] User dashboard analytics
- [ ] Offline mode
- [ ] Push notifications

### Content
- [ ] More constitutional articles
- [ ] State-specific law guides
- [ ] Video tutorials
- [ ] FAQ section
- [ ] Blog posts
- [ ] Case study templates

### Translations
- [ ] Complete Hindi translations
- [ ] Add Marathi content
- [ ] Add Tamil content
- [ ] Add more regional languages
- [ ] Improve language detection

## Project Structure

```
backend/
  src/
    routes/      # API endpoints
    services/    # Business logic
    middleware/  # Express middleware
    utils/       # Utility functions

frontend/
  src/
    pages/       # Page components
    components/  # Reusable components
    services/    # API clients
    utils/       # Helper functions
    assets/      # Images, fonts, etc.
```

## Getting Help

- Open a discussion on GitHub
- Ask questions in issues
- Review existing code for patterns
- Check documentation files

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make legal help accessible to everyone! 🙏
