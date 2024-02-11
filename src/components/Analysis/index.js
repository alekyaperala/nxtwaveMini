import React, {useState, useEffect} from 'react'
import {PieChart, Pie, Cell, Tooltip} from 'recharts'

const apiKey = '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'
const apiUrl = 'https://apis2.ccbp.in/gpv/analysis'

const Analysis = ({username}) => {
  const [loading, setLoading] = useState(true)
  const [analysisData, setAnalysisData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAnalysisData()
  }, [])

  const fetchAnalysisData = () => {
    if (!username) {
      setError('No username provided.')
      setLoading(false)
      return
    }

    fetch(`${apiUrl}?username=${username}&api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        if (data.success) {
          setAnalysisData(data.analysisDetails)
        } else {
          setError(data.error)
        }
      })
      .catch(error => {
        setLoading(false)
        setError('Error fetching data. Please try again later.')
      })
  }

  const handleTryAgain = () => {
    setLoading(true)
    fetchAnalysisData()
  }

  return (
    <div>
      <h1>User Analysis</h1>

      {loading && <p>Loading...</p>}

      {analysisData && (
        <div>
          <h2>Analysis Details</h2>
          <p>Insert analysis details here...</p>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      )}

      {error && (
        <div>
          <p>{error}</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  )
}

export default Analysis
