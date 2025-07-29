"use client"

import { useState } from "react"

export default function ListProduct () {
    // logic...
    const [nama, setNama] = useState()

    return (
        <div>
            <input onChange={ (input) => { setNama(input.target.value) } } type="text" name="" id="" placeholder="Name.."/>
            <div>{nama}</div>
        </div>
    )
}