import React, { useContext } from "react";
import GlobalContext from '../context';

export const List = () => {
  const { list, filename, setFileName } = useContext(GlobalContext);
  
  const handleSelect = (e) => {
    setFileName(e.target.value)
  }

  return (
    <div className="my-3">
      <span className="me-3">Archivos disponibles:</span>
      <select name="list" id="list" value={filename} onChange={handleSelect}>
        {
          list?.info?.map(e=>{
            return <option key={e} value={e}>{e}</option>
          })
        }
      </select>
    </div>
  )
}