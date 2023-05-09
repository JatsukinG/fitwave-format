import * as XLSX from "xlsx"
import { evaluationNames } from "../constants/evaluationsName.js"
import { useEffect, useState } from "react"

// eslint-disable-next-line react/prop-types
const TableInfo = ({ data, resetData }) => {
  const [dataForShow, setDataForShow] = useState([])

  useEffect(() => {
    let newDataHeader = {}
    // eslint-disable-next-line react/prop-types
    data.map(elem => {
      Object.keys(elem).map(elem2 => {
        newDataHeader[elem2] = ''
      })
    })

    let newDataForShow = []

    // eslint-disable-next-line react/prop-types
    data.map(elem => {
      let dataModel = { ...newDataHeader }
      Object.keys(elem).map(key => {
        dataModel[key] = elem[key]
      })
      newDataForShow.push(dataModel)
    })

    setDataForShow(newDataForShow)
  }, [data])

  const generatePrefix = (name) => {

    let prefix = ''

    name.split(' ').map((elem, i) => {
      if (i === (name.split(' ').length - 1)) {
        prefix += elem.toLowerCase()
      } else {
        prefix += elem.substring(0, 1).toLowerCase()
      }
    })

    return prefix
  }

  const onGenerateFormFormat = () => {

    let dataArray = []
    let count = 1
    let dataModel = {
      Nombre: '',
      Prefix: '',
      Edad: '',
      Altura: '',
      Peso: ''
    }

    // eslint-disable-next-line react/prop-types
    data.map((elem, index) => {

      dataModel.Nombre = elem.Nombre
      dataModel.Prefix = generatePrefix(elem.Nombre)
      dataModel.Edad = elem.Edad
      dataModel.Altura = elem.Altura
      dataModel.Peso = elem.Peso

      dataArray.push(dataModel)

      dataModel = {
        Nombre: '',
        Prefix: '',
        Edad: '',
        Altura: '',
        Peso: ''
      }

      if ((index + 1) / count === 30) {
        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(dataArray)
        XLSX.utils.book_append_sheet(wb, ws, "Formulario_de_registro")
        XLSX.writeFile(wb, "Formulario-de-registro.xls")
        dataArray = []
        count++
      }
    })

    if (dataArray.length > 0) {
      let wb = XLSX.utils.book_new()
      let ws = XLSX.utils.json_to_sheet(dataArray)
      XLSX.utils.book_append_sheet(wb, ws, "Formulario_de_registro")
      XLSX.writeFile(wb, "Formulario-de-registro.xls")
    }
  }

  const onGenerateEvaluationFormat = () => {

    let beepTestDataModel = {
      nombre: '',
      evaluacionID: '',
      email: '',
      lvl: '',
      total: '',
      fecha: ''
    }

    let dataModel = {
      nombre: '',
      evaluacionID: '',
      email: '',
      resultado: '',
      fecha: ''
    }

    let dataArray = []

    // eslint-disable-next-line react/prop-types
    data.map(task => {

      dataArray.push(task)

      if (dataArray.length === 30) {

        let wb = XLSX.utils.book_new()

        evaluationNames.map(evaluation => {
          let evaluationDataArray = []
          // eslint-disable-next-line react/prop-types
          const isNothingInEvaluations = data.every(elem => elem[evaluation.name] === undefined)

          if (isNothingInEvaluations) {
            if(evaluation.id === 1){
              beepTestDataModel.evaluacionID = evaluation.id
              evaluationDataArray.push(beepTestDataModel)
            } else {
              dataModel.evaluacionID = evaluation.id
              evaluationDataArray.push(dataModel)
            }
          } else {

            // eslint-disable-next-line react/prop-types
            dataArray.map(elem => {

              let evaResult = elem[evaluation.name]

              if(evaluation.id === 1){
                beepTestDataModel.nombre = elem.Nombre
                beepTestDataModel.email = elem.Correo
                beepTestDataModel.evaluacionID = evaluation.id
                beepTestDataModel.lvl = evaResult.substring(0,evaResult.indexOf('.'))
                beepTestDataModel.total = evaResult.substring((evaResult.indexOf('.') + 1),evaResult.length)
                beepTestDataModel.fecha = elem.Fecha

                evaluationDataArray.push(beepTestDataModel)

                beepTestDataModel = {
                  nombre: '',
                  evaluacionID: '',
                  email: '',
                  lvl: '',
                  total: '',
                  fecha: ''
                }
              } else {
                dataModel.nombre = elem.Nombre
                dataModel.email = elem.Correo
                dataModel.evaluacionID = evaluation.id
                dataModel.resultado = elem[evaluation.name]
                dataModel.fecha = elem.Fecha

                evaluationDataArray.push(dataModel)

                dataModel = {
                  nombre: '',
                  evaluacionID: '',
                  email: '',
                  resultado: '',
                  fecha: ''
                }
              }

            })

          }

          let ws = XLSX.utils.json_to_sheet(evaluationDataArray)
          XLSX.utils.book_append_sheet(wb, ws, evaluation.name)

        })

        dataArray = []
        XLSX.writeFile(wb, "evaluacion-fisica-form.xls")

      }

    })


    if (dataArray.length > 0) {

      let wb = XLSX.utils.book_new()

      evaluationNames.map(evaluation => {
        let evaluationDataArray = []
        // eslint-disable-next-line react/prop-types
        const isNothingInEvaluations = data.every(elem => elem[evaluation.name] === undefined)

        if (isNothingInEvaluations) {
          if(evaluation.id === 1){
            beepTestDataModel.evaluacionID = evaluation.id
            evaluationDataArray.push(beepTestDataModel)
          } else {
            dataModel.evaluacionID = evaluation.id
            evaluationDataArray.push(dataModel)
          }
        } else {

          // eslint-disable-next-line react/prop-types
          dataArray.map(elem => {

            let evaResult = elem[evaluation.name].toString()

            if(evaluation.id === 1){
              beepTestDataModel.nombre = elem.Nombre
              beepTestDataModel.email = elem.Correo
              beepTestDataModel.evaluacionID = evaluation.id
              beepTestDataModel.lvl = evaResult.substring(0,evaResult.indexOf('.'))
              beepTestDataModel.total = evaResult.substring((evaResult.indexOf('.') + 1),evaResult.length)
              beepTestDataModel.fecha = elem.Fecha

              evaluationDataArray.push(beepTestDataModel)

              beepTestDataModel = {
                nombre: '',
                evaluacionID: '',
                email: '',
                lvl: '',
                total: '',
                fecha: ''
              }
            } else {
              dataModel.nombre = elem.Nombre
              dataModel.email = elem.Correo
              dataModel.evaluacionID = evaluation.id
              dataModel.resultado = elem[evaluation.name]
              dataModel.fecha = elem.Fecha

              evaluationDataArray.push(dataModel)

              dataModel = {
                nombre: '',
                evaluacionID: '',
                email: '',
                resultado: '',
                fecha: ''
              }
            }

          })

        }

        let ws = XLSX.utils.json_to_sheet(evaluationDataArray)
        XLSX.utils.book_append_sheet(wb, ws, evaluation.name)

      })

      dataArray = []
      XLSX.writeFile(wb, "evaluacion-fisica-form.xls")

    }

  }

  return (
      <div className="table-info">
        <table>
          <thead>
          <tr>
            {
                dataForShow.length > 0 && Object.keys(dataForShow[0]).map(elem => (
                    <th key={elem}>{elem}</th>
                ))
            }
          </tr>
          </thead>
          <tbody>
          {
            // eslint-disable-next-line react/prop-types
            dataForShow.map((elem, i) => (
                <tr key={i}>
                  {
                    Object.values(elem).map((value, i) => (
                        <td key={i}>{value}</td>
                    ))
                  }
                </tr>
            ))
          }
          </tbody>
        </table>
        <div className="generate-btns-container">
          <button className="generate-btn" onClick={onGenerateFormFormat}>
            Generar formato para registro
          </button>
          <button className="generate-btn" onClick={onGenerateEvaluationFormat}>
            Generar formato para evaluaciones
          </button>
          <button className="generate-btn" onClick={() => resetData([])}>
            Resetear datos
          </button>
        </div>
      </div>
  )
}

export default TableInfo