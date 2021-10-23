import React from 'react'

import map from '../images/map.jpg'
import contact from '../images/contactimg.jpg'
import image from '../images/image.png'

const Help = () => {
  return (
    <div class="main-layout" style={{marginTop: '120px',backgroundImage:`url(${image})`,paddingTop:'1px',paddingBottom:'1px'}}>

       <div id="contact" class="contact" style ={{width:'80%',margin:'80px auto ',padding:'50px',borderRadius:' 20px'}}>
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
            
          </div>
      </div>

    </div>
  )
}

export default Help
