import React, { useState } from 'react'

const Timeline = ({ experiences }) => {
  const [expanded, setExpanded] = useState({})

  const toggleExpanded = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <section className="bg-white p-4 rounded-xl shadow print-section print:mb-4 print:shadow-none print:p-0" aria-label="Work experience timeline">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 print:text-base print:font-bold print:border-b print:border-gray-800 print:pb-1 print:mb-3 print:mt-4 print:text-black">Timeline</h3>
      <ul className="border-l-2 border-indigo-200 pl-4 space-y-6 print:border-l-2 print:border-gray-600 print:pl-4 print:space-y-4" role="list">

        {experiences.map((e) => (
          <li key={e.id} className="relative print:mb-4">
            <div className="absolute -left-[9px] mx-1 top-1 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white print:hidden"></div>
            <div className="flex flex-col">
              <button
                onClick={() => toggleExpanded(e.id)}
                className="text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-1 -m-1 transition-colors print:hidden"
                aria-expanded={expanded[e.id] || false}
                aria-controls={`timeline-details-${e.id}`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <span className="font-semibold mx-3 text-gray-900 block">{e.role}</span>
                    <span className="text-gray-600 text-sm block">{e.company} · {e.date}</span>

                    {e.type && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                        {e.type}
                      </span>
                    )}

                  </div>
                </div>
                <span className="text-indigo-600 text-xs mt-1 block">
                  {expanded[e.id] ? 'Click to collapse' : 'Click to expand'}
                </span>
              </button>
              {/* Print-only content */}
              <div className="hidden print:block">
                <span className="font-semibold text-gray-900 block print:text-base print:font-bold print:mb-1 print:text-black">{e.role}</span>
                <span className="text-gray-600 text-sm block print:text-sm print:text-gray-700 print:mb-2">{e.company} · {e.date}</span>

                {e.type && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full print:inline-block print:px-2 print:py-0.5 print:ml-2 print:border print:border-gray-600 print:rounded print:text-xs print:bg-white print:text-black">
                    {e.type}
                  </span>
                )}

              </div>
              <div
                id={`timeline-details-${e.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out print:block print:mt-2 ${expanded[e.id] ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                aria-hidden={!expanded[e.id]}
              >
                <p className="text-gray-700 text-sm leading-relaxed print:text-sm print:leading-relaxed">{e.summary}</p>

                {e.skills && e.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 print:mt-2" role="list" aria-label="Skills">
                    {e.skills.map(s => (
                      <span key={s} className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full print:inline-block print:px-2 print:py-0.5 print:mr-1 print:mb-1 print:border print:border-gray-400 print:rounded print:text-xs print:bg-white print:text-black" role="listitem">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {e.links && (
                  <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100 print:mt-2 print:pt-2">
                    {e.links.live && (
                      <a
                        href={e.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium underline print:text-black print:text-xs print:mr-3"
                        aria-label="View live demo"
                      >
                        Live Demo →
                      </a>
                    )}

                    {e.links.github && (
                      <a
                        href={e.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium underline print:text-black print:text-xs print:mr-3"
                        aria-label="View GitHub repository"
                      >
                        GitHub →
                      </a>
                    )}

                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Timeline
