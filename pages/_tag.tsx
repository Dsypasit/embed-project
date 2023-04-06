import { useState } from "react"

export default function Tag({tag, data}: {tag: string, data: object}){
    return (
        <div className="container mx-auto mt-20">
        <div className="flex justify-center text-center">
          <h1 className="text-xl font-bold">{tag}</h1>
        </div>
        <div className="mt-10 flex flex-col justify-center sm:flex-row sm:justify-evenly">
          <div className="block mx-5 my-5 max-w-sm p-6 py-10 bg-rose-300 border border-gray-200 rounded-lg shadow px-20 drop-shadow-lg hover:drop-shadow-2xl ease-in duration-100">
            <div className="text-left w-full">
              <h1>votage</h1>
            </div>
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
              {data.voltage.toFixed(2)}
            </h5>
          </div>
          <div className="block mx-5 my-5 max-w-sm p-6 py-10 bg-rose-300 border border-gray-200 rounded-lg shadow px-20 drop-shadow-lg hover:drop-shadow-2xl ease-in duration-100">
            <div className="text-left w-full">
              <h1>current</h1>
            </div>
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
              {data.current.toFixed(2)}
            </h5>
          </div>
          <div className="block mx-5 my-5 max-w-sm p-6 py-10 bg-rose-300 border border-gray-200 rounded-lg shadow px-20 drop-shadow-lg hover:drop-shadow-2xl ease-in duration-100">
            <div className="text-left w-full">
              <h1>power</h1>
            </div>
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
              {data.power.toFixed(2)}
            </h5>
          </div>
        </div>
      </div>
    )
}