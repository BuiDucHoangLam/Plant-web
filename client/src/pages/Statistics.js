import React, { useEffect, useState } from 'react'
import Chart from '../component/chart/Chart'
import { getListOrdo,getOrdo,getOrdoListFamilia,getOrdoListGenus,getOrdoListSpecie } from '../api/ordo'
import { getListFamilia } from '../api/familia'
import { getListGenus } from '../api/genus'
import { getSpecies } from '../api/specie'
import image from '../images/image.png'

const initialState = {
    labels: ['Ordo', 'Familia', 'Genus','Specie'],
    datasets:[
        {
          label:'Population',
          data:[     
          ],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',    
          ]
        }
    ]
}

const Statistics = () => {
    const [chartData,setChartData] = useState(initialState)
    const [ordoList,setOrdoList] = useState([])
    const [familiaList,setFamiliaList] = useState([])
    const [genusList,setGenusList] = useState([])
    const [specieList,setSpecieList] = useState([])
    const [numFamilia,setNumFamilia] = useState([])
    const [numGenus,setNumGenus] = useState([])
    const [numSpecie,setNumSpecie] = useState([])

    const loadData = async () => {
        let ordo,familia,genus,specie
        let arrF = []
        let arrG = []
        let arrS = []
        await getListOrdo().then(resO =>  {
            resO.data.map(o => {
                getOrdoListFamilia(o._id).then(rs => {
                    const num = rs.data ? rs.data.length : 0
                    arrF.push(num)
                    setNumFamilia(arrF)
                })
                getOrdoListGenus(o._id).then(rs => {
                    const num = rs.data ? rs.data.length : 0
                    arrG.push(num)
                    setNumGenus(arrG)
                })
                getOrdoListSpecie(o._id).then(rs => {
                    
                    const num = rs.data ? rs.data.length : 0
                    arrS.push(num)
                    setNumSpecie(arrS)
                })
            }) 
        setOrdoList(resO.data)

        ordo = resO.data.length
        })

        await getListFamilia().then(resF => {
            setFamiliaList(resF.data)
            familia = resF.data.length
           
            
        })
        await getListGenus().then(resG => {
            setGenusList(resG.data)
            genus = resG.data.length
         
           
        })
        await getSpecies().then(resS => {
            setSpecieList(resS.data)                     
            specie = resS.data.length
          
        })
  
        const value = {
            labels: ['Ordo', 'Familia', 'Genus', 'Specie'],
            datasets:[
                {
                  label:'Quantities',
                  data:[
                    ordo,
                    familia,
                    genus,
                    specie
                
                  ],
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
              
                  ]
                },
               
            ]
        }

        setChartData(value)
    }
    
    useEffect(() => {
        loadData()
       
    },[])

//   console.log('fa',numFamilia,'ge',numGenus,'sp',numSpecie);
    

  return (
    <div className="main-layout" style={{marginTop: '120px',backgroundImage:`url(${image})`,paddingTop:'1px',paddingBottom:'1px'}}>
        <div id="contact" className="contact" style ={{width:'80%',margin:'80px auto ',padding:'50px',borderRadius:' 20px'}}>
            <div className="container">
           
                <div className="row" style={{marginTop: '30px',marginLeft:'3px'}}>

                    <div className="col-md-12">
                     
                        
                        <div className="help-infor-search" style={{marginBottom: '15px'}}>
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Statistics of vegetable quantities</h4>
                            <div className="help-name">
                                <ul>
                                    <li>{ordoList.length} order</li>
                                    <li>{familiaList.length} family</li>
                                    <li>{genusList.length} genus</li>
                                    <li>{specieList.length} species</li>
                                </ul>
                            </div>
                        </div>

                        <Chart
                            chartData={chartData} 
                            
                            legendPosition="bottom"
                        />

                    </div>
                </div>

                <div className="row">
                    <p>METRICS</p>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Ordo</th>
                                <th scope="col">Families </th>
                                <th scope="col">Genus</th>
                                <th scope="col">Species </th>
                            </tr>
                        </thead>
                        <tbody>
                           {(ordoList && ordoList.length > 0) && ordoList.map((o,index) => <tr key = {index}>
                                <th scope="row">{index+1}</th>
                                <td>{o.name}</td>
                              
                                <td>{numFamilia[index]} </td>
                                <td>{numGenus[index]}</td>
                                <td>{numSpecie[index]}</td>
                            </tr>)}                          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Statistics
