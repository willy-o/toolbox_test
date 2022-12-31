import React from "react";

export const DataRows = ({data, loading}) => {
  if(loading){
    return 'Espere mientras se procesa la información ...'
  }

  if(!data || !data.info.length){
    return 'Este archivo no cuenta con información'
  }

  return (
    data.info.map(e=>{
          return (<tr key={e.text}>
            <td>{e.file}</td>
            <td>{e.text}</td>
            <td>{e.number}</td>
            <td>{e.hex}</td>
          </tr>
          )
        })
  )  
}