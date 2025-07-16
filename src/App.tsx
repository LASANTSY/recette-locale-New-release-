import "./App.css"
import AdministrateurLayout from './components/layouts/AdministrateurLayout';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AdministrateurLayout />
    </ThemeProvider>
  );
}

export default App;
