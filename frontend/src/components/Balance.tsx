import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./Button";

interface BalanceProps {
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
}


export const Balance = ({ balance, setBalance }: BalanceProps) => {
    

  useEffect(() => {
        axios.get("http://localhost:3000/api/v1/balance",
        {
        headers: {
            token: localStorage.getItem("token")
        }
        }).then(response => {
            console.log(response)
              setBalance(response.data.balance)
        })
    }
    , [balance]);
    return <div className="flex">
        <div className="font-bold text-lg">
            {balance === null ? "Loading..." :  "Your balance is ₹"}
        </div>
        <div className="font-semibold ml-2 text-lg">
           {balance === null ? "" : balance}
        </div>
    </div>
}