import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <ul className = "nav flex-column">
        <li className="nav-link">
          <Link to="/admin/dashboard">Danh mục</Link>
        </li>
        
        <li className="nav-link">
          <Link to="/admin/ordo">Bộ</Link>
        </li>
        <li className="nav-link">
          <Link to="/admin/familia">Họ</Link>
        </li>
        <li className="nav-link">
          <Link to="/admin/genus">Chi</Link>
        </li>
        <li className="nav-link">
          <Link to="/admin/specie">Loài</Link>
        </li>
        <li className="nav-link">
          <Link to="/admin/password">Mật khẩu</Link>
        </li>
      </ul>

    </nav>
  )
}

export default Nav
