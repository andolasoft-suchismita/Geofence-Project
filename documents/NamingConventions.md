## Naming Conventions

To maintain a consistent and clean codebase, we follow specific naming conventions for different file types and folder names:

### File Naming Conventions
- **PascalCase**: All component files (`.jsx`) should use PascalCase. For example:
  - `Header.jsx`
  - `Sidebar.jsx`
  - `LoginForm.jsx`

- **kebab-case**: Functions and utility files should follow kebab-case. For example:
  - `capitalize-string.js`
  - `date-format.js`
  - `use-fetch-data.js`

- **camelCase**: All Redux-related files such as actions, reducers, and constants should use camelCase. For example:
  - `fetchUserAction.js`
  - `userReducer.js`
  - `userConstants.js`

### Folder Naming Conventions
- **smallcase**: Folder names should be in smallcase to ensure uniformity. For example:
  - `assets/`
  - `components/`
  - `layout/`
  - `redux/`

## Usage Example

```jsx
import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <HomePage />
    </div>
  );
}

export default App;