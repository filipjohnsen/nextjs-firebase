import { AuthContextProvider } from '../context/AuthContext';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
};

export default App;
