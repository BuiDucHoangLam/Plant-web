import React from 'react'

import map from '../images/map.jpg'
import contact from '../images/contactimg.jpg'

const Help = () => {
  return (
    <div class="main-layout">

       <div id="contact" class="contact" style={{marginTop: '50px'}}>
          <div class="container">
            <div class="row">
                <div class="col-md-12">
                  <div class="titlepage">
                      <h3 style={{textAlign: 'center'}}>Search help</h3>

                  </div>
                  <div class="help-infor-search" style={{marginBottom: '15px'}}>
                      <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Simple Search</h4>
                      <h4 style={{textAlign: 'justify'}}>Currently, you can search by name, geographical location and by using adjectives to describe plant characteristics. To make sure you get the right result it is advised to spell terms correctly, in particular on the use of capital letters or select the correct option from the list of suggestions.
                        (e.g. using a capital letter for Belgium will be interpreted as a geographic area while searching on "belgium" will not) The kind of restricted search you made will also be displayed in the search box (e.g. "location:Belgium" indicates that your search was interpreted as a geographic search and data
                        are returned for which this term is found in the distribution section of each record) You can also directly use the restricted terms "name:", "location:" and "characteristic:" before your search term.</h4>
                      <div class="row g-3">
                        <div class="col-md-4">
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Name:</h4>
                            <div class="help-name">
                              <ul>
                                  <li>Scientific Name</li>
                                  <li>Common name</li>
                                  <li>Family</li>
                                  <li>Genus</li>
                                  <li>Species</li>
                                  <li>Author of plant names (using IPNI standard form)</li>
                              </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Location:</h4>
                            <div class="help-name">
                              <ul>
                                  <li>Scientific Name</li>
                                  <li>Common name</li>
                                  <li>Family</li>
                                  <li>Genus</li>
                                  <li>Species</li>
                                  <li>Author of plant names (using IPNI standard form)</li>
                              </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Characteristic:</h4>
                            <div class="help-name">
                              <ul>
                                  <li>Appearance (e.g. small pink flowers)</li>
                                  <li>Flower (e.g monoecious; hairy sepals)</li>
                                  <li>Fruit (e.g fleshy yellow fruit)</li>
                                  <li>Leaf (e.g linear leaves; no leaves)</li>
                                  <li>Inflorescence (e.g terminal panicle)</li>
                                  <li>Seed (e.g circular seed)</li>
                                  <li>Use (e.g medicine)</li>
                              </ul>
                            </div>
                        </div>
                      </div>
                      <br/>
                      <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Multiple Search Terms</h4>
                      <h4 style={{textAlign: 'justify'}}>When using multiple search terms, POWO uses
                        AND searches. Typing a search and hitting "enter" allows you to type a second
                        term in the search bar. (For example, a search for "Orchidaceae", "yellow
                        flowers" and "Africa" would give a list of all orchids with yellow flowers
                        in Africa.) Individual search terms can be deleted by pressing the x on each one.
                      </h4>

                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                  <div class="titlepage">
                      <h3 style={{textAlign: 'center'}}>Contact Us</h3>
                      <span style={{textAlign: 'center' ,marginBottom: '5px'}} >For further information, to provide feedback, or make an enquiry about POWO, please please contact:</span>
                  </div>
                </div>
            </div>

            <div class="row" style={{marginBottom: '10px'}}>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-map-marker"></span>
                      </div>
                      <div class="text">
                        <p><span>Address:</span> 01 Phù Đổng Thiên Vương, Phường 8, Thành Phố Đà Lạt</p>
                      </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-phone"></span>
                      </div>
                      <div class="text">
                        <p><span>Phone:</span> <a href="tel://1234567920">(+084 123456789)</a></p>
                      </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-envelope-o"></span>
                      </div>
                      <div class="text">
                        <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@it.dlu.edu.vn</a>
                        </p>
                      </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                      <div class="icon d-flex align-items-center justify-content-center">
                        <span class="fa fa-globe"></span>
                      </div>
                      <div class="text">
                        <p><span>Website</span> <a href="#">yoursite.com</a></p>
                      </div>
                  </div>
                </div>
            </div>

            <div class="row" style={{marginBottom: '10px'}}>
                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 paddimg-right">
                  <div class="row">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <form>
                            <div class="row">
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input class="form-control" placeholder="Name" type="text" name="Name" />
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input class="form-control" placeholder="Email" type="text" name="Email"/>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input class="form-control" placeholder="Phone" type="text" name="Phone"/>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <textarea class="textarea>" placeholder="Message" type="text" name="Message"></textarea>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <a href="#">Read More</a>
                              </div>
                            </div>
                        </form>
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div class="map_section">
                            <figure><img src={map}/></figure>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 paddimg-left">
                  <div class="Nursery-img">
                      <figure>
                        <img src={contact} alt="img" />
                        <div class="text-box">
                            <h3>Best Green Nursery</h3>
                        </div>
                      </figure>
                  </div>
                </div>
            </div>
          </div>
      </div>

    </div>
  )
}

export default Help
