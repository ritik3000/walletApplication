import { useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { TopUpButton } from "../components/TopUpButton"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const [balance, setBalance] = useState<number | null>(null);
        return <div>
            <Appbar/>
            <div className="m-8">
                <div className="flex justify-between">
                    <div>
                <Balance  balance={balance} setBalance={setBalance}/>
                </div>
                <div>
                <TopUpButton setBalance={setBalance}/>
                </div>
                </div>
                <Users />
                </div>
        
    </div>
}
