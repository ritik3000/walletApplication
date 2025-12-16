import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <Heading label="Sign Up"/>
      <SubHeading label="Enter your information to create an account"/>
      <InputBox label={"First Name"} placeholder="Ritik" 
      onChange={(e) => {setFirstName(e.target.value)}}/>
      <InputBox label="last Name" placeholder="Dhingra" 
      onChange={(e) => {setLastName(e.target.value)}}/>
      <InputBox label="Email" placeholder="ritikdx@amazon.com" 
      onChange={(e) => {{setEmail(e.target.value)}}}/>
      <InputBox label="Password" placeholder="123456" 
      onChange={(e) => {{setPassword(e.target.value)}}}/>
      <div className="pt-4"></div>
      <Button label="Sign Up" onClick={async () => {
        const response = await axios.post("http://localhost:3000/api/v1/signup", {
          email,
          firstName,
          lastName,
          password
        });
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
      }}/>
        </div>
        </div>
    </div>
}