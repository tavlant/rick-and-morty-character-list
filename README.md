# Rick and Morty Character List Application

This project is a React application that fetches and displays a list of characters from the Rick and Morty GraphQL API. It includes features such as filtering, sorting, pagination with infinite scrolling, and language switching.

## Features

- **Character List**: Displays a list of characters with their Name, Status, Species, Gender, and Origin.
- **Loading and Error Handling**: Shows a spinner during loading and an error message if the query fails.
- **Filters**: Dropdowns for filtering characters by Status ("Alive", "Dead", "Unknown") and Species (e.g., "Human", "Alien").
- **Sorting**: Options to sort the character list by Name or Origin.
- **Infinite Scrolling**: Fetches more characters as the user scrolls down the list.
- **Language Switcher**: Toggle between English and German for field labels.
- **Responsive Design**: Clean and readable layout that adapts to different screen sizes.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/rick-and-morty-character-list.git
   cd rick-and-morty-character-list
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Required Dependencies

- React
- Apollo Client
- GraphQL
- TypeScript
- CSS (or TailwindCSS)

## Additional Notes

- Ensure you have Node.js installed on your machine.
- The application uses Apollo Client for data fetching and state management.
- The translations are managed in a separate file for easy updates and maintenance.

Feel free to contribute to this project by submitting issues or pull requests!