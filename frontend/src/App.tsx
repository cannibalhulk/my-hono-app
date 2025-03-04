import { useEffect, useState } from 'react'
import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"

function App() {
  const [totalspent, setTotalspent] = useState(0)

  useEffect(()=>{
    async function fetchTotal() {
      const res = await fetch("/api/expenses/total-spent")
      const data = await res.json();
      setTotalspent(data.total)
    }

    fetchTotal();
  })

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        {totalspent}
      </CardContent>
    </Card>
  )
}

export default App
