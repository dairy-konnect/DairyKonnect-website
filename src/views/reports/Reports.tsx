import { useEffect, useState } from 'react'

interface Report { 
  id: string
  detail: string
  metric: number
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        await new Promise(r => setTimeout(r, 300))
        setReports([
          { id: 'r1', detail: 'Total Cow Milk (L) last 15 days', metric: 820 },
          { id: 'r2', detail: 'Total Buffalo Milk (L) last 15 days', metric: 410 },
          { id: 'r3', detail: 'Average Daily Volume (L)', metric: 82 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  return (
    <div>
      <h1>Reports</h1>
      
      {loading && <p>Loading reports...</p>}
      
      {!loading && (
        <div>
          <div>
            {reports.map(report => (
              <div key={report.id}>
                <h3>
                  {report.detail}
                </h3>
                <p>
                  {report.metric}
                </p>
              </div>
            ))}
          </div>
          
          <div>
            <h2>
              Detailed Analytics
            </h2>
            <p>
              More detailed reporting features will be available soon. This section will include:
            </p>
            <ul>
              <li>Monthly transaction summaries</li>
              <li>Seller performance metrics</li>
              <li>Revenue analysis and trends</li>
              <li>Export capabilities for accounting</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
