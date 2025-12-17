import axios from "axios";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/transfer",
        {
          toUserId: id,
          amount,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // If backend responds successfully
      setSuccess(true);

      // Redirect after 1.5 sec delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.log("Transfer failed:", error);
      alert("Transfer failed!");
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="flex flex-col justify-center h-full">
        <div className="w-96 max-w-md p-4 space-y-8 bg-white border rounded-lg shadow-lg">

          <div className="flex flex-col p-6 space-y-1.5">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                <span className="text-2xl text-white">
                  {name && name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium leading-none"
              >
                Amount (in Rs)
              </label>

              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-10 px-3 py-2 text-sm border rounded-md"
              />
            </div>

            <button
              onClick={handleTransfer}
              className="w-full h-10 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md"
            >
              Initiate Transfer
            </button>

            {success && (
              <div className="text-center text-green-600 font-semibold">
                Transaction Successful!
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
