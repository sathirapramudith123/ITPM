import { useEffect, useState } from 'react'
import api from '../api'

function CareerResources() {
  const [resources, setResources] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    api.get('/resume/resources')
      .then(res => {
        setResources(res.data)
        setError(null)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load resources. Please try again later.')
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p>{error}</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Career Resources</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Articles Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="bg-blue-600 px-4 py-3">
            <h3 className="text-xl font-semibold text-white">Helpful Articles</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {resources.articles.map((article, index) => (
                <li key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <a 
                    href={article.url} 
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-start"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="bg-green-600 px-4 py-3">
            <h3 className="text-xl font-semibold text-white">Useful Tools</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {resources.tools.map((tool, index) => (
                <li key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <a 
                    href={tool.url} 
                    className="text-green-600 hover:text-green-800 hover:underline flex items-start"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline-block bg-green-100 text-green-800 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerResources