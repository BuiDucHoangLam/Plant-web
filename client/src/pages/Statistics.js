import React from 'react'

import logo from '../images/logo.png'
import icon from '../images/search_icon.png'

const Statistics = () => {
  return (
    <div class="main-layout">
        
        {/* <!-- end header --> */}



        <div id="contact" class="contact" style={{marginTop: '50px'}}>
            <div class="container">
                <div class="row" style={{marginTop: '30px',marginLeft:'3px'}}>
                    <div class="fs-4 mb-3">
                        <a href="../greeno/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                            </svg> <b>Home</b> / </a>
                        <a href="#">Statistics</a>
                    </div>
                </div>
                <div class="row">

                    <div class="col-md-12">
                        <div class="help-infor-search" style={{marginBottom: '15px'}}>
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Statistics</h4>
                            <h4 style={{textAlign: 'justify'}}>Species of The Plant List contained within The Plant List belong to 642 plant families and 17,020 plant genera.</h4>
                            <h4 style={{textAlign: 'justify'}}>The Plant List includes 1,064,035 scientific plant names of species rank for the The Plant List. Of these 350,699 are accepted species names.</h4>
                            <h4 style={{textAlign: 'justify'}}>
                                The Plant List includes a further 229,650 scientific plant names of infraspecific rank for the The Plant List.</h4>
                        </div>
                        <div class="help-infor-search" style={{marginBottom: '15px'}}>
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Statistics of vegetable quantities</h4>
                            <div class="help-name">
                                <ul>
                                    <li>6 division</li>
                                    <li>7 class</li>
                                    <li>63 order</li>
                                    <li>101 family</li>
                                    <li>303 genus</li>
                                    <li>610 species</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row">
                    <p>METRICS</p>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Major Group</th>
                                <th scope="col">Families </th>
                                <th scope="col">Genus</th>
                                <th scope="col">Species </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Angiosperms</td>
                                <td>416 </td>
                                <td>13.000</td>
                                <td>352.000</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Gymnosperms</td>
                                <td>12</td>
                                <td>83</td>
                                <td>1000</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Pteridophytes</td>
                                <td>-</td>
                                <td>-</td>
                                <td>13,000</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Bryophytes</td>
                                <td>-</td>
                                <td>-</td>
                                <td>20,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        </div>


{/* 
        <!-- <div id="plant" class="plants">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="plants-box">
                            <h3> Species names</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="plants-box">
                            <figure><img src="images/plant2.jpg" alt="img" /></figure>
                            <h3> All names</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumletters, as opposed to using</p>
                        </div>
                    </div>

                </div>
            </div>
        </div> --> */}

    </div>
  )
}

export default Statistics
