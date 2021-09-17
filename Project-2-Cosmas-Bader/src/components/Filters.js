import React from 'react'

const Filters = ({ handleFilterChange, role, searchTerm }) => {
  return (
    <>
      <div className="filters d-flex justify-content-around" style={{marginBottom: '90px'}}>
        <select onChange={handleFilterChange} name="role" value={role}>
          <option value="All">All</option>
          <option value="Assassin">Assassin</option>
          <option value="Fighter">Fighter</option>
          <option value="Mage">Mage</option>
          <option value="Marksman">Marksman</option>
          <option value="Support">Support</option>
          <option value="Tank">Tank</option>
        </select>
        <input onChange={handleFilterChange} name="searchTerm" value={searchTerm} placeholder=' search champions'/>
      </div>
    </>
  )
}

export default Filters