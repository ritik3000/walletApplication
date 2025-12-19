import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

export const Appbar = () => {
    const [initials,setInitials] = useState(null)
    const navigate = useNavigate()
    useEffect (() => {
        axios.get("http://localhost:3000/api/v1/userdetails",
        {
        headers: {
            token: localStorage.getItem("token")
        }
        }).then(response => {
            console.log(response)
              setInitials(response.data?.firstname[0].toUpperCase()+response.data?.lastname[0].toUpperCase())
        })

    },[])

    const handleSignOut = () => {
        localStorage.removeItem('token')
        if ('caches' in window) {
            caches.keys().then(names => names.forEach(n => caches.delete(n))).catch(() => {})
        }
        navigate('/signin')
    }

    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="flex flex-col justify-center">
                PayTM App
            </div>

            <div className="flex items-center">
                <div className="flex flex-col justify-center mr-4 text-lfont-semibold">
                    Hello
                </div>

                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-3">
                    <div className="text-xl">
                        {initials ?? '--'}
                    </div>
                </div>
                <div>
                <button
                onClick={handleSignOut}
                className="
                    flex items-center justify-center
                    px-6 py-3
                    text-base font-semibold
                    text-white
                    bg-gradient-to-r from-red-500 to-red-600
                    rounded-xl
                    shadow-md
                    hover:from-red-600 hover:to-red-700
                    hover:shadow-lg
                    active:scale-95
                    transition-all duration-200
                "
                >
                Sign Out
                </button>
                </div>
            </div>
        </div>
    )
}