import './App.css'
import { useState } from "react"
import Dropzone from "./components/Dropzone.jsx"
import TableInfo from "./components/TableInfo.jsx"

function App() {
  const [data, setData] = useState({
    key: 1,
    data: []
  })

  const handlerSetData = (value) => {
    let newArr = { ...data }
    newArr.key = Math.random()
    newArr.data = value
    setData(newArr)
  }

  const handleClear = () => {
    setData({
      key: 1,
      data: []
    })
  }

  return (
      <div className="App">
        <div className="main-content">
          {
            data.data.length > 0 ?
                (
                    <TableInfo data={data.data} resetData={() => handleClear()} key={data.key}/>
                ) :
                (
                    <Dropzone setData={(newData) => handlerSetData(newData)}/>
                )
          }
        </div>
        <div className="fitwave-title">
          <h2>Fitwave Formats</h2>
        </div>
      </div>
  )
}

export default App
