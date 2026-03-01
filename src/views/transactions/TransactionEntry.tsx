import { useState } from 'react'

interface Entry { 
  id: string
  date: string
  milkType: string
  quantity: number
}

export default function TransactionEntry() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [date, setDate] = useState('')
  const [milkType, setMilkType] = useState('Cow')
  const [quantity, setQuantity] = useState<number>(0)

  const addEntry = () => {
    if (!date || !quantity) return
    setEntries(prev => [...prev, { 
      id: crypto.randomUUID(), 
      date, 
      milkType, 
      quantity 
    }])
    setDate('')
    setQuantity(0)
    setMilkType('Cow')
  }

  return (
    <div>
      <h1>Transaction Entry</h1>
      
      <div>
        <div>
          <label htmlFor="tx-date">Date</label>
          <input 
            id="tx-date" 
            aria-label="Entry date" 
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="tx-milktype">Milk Type</label>
          <select 
            id="tx-milktype" 
            aria-label="Milk type" 
            value={milkType} 
            onChange={e => setMilkType(e.target.value)}
          >
            <option value="Cow">Cow</option>
            <option value="Buffalo">Buffalo</option>
            <option value="Both">Both</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="tx-qty">Quantity (L)</label>
          <input 
            id="tx-qty" 
            aria-label="Quantity in litres" 
            type="number" 
            min={0} 
            value={quantity || ''} 
            onChange={e => setQuantity(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        
        <button 
          onClick={addEntry}
        >
          Add
        </button>
      </div>
      
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Milk Type</th>
              <th>Quantity (L)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.milkType}</td>
                <td>{entry.quantity}</td>
              </tr>
            ))}
            {!entries.length && (
              <tr>
                <td colSpan={3}>
                  No entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
