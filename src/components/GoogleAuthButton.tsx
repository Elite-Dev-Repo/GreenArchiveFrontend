import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';


const GoogleAuthButton = ({mode}) => {
    const [loading, setLoading]  = useState(false)
    const handleGoogleLogin = useGoogleLogin({
        
       
        onSuccess: async (tokenResponse) => {
            setLoading(true)
          // Send the access token to the Django endpoint created in Step 3
          const res = await axios.post('http://localhost:8000/api/auth/google/', {
            access_token: tokenResponse.access_token,
          });
          
          // Store the JWT returned by dj-rest-auth
          localStorage.setItem('token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          toast.success(mode === "login" ? "Welcome back!" : "Account created!");
          window.location.href = "/apikeys";
        },
      });
  return (
    <button
    onClick={()=>{handleGoogleLogin()}}
    className="w-full flex items-center justify-center gap-3 font-body font-semibold text-ink bg-white border-2 border-ink/10 rounded-full py-3 hover:bg-lime/10 transition-colors"
  >
    {loading ?  <Loader2 size={18} className="animate-spin" /> : <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>}
    Sign {mode === "login" ? "in" : "up"} with Google
  </button>
    
)}

export default GoogleAuthButton


