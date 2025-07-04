"use client"; 
import { useTheme } from "../utils/ThemeProvider"; 

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const buttonStyle: React.CSSProperties = {
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none', 
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.1s ease', 
    margin: "0 10px",
    backgroundColor: theme === 'light' ? '#007bff' : '#6c757d', 
    color: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: theme === 'light' ? '#0056b3' : '#5a6268', 
    transform: 'translateY(-1px)', 
  };
  return (
    <button
      onClick={toggleTheme}
      style={buttonStyle} 
    >
      Switch to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
}