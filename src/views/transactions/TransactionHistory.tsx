import { useEffect, useState } from 'react'

interface HistoryItem { 
  id: string
  date: string
  seller: string
  milkType: string
  quantity: number
  status: string
}

export default function TransactionHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        await new Promise(r => setTimeout(r, 400))
        setHistory([
          { id: 'h1', date: '2025-10-01', seller: 'Ravi', milkType: 'Cow', quantity: 20, status: 'Verified' },
          { id: 'h2', date: '2025-10-01', seller: 'Sita', milkType: 'Buffalo', quantity: 15, status: 'Pending' },
          { id: 'h3', date: '2025-10-02', seller: 'Mahesh', milkType: 'Cow', quantity: 18, status: 'Verified' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const filtered = history.filter(h => filter === 'All' || h.status === filter)

  return (
    <div>
      <h1>Transaction History</h1>
      
      <div>
        <label htmlFor="history-filter">Status Filter:</label>
        <select 
          id="history-filter" 
          aria-label="Status filter" 
          value={filter} 
          onChange={e => setFilter(e.target.value)}
        >
          {['All', 'Verified', 'Pending'].map(status => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>
      
      {loading && <p>Loading history...</p>}
      
      {!loading && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Seller</th>
                <th>Milk Type</th>
                <th>Quantity (L)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.seller}</td>
                  <td>{record.milkType}</td>
                  <td>{record.quantity}</td>
                  <td>
                    <span>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={5}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
