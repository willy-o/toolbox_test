import React, { useState, useEffect, useContext } from "react";
import { List } from './List'
import { DataRows } from "./DataRows";
import GlobalContext from '../context';

const App = () => {
  const { filename } = useContext(GlobalContext);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:8080/files/data?filename=${filename}`)
      .then(e=>e.json())
      .then(e=>{
        setData(e)
        setLoading(false)
      })
  }, [filename])

  return <>
    <h1 className="card-header bg-danger my-4 py-2 ps-3 text-light mx-5">React test app</h1>
    <div className="container">
      <List />
      <table className="table table-striped table-ligth table-bordered px-5">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <DataRows data={data} loading={loading}/>
        </tbody>
      </table>
    </div>
  </>
}

export default App