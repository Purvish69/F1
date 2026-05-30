import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Pilotos from './components/Pilotos.jsx';
import Equipos from './components/Equipos.jsx';
import Resultados from './components/Resultados.jsx';
import Galeria from './components/Galeria.jsx';
import Footer from './components/Footer.jsx';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#E8002D' },
    secondary: { main: '#FFD700' },
    background: {
      default: '#050505',
      paper: 'rgba(18, 18, 20, 0.88)'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B7BDC8'
    }
  },
  typography: {
    fontFamily: "'Rajdhani', sans-serif",
    h1: { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0 },
    h2: { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0 },
    h3: { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0 },
    h4: { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0 },
    h5: { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0 },
    h6: { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0 },
    button: { fontFamily: "'Rajdhani', sans-serif", fontWeight: 800 }
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
          border: '1px solid rgba(255,255,255,.10)'
        }
      }
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 6, textTransform: 'none' } }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <Hero />
        <Pilotos />
        <Equipos />
        <Resultados />
        <Galeria />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
