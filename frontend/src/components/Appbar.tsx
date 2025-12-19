import axios from "axios"
import { useEffect, useState } from "react"

export const Appbar = () => {
    const [initials,setInitials] = useState(null)
    useEffect (() => {
        axios.get("http://localhost:3000/api/v1/userdetails",
        {
        headers: {
            token: localStorage.getItem("token")
        }
        }).then(response => {
            console.log(response)
              setInitials(response.data?.firstname[0]+response.data?.lastname[0])
        })

    },[])
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center ml-4">
            PayTM App
        </div>
        <div className="flex" >
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {initials}
                </div>
            </div>
        </div>
    </div>
}