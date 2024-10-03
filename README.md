# Belly Button Challenge
Module 14 Challenge Joe Almendarez

This project visualizes bacterial data from different samples using D3.js and Plotly.js. The application dynamically updates charts and metadata based on user-selected samples.

## Files

- [`app.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fja200%2FDocuments%2FGitHub%2Fbelly-button-challenge%2Fstatic%2Fjs%2Fapp.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22982c185e-b7b6-4a20-b551-adc4eb659b39%22%5D "c:\Users\ja200\Documents\GitHub\belly-button-challenge\static\js\app.js"): Main JavaScript file that handles data fetching, chart building, and event handling.

## Code Explanation

### `buildMetadata(sample)`

Fetches metadata for a given sample and updates the metadata panel.

- Fetches data from a JSON file.
- Filters metadata for the selected sample.
- Clears existing metadata in the panel.
- Appends new metadata to the panel.


Builds and updates the Bubble and Bar charts for a given sample.

### Event Handling

- The `init()` function is called on page load to initialize the dashboard.
- The `optionChanged(newSample)` function is triggered when a new sample is selected from the dropdown.

## Usage

1. Open the HTML file in a web browser.
2. Select a sample from the dropdown menu to view its metadata and charts.

## Dependencies

- D3.js
- Plotly.js

