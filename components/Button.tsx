"use client"

import { useState } from "react"

export default function Button() {
    const [count, setCount] = useState(0);
  return (
    <>
        <h2>Fahims button</h2>
        <h2 className="text-2xl">{count}</h2>

        <button onClick={()=>setCount(count+1)}>Increase : {count}</button>
    </>
  )
}
