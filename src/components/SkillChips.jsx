import React from 'react'

const SkillChips = ({ skills, selected, onChange }) => {
  const toggle = (s) => {
    onChange(selected.includes(s) ? selected.filter(x => x !== s) : [...selected, s])
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by skills">
      {skills.map(s => {
        const isSelected = selected.includes(s)
        return (
          <button
            key={s}
            onClick={() => toggle(s)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggle(s)
              }
            }}
            className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none ${isSelected
                ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            aria-pressed={isSelected}
            aria-label={`${isSelected ? 'Remove' : 'Add'} ${s} filter`}
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}

export default SkillChips
