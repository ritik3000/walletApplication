import axios from "axios";
import { useState } from "react";

interface TopUpButtonProps {
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
}

      
export const TopUpButton =  ( { setBalance }: TopUpButtonProps) => {
     const [amount, setAmount] = useState(0);
     const handleTransfer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/topUp",
        {
          amount:amount
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("Topup successfull!");
            // OPTION A: Re-fetch balance from backend
      const balanceResponse = await axios.get(
        "http://localhost:3000/api/v1/balance",
        { headers: { token: localStorage.getItem("token") } }
      );

      setBalance(balanceResponse.data.balance);

    } catch (error) {
      console.log("TopUp failed:", error);
      alert("Topup failed!");
    }
  };
    return (<div>
        <div>
        <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-32 h-8 px-3 py-2 text-sm border rounded-md"
              />
              </div>
              <div className="mt-2">
        <button
         onClick={handleTransfer}
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Top Up
        </button>
        </div>
        </div>
        )
    }