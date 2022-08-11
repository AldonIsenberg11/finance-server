# finance-server
Server set to manage stock data

# TODO:

- [X] Setup Express Server
- [x] Setup Database
- [ ] Setup Chron Job to fetch data for DB
 - [ ] Daily snapshot for single stock (Start with IBM)
 - [ ] Process multiple 
- [ ] Add routes
  - [x] Stock Snapshot
  - [ ] Stock Profile
- [ ] Add Models
  - [x] Stock Snapshot
  - [ ] Stock Profile
- [ ] Security - production ready
  - [ ] Add basic auth for External UI to fetch data
  - [ ] Trim Down CORS
- [ ] Convert to Typescript

# Data:

- List of dividend stocks
- date range data points of:
- daily calculated dividend yield
  - mean median, mode, & range

# Reasoning

The idea is that we should be able to evaluate if a dividend paying stock is undervalued/overvalued based on it's 
current dividend yield in relative to it's past dividend yield.

# UI portion

https://www.chartjs.org/docs/latest/
Vue Specific: https://vue-chart-3.netlify.app/guide/usage/
