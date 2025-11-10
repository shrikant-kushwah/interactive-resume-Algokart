import React from 'react'

const ViewSwitch = ({ value, onChange }) => {
  return (
    <div className="flex gap-3 print:hidden" role="group" aria-label="View options">
      <button 
        onClick={() => onChange('cards')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onChange('cards')
          }
        }}
        className={`px-4 py-2 rounded-lg border font-medium transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none ${
          value === 'cards'
            ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
        aria-pressed={value === 'cards'}
        aria-label="Switch to cards view"
      >
        Cards
      </button>
      <button 
        onClick={() => onChange('table')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onChange('table')
          }
        }}
        className={`px-4 py-2 rounded-lg border font-medium transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none ${
          value === 'table'
            ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
        aria-pressed={value === 'table'}
        aria-label="Switch to table view"
      >
        Table
      </button>
    </div>
  )
}

export default ViewSwitch