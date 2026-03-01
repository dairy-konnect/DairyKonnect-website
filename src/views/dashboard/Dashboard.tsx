import { useEffect, useState } from 'react'

interface Transaction { 
  id: string
  seller: string
  dairyOwner?: string
  quantity: number
  milkType: string
  date: string
}

interface UserContextLike { 
  role: 'dairyOwner' | 'milkSeller'
  id: string
}

// Mock user for demo purposes
const currentUser: UserContextLike = { role: 'dairyOwner', id: 'owner-1' }

export default function Dashboard() {
  const [data, setData] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Placeholder fetch simulation
        await new Promise(r => setTimeout(r, 400))
        
        if (currentUser.role === 'dairyOwner') {
          setData([
            { id: 't1', seller: 'Ravi', quantity: 22, milkType: 'Cow', date: '2025-10-04' },
            { id: 't2', seller: 'Sita', quantity: 18, milkType: 'Buffalo', date: '2025-10-04' },
          ])
        } else {
          setData([
            { id: 't3', seller: 'You', dairyOwner: 'Sunrise Dairy', quantity: 15, milkType: 'Cow', date: '2025-10-04' },
          ])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      
      {loading && <p>Loading...</p>}
      
      {!loading && currentUser.role === 'dairyOwner' && (
        <section>
          <h2>All Transactions</h2>
          <TransactionTable data={data} ownerView />
        </section>
      )}
      
      {!loading && currentUser.role === 'milkSeller' && (
        <section>
          <h2>Your Transactions</h2>
          <TransactionTable data={data} />
        </section>
      )}
    </div>
  )
}

function TransactionTable({ data, ownerView }: { data: Transaction[], ownerView?: boolean }) {
  if (!data.length) return <p>No transactions yet.</p>
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Seller</th>
            {!ownerView && <th>Dairy Owner</th>}
            <th>Milk Type</th>
            <th>Quantity (L)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.seller}</td>
              {!ownerView && <td>{transaction.dairyOwner}</td>}
              <td>{transaction.milkType}</td>
              <td>{transaction.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
