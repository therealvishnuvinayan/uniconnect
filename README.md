
# Uniconnect

Uniconnect is a web application that displays a list of universities in the United Arab Emirates using data from [Hipolabs](http://universities.hipolabs.com/search?country=United%20Arab%20Emirates).

## Features

- **List of Universities:** Displays a table with all universities from the data source.
- **Sorting and Searching:** Sort universities in ascending or descending order. Search for specific universities using the search bar.
- **View and Visit:** Visit the university's website directly via a clickable link or click the "View" button to see more detailed information.
- **Temporary Removal:** Temporarily remove any university from the list by clicking the "Delete" button.

## Usage

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/uniconnect.git
   cd uniconnect
   ```

2. **Install Dependencies:**
   Ensure you have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed, then run:
   ```bash
   yarn install
   ```

3. **Start the Development Server:**
   Start the app in development mode with hot-reloading enabled:
   ```bash
   yarn start
   ```
   Visit `http://localhost:3000` in your browser to see the application in action.

4. **Run Tests:**
   Execute unit tests with Jest and React Testing Library:
   ```bash
   yarn test
   ```

## Deployment

1. **Build the App:**
   Create a production build using:
   ```bash
   yarn build
   ```

2. **Deploy:** 
   You can deploy the build folder to any web server. For instance, use [Vercel](https://vercel.com), [Netlify](https://www.netlify.com), or your preferred hosting service.

## License

This project is licensed under the MIT License.
