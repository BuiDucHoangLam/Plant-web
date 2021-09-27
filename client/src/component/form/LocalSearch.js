import React from 'react'

const LocalSearch = ({keyword,setKeyword}) => {
  const handleSearchChange = e => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <input
      placeholder='Tìm kiếm'
      value= {keyword}
      onChange ={handleSearchChange}
      type='text'
      className="form-control mb-4"
    />
  )
}

export default LocalSearch
