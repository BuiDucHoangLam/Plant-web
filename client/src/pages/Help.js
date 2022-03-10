import React from 'react'

import map from '../images/map.jpg'
import contact from '../images/contactimg.jpg'
import image from '../images/image.png'
import { useTranslation } from 'react-i18next'

import '../css/responsive.css'

const Help = () => {
  const {t} = useTranslation()
  return (
    <div class="main-layout" style={{marginTop: '120px',backgroundImage:`url(${image})`,paddingTop:'1px',paddingBottom:'1px'}}>

       <div id="contact" class="contact" style ={{width:'80%',margin:'80px auto ',padding:'50px',borderRadius:' 20px',background: 'rgba(255, 255, 255, .9)'}}>
          <div class="container">
            <div class="row">
                <div class="col-md-12">
                  <div class="titlepage">
                      <h3 style={{textAlign: 'center'}}>{t('searchHelp')}</h3>

                  </div>
                  
                  <div class="help-infor-search" style={{marginBottom: '15px'}}>
                      <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>{t('simpleSearch')}</h4>
                      <div style={{textAlign: 'justify'}}>{t('simpleSearchInfo')}</div>
                      <br />
                      <div class="row g-3">
                          <br />
                        <div class="col-md-4">
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>{t('name')}:</h4>
                            <div class="help-name">
                              <ul>
                                  <li>{t('scientificName')}</li>
                                  <li>{t('commonName')}</li>
                                  <li>{t('ordo')}</li>
                                  <li>{t('familia')}</li>
                                  <li>{t('genus')}</li>
                                  <li>{t('specie')}</li>
                              </ul>
                            </div>
                        </div>
                        <br />
                        <div class="col-md-4">
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>{t('location')}:</h4>
                            <div class="help-name">
                              <ul>
                                  <li>{t('scientificName')}</li>
                                  <li>{t('commonName')}</li>
                                  <li>{t('ordo')}</li>
                                  <li>{t('familia')}</li>
                                  <li>{t('genus')}</li>
                                  <li>{t('specie')}</li>
                              </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>{t('characteristics')}:</h4>
                            <div class="help-name">
                              <ul>
                                  <li>{t('background')}</li>
                                  <li>{t('flower')}</li>
                                  <li>{t('leave')}</li>
                                  <li>{t('fruit')}</li>
                                  <li>{t('clove')}</li>
                                  <li>{t('seed')}</li>
                                  <li>{t('useValue')}</li>
                              </ul>
                            </div>
                        </div>
                      </div>
   
                      {/* <h4 style={{fontSize: '24px', fontWeight: 'bold'}}>Multiple Search Terms</h4>
                      <h4 style={{textAlign: 'justify'}}>When using multiple search terms, POWO uses
                        AND searches. Typing a search and hitting "enter" allows you to type a second
                        term in the search bar. (For example, a search for "Orchidaceae", "yellow
                        flowers" and "Africa" would give a list of all orchids with yellow flowers
                        in Africa.) Individual search terms can be deleted by pressing the x on each one.
                      </h4> */}

                  </div>
                </div>
            </div>
            
          </div>
      </div>

    </div>
  )
}

export default Help
