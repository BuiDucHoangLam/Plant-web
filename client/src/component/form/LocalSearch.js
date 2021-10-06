import React from 'react'
import { useTranslation } from "react-i18next";

const LocalSearch = ({keyword,setKeyword}) => {
  const {t} = useTranslation()

  const handleSearchChange = e => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <input
      placeholder={t('search')}
      value= {keyword}
      onChange ={handleSearchChange}
      type='text'
      className="form-control mb-4"
    />
  )
}

export default LocalSearch
