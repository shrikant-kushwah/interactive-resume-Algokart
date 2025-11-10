import React, { useState, useMemo } from 'react'
import resumeData from '../constants/resume.json'
import SkillChips from './SkillChips'
import Timeline from './Timeline'
import ViewSwitch from './ViewSwitch'
import { useNavigate } from 'react-router-dom'

const Resume = ({ user, onLogout }) => {

  const [query, setQuery] = useState('')
  const [skills, setSkills] = useState([])
  const [view, setView] = useState('cards')
  const navigate = useNavigate()


  const handleLogout = () => {
    onLogout()
    navigate('/')
  }



  const allSkills = useMemo(() => {
    const experienceSkills =
      resumeData.experiences?.flatMap(exp => exp.skills || []) ?? []

    const categorizedSkills = resumeData.allSkills ? Object.values(resumeData.allSkills).flat() : []

    const uniqueSkills = [...new Set([...experienceSkills, ...categorizedSkills])]

    return uniqueSkills
  }, [resumeData.experiences, resumeData.allSkills])



  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()

    return resumeData.experiences.filter(e => {
      let matchesQuery = true
      if (q) {
        matchesQuery = e.role.toLowerCase().includes(q) || e.company.toLowerCase().includes(q) || (e.skills && e.skills.some(skill => skill.toLowerCase().includes(q)))
      }

      let matchesSkills = true
      if (skills.length > 0) {
        matchesSkills = skills.every(s => e.skills && e.skills.includes(s))
      }

      return matchesQuery && matchesSkills
    })
  }, [query, skills])


  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 print:p-0 print:bg-white">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">

            <h1 className="text-2xl sm:text-2xl font-semibold text-gray-900 w-full sm:w-auto text-center sm:text-left">
              INTERACTIVE RESUME
            </h1>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">

              <div className="w-full sm:w-56">
                <label htmlFor="search-input" className="sr-only">Search roles, companies, or skills</label>
                <input
                  id="search-input"
                  type="search"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Search roles, companies, skills..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search resume content"
                />
              </div>

              <div className="flex flex-row sm:flex-row items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={handleDownloadPDF}
                  className="flex-1 sm:flex-none px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm sm:text-base hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none transition"
                  aria-label="Download resume as PDF"
                >
                  Download PDF
                </button>

                <button
                  onClick={handleLogout}
                  className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm sm:text-base hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none transition"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-8 print:p-0">
        <div className="grid md:grid-cols-3 gap-6 print:block">
          <aside className="space-y-4 md:col-span-1 print:w-full print:m-0 print:p-0" aria-label="Resume filters and controls">

            {/* personal info card */}
            <section className="bg-white p-4 rounded-xl shadow print-header print:border-b-2 print:border-gray-800 print:pb-3 print:mb-4 print:shadow-none">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-900 print:text-2xl print:font-bold print:mb-1 print:text-black">{resumeData.name}</h2>
                <p className="text-gray-600 text-sm font-medium print:text-base print:font-semibold print:mb-3 print:text-gray-700">{resumeData.title}</p>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-600 print:flex print:flex-wrap print:gap-3 print:text-xs print:m-0 print:space-y-0">

                {/* contact details */}
                {resumeData.contact?.location && (
                  <p className="print:m-0 print:p-0">{resumeData.contact.location}</p>
                )}

                {resumeData.contact?.phone && (
                  <p className="print:m-0 print:p-0">{resumeData.contact.phone}</p>
                )}

                {resumeData.contact?.email && (
                  <p className="print:m-0 print:p-0">
                    <a
                      href={`mailto:${resumeData.contact.email}`}
                      className="text-indigo-600 hover:text-indigo-700 underline print:text-black"
                    >
                      {resumeData.contact.email}
                    </a>
                  </p>
                )}

                {/* social media links */}
                <div className="flex gap-3 mt-2 print:gap-3 print:mt-0">

                  {resumeData.contact?.linkedin && (
                    <a
                      href={resumeData.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium print:text-black print:text-xs print:underline"
                      aria-label="LinkedIn profile"
                    >
                      LinkedIn
                    </a>
                  )}

                  {resumeData.contact?.github && (
                    <a
                      href={resumeData.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium print:text-black print:text-xs print:underline"
                      aria-label="GitHub profile"
                    >
                      GitHub
                    </a>
                  )}

                </div>
              </div>
            </section>

            {/* objective section */}
            {resumeData.objective && (
              <section className="bg-white p-4 rounded-xl shadow print-section print:mb-4 print:shadow-none print:p-0">
                <h3 className="font-medium mb-2 text-gray-900 print:text-base print:font-bold print:border-b print:border-gray-800 print:pb-1 print:mb-2 print:mt-4 print:text-black">Objective</h3>
                <p className="text-gray-700 text-sm leading-relaxed print:text-sm print:leading-relaxed">{resumeData.objective}</p>
              </section>
            )}

            {/* skills organized by category */}
            {resumeData.allSkills && (
              <section className="bg-white p-4 rounded-xl shadow print-section print:mb-4 print:shadow-none print:p-0">
                <h3 className="font-medium mb-3 text-gray-900 print:text-base print:font-bold print:border-b print:border-gray-800 print:pb-1 print:mb-2 print:mt-4 print:text-black">Skills</h3>
                <div className="space-y-3 print:space-y-2">
                  {/* frontend skills */}
                  {resumeData.allSkills.frontend && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1 print:text-xs print:font-semibold print:mt-2 print:mb-1">Frontend</h4>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.allSkills.frontend.map(skill => (
                          <span key={skill} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full print:inline-block print:px-2 print:py-0.5 print:mr-1 print:mb-1 print:border print:border-gray-400 print:rounded print:text-xs print:bg-white print:text-black">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* backend skills */}
                  {resumeData.allSkills.backend && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1 print:text-xs print:font-semibold print:mt-2 print:mb-1">Backend</h4>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.allSkills.backend.map(skill => (
                          <span key={skill} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full print:inline-block print:px-2 print:py-0.5 print:mr-1 print:mb-1 print:border print:border-gray-400 print:rounded print:text-xs print:bg-white print:text-black">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* API related */}
                  {resumeData.allSkills.apis && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1 print:text-xs print:font-semibold print:mt-2 print:mb-1">APIs</h4>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.allSkills.apis.map(skill => (
                          <span key={skill} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full print:inline-block print:px-2 print:py-0.5 print:mr-1 print:mb-1 print:border print:border-gray-400 print:rounded print:text-xs print:bg-white print:text-black">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* tools and utilities */}
                  {resumeData.allSkills.tools && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-1 print:text-xs print:font-semibold print:mt-2 print:mb-1">Tools</h4>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.allSkills.tools.map(skill => (
                          <span key={skill} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full print:inline-block print:px-2 print:py-0.5 print:mr-1 print:mb-1 print:border print:border-gray-400 print:rounded print:text-xs print:bg-white print:text-black">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* education history */}
            {resumeData.education && resumeData.education.length > 0 && (
              <section className="bg-white p-4 rounded-xl shadow print-section print:mb-4 print:shadow-none print:p-0">
                <h3 className="font-medium mb-3 text-gray-900 print:text-base print:font-bold print:border-b print:border-gray-800 print:pb-1 print:mb-2 print:mt-4 print:text-black">Education</h3>
                <div className="space-y-3 print:space-y-2">
                  {resumeData.education.map(edu => (
                    <div key={edu.id} className="border-l-2 border-indigo-200 pl-3 print:mb-2 print:pl-3 print:border-l-2 print:border-gray-400">
                      <h4 className="font-semibold text-sm text-gray-900 print:text-sm print:font-semibold print:mb-0.5">{edu.degree}</h4>
                      <p className="text-xs text-gray-600 print:text-xs">{edu.institution}</p>
                      <p className="text-xs text-gray-500 print:text-xs">{edu.date}</p>
                      {edu.grade && (
                        <p className="text-xs text-gray-600 mt-1 print:text-xs">{edu.grade}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* skill filter */}
            <section className="bg-white p-4 rounded-xl shadow no-print">
              <h3 className="font-medium mb-2 text-gray-900">Filter by Skills</h3>
              <SkillChips skills={allSkills} selected={skills} onChange={setSkills} />
            </section>

            {/* toggle between cards and table view */}
            <section className="bg-white p-4 rounded-xl shadow no-print">
              <h3 className="font-medium mb-2 text-gray-900">View</h3>
              <ViewSwitch value={view} onChange={setView} />
            </section>
          </aside>

          {/* main content area */}
          <main className="md:col-span-2 space-y-4 print:w-full print:max-w-full print:m-0 print:p-0 print:mt-6">
            {/* show message if no results */}
            {filtered.length === 0 ? (
              <div className="p-6 bg-white rounded-xl text-center text-gray-500 shadow print:hidden" role="status" aria-live="polite">
                <p>No results found. Try adjusting your search or filters.</p>
              </div>
            ) : view === 'cards' ? (
              // cards layout (mobile)
              <div className="grid gap-4 md:grid-cols-2 print:block">
                {filtered.map(exp => (
                  <article
                    key={exp.id}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-indigo-500 outline-none print:mb-4 print:p-3 print:border-l-2 print:border-gray-600 print:pl-4 print:shadow-none"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 print:text-base print:font-bold print:mb-1 print:text-black">{exp.role}</h3>
                        <p className="text-gray-600 text-sm print:text-sm print:font-medium print:text-gray-700 print:mb-2">{exp.company} · {exp.date}</p>
                        {/* show type badge if available */}
                        {exp.type && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full print:inline-block print:px-2 print:py-0.5 print:ml-2 print:border print:border-gray-600 print:rounded print:text-xs print:bg-white print:text-black">
                            {exp.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* description */}
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed print:text-sm print:leading-relaxed print:mt-2">{exp.summary}</p>

                    {/* skills used in this project */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 print:mt-2" role="list" aria-label="Skills">
                        {exp.skills.map(s => (
                          <span key={s} className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full print:inline-block print:px-2 print:py-0.5 print:mr-1 print:mb-1 print:border print:border-gray-400 print:rounded print:text-xs print:bg-white print:text-black" role="listitem">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* links to live demo and github */}
                    {exp.links && (
                      <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100 print:mt-2 print:pt-2">
                        {exp.links.live && (
                          <a
                            href={exp.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium underline print:text-black print:text-xs print:mr-3"
                            aria-label="View live demo"
                          >
                            Live Demo →
                          </a>
                        )}
                        {exp.links.github && (
                          <a
                            href={exp.links.github}
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
                  </article>
                ))}
              </div>
            ) : (
              // table view 
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow print:w-full print:border-collapse print:mt-2" role="table" aria-label="Work experience">
                  <thead className="print:bg-gray-100">
                    <tr className="bg-gray-100 print:bg-gray-100">
                      <th className="text-left p-3 font-semibold text-gray-900 print:p-2 print:text-left print:font-bold print:text-xs print:border print:border-gray-600 print:bg-gray-100 print:text-black">Role</th>
                      <th className="text-left p-3 font-semibold text-gray-900 print:p-2 print:text-left print:font-bold print:text-xs print:border print:border-gray-600 print:bg-gray-100 print:text-black">Company/Project</th>
                      <th className="text-left p-3 font-semibold text-gray-900 print:p-2 print:text-left print:font-bold print:text-xs print:border print:border-gray-600 print:bg-gray-100 print:text-black">Date</th>
                      <th className="text-left p-3 font-semibold text-gray-900 print:p-2 print:text-left print:font-bold print:text-xs print:border print:border-gray-600 print:bg-gray-100 print:text-black">Skills</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(e => (
                      <tr key={e.id} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="p-3 text-gray-900 print:p-2 print:text-xs print:border print:border-gray-300 print:text-black">{e.role}</td>
                        <td className="p-3 text-gray-700 print:p-2 print:text-xs print:border print:border-gray-300 print:text-black">{e.company}</td>
                        <td className="p-3 text-gray-700 print:p-2 print:text-xs print:border print:border-gray-300 print:text-black">{e.date}</td>
                        <td className="p-3 text-gray-700 print:p-2 print:text-xs print:border print:border-gray-300 print:text-black">{e.skills?.join(', ') || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* timeline component */}
            <div className="print-timeline print:mt-6">
              <Timeline experiences={filtered} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Resume
