import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId='87914396480-b35op3hce7mrbdp7jv3mmpc0lt1lau12.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>
)
