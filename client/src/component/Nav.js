import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const Nav = () => {
  const {t} = useTranslation()
  return (
    
      <ul className = "nav flex-column">
        <li className="nav-link">
          <Link to="/admin/dashboard">{t('dashboard')}</Link>
        </li>
        
        <li className="nav-link">
          <Link to="/admin/ordo">{t('ordo')}</Link>
        </li>
        <li className="nav-link">
          <Link to="/admin/familia">{t('familia')}</Link>
        </li>
        <li className="nav-link">
          <Link to="/admin/genus">{t('genus')}</Link>
        </li>
        <li className="nav-link">
          <Link to="/admin/specie">{t('specie')}</Link>
        </li>
        <li className="nav-link nav-password__child">
          <Link to="/admin/password">{t('password')}</Link>
        </li>
      </ul>

    
  )
}

export default Nav
