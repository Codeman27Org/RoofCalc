# RoofCalc - Real Estate Investment Calculator

RoofCalc is a comprehensive real estate investment analysis tool that helps investors evaluate potential property investments by calculating key metrics and providing detailed property insights.

## Project Structure

The project is divided into two main parts:

### Frontend (`/frontend/my-app`)
A React-based web application that provides the user interface for:
- Property search with Google Autocomplete
- Investment metrics calculation
- Property analysis visualization
- Demographic data display

Key features include:
- Principal and Interest calculations
- Insurance cost estimation (including flood insurance)
- Property tax calculations
- Rental income projection
- Utility cost estimation
- Rehabilitation cost estimation
- Key investment metrics (Cap Rate, Cash on Cash Return)
- Local demographic data analysis

### Backend (`/backend`)
Python-based API server that handles:
- Property data scraping (Zillow)
- Mortgage rate calculations
- Insurance cost estimation
- Property tax data retrieval
- Location-based services
- Data USA API integration for demographic data

## Key Metrics Calculated

- Cap Rate
- Cash on Cash Return
- Net Rental Income
- Gross Rental Income
- Monthly Principal and Interest
- Insurance Costs
- Property Taxes
- Net Operating Income

## Technical Stack

Frontend:
- React.js
- Material-UI components
- Google Places Autocomplete API
- Custom CSS styling

Backend:
- Python
- Web scraping utilities
- External API integrations:
  - Zillow data
  - Insurance rates
  - Property tax information
  - Demographic data (Data USA)

## Error Handling

The application includes robust error handling:
- Timeout management for API calls
- Fallback to dummy data when backend is unavailable
- Clear error messaging to users
- Data validation at multiple levels

## Setup and Installation

1. Frontend Setup:
   ```bash
   cd frontend/my-app
   npm install
   npm start
   ```

2. Backend Setup:
   ```bash
   cd backend
   # Set up Python virtual environment and install dependencies
   # Configure API keys in api_keys.py
   python api.py
   ```



## Authors

[Your Name/Organization]

---
Note: Make sure to configure all necessary API keys and environment variables before running the application.
