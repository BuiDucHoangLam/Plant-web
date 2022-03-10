import React, { useEffect, useState } from 'react'
import Chart from '../component/chart/Chart'
import { getListOrdo, getOrdo, getOrdoListFamilia, getOrdoListGenus, getOrdoListSpecie } from '../api/ordo'
import { getListFamilia } from '../api/familia'
import { getListGenus } from '../api/genus'
import { getSpecies } from '../api/specie'
import image from '../images/image.png'
import { useTranslation } from 'react-i18next'

import '../css/responsive.css'



const Statistics = () => {
  const { t } = useTranslation()
  const initialState = {
    labels: [`${t('ordo')}`, `${t('familia')}`, `${t('genus')}`, `${t('specie')}`],
    datasets: [
      {
        label: `${t('quantities')}`,
        data: [2, 5, 4, 5
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ]
      }
    ]
  }
  
  const initialStatePie = {
    labels: [`${t('north')}`, `${t('center')}`, `${t('south')}`],
    datasets: [
      {
        label: `${t('statisticsDistribution')}`, 
        data: [
          9,19,16
  
  
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
  
  
        ]
      },
  
    ]
  }

  const [chartData, setChartData] = useState(initialState)
  const [chartDataPie, setChartDataPie] = useState(initialStatePie)
  const [ordoList, setOrdoList] = useState([])
  const [familiaList, setFamiliaList] = useState([])
  const [genusList, setGenusList] = useState([])
  const [specieList, setSpecieList] = useState([])
  

  
  const north = 20.05
  const south = 12

  const loadData = async () => {
    let ordo, familia, genus, specie

    await getListOrdo().then(resO => {
      resO.data.map(o => {
        getOrdoListFamilia(o._id).then(rs => {
          const num = rs.data ? rs.data.length : 0
          o.familiaQuantity = num
        })
        getOrdoListGenus(o._id).then(rs => {
          const num = rs.data ? rs.data.length : 0
          o.genusQuantity = num
        })
        getOrdoListSpecie(o._id).then(rs => {
          const num = rs.data ? rs.data.length : 0
          o.specieQuantity = num
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
      let n = 0
      let c = 0
      let s = 0
      let sum = 0
      resS.data.map(s => {
        const northArr = []
        const southArr = []
        const centerArr = []
        const coordArr = []
        s.coordinates.map(c => {
          if (c[0] > north) {
            northArr.push(c)
          } else if (c[0] < south) {
            southArr.push(c)
          } else {
            centerArr.push(c)
          }
        })
        console.log('nor', northArr.length, 'cent', centerArr.length, 's', southArr.length, s.coordinates.length)

        s.statistics = [northArr.length, centerArr.length, southArr.length, s.coordinates.length]
      })
      setSpecieList(resS.data)
      resS.data.map(rs => {
        n += rs.statistics[0]
        c += rs.statistics[1]
        s += rs.statistics[2]
        sum += rs.statistics[3]
      })

      const valuePie = {
        labels: [`${t('north')}`, `${t('center')}`, `${t('south')}`],
        datasets: [
          {
            label: `${t('statisticsDistribution')}`, 
            data: [
              Math.round(n * 1000 / sum) / 10,
              Math.round(c * 1000 / sum) / 10,
              Math.round(s * 1000 / sum) / 10,


            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',


            ]
          },

        ]
      }

      setChartDataPie(valuePie)
      specie = resS.data.length
    })

    const value = {
      labels: [`${t('ordo')}`, `${t('familia')}`, `${t('genus')}`, `${t('specie')}`],
      datasets: [
        {
          label: `${t('quantities')}`,
          data: [
            ordo,
            familia,
            genus,
            specie

          ],
          backgroundColor: [
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

  }, [])


  return (
    <div className="main-layout" style={{ marginTop: '120px', backgroundImage: `url(${image})`, paddingTop: '1px', paddingBottom: '1px' }}>
      <div id="contact" className="contact" style={{ width: '80%', margin: '80px auto ', padding: '50px', borderRadius: ' 20px', background: 'rgba(255, 255, 255, .94)' }}>
        <div className="container">

          <div className="row" style={{ marginTop: '30px', marginLeft: '3px' }}>

            <div className="col-md-12 l-12">


              <div className="help-infor-search" style={{ marginBottom: '15px' }}>
                <div className='class-tt'>{t('statisticsOfPlants')}</div>
                <div className="help-name">
                  <ul>
                    <li>{ordoList.length} order</li>
                    <li>{familiaList.length} family</li>
                    <li>{genusList.length} genus</li>
                    <li>{specieList.length} species</li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className="titlepage" style={{ paddingTop: '20px' }}>
                <div className='class-tt'>{t('statisticsQuantities')}</div>

              </div>
              <div className='statistics__child' style={{ maxWidth: '40vw', margin: '0 auto' }}>
                <Chart
                  chartData={chartData}
                  type='bar'
                  legendPosition="bottom"
                />
              </div>

              <div className="titlepage" style={{ paddingTop: '20px' }}>
                <div className='class-tt'>{t('statisticsDistribution')}, </div>

              </div>
              <div className='statistics__child' style={{ maxWidth: '40vw', margin: '0 auto' }}>
                <Chart
                  chartData={chartDataPie}
                  type='pie'
                  legendPosition="bottom"
                />
              </div>

            </div>
          </div>

          <div className="row">
            <p>METRICS</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  {/* <th scope="col"></th> */}
                  <th scope="col">{t('ordo')}</th>
                  <th scope="col">{t('familia')} </th>
                  <th scope="col">{t('genus')}</th>
                  <th scope="col">{t('specie')} </th>
                </tr>
              </thead>
              <tbody>
                {(ordoList && ordoList.length > 0) && ordoList.map((o, index) =>

                  <tr key={index}>
                    {/* <th scope="row">{index+1}</th> */}
                    <td>{o.name}</td>
                    <td>{o.familiaQuantity}</td>
                    <td>{o.genusQuantity}</td>
                    <td>{o.specieQuantity}</td>


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
