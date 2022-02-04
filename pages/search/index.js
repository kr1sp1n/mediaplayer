import Script from 'next/script'
import useBinaryFile from '../../src/useBinaryFile'
import { useDB } from '../../src/useDB'
import { useState } from 'react'

export default () => {
  const data = useBinaryFile('/dev.db')
  const db = useDB(data)
  const [query, setQuery] = useState("SELECT name FROM sqlite_schema WHERE type ='table';")
  const [result, setResult] = useState([])
  const [error, setError] = useState()

  const executeQuery = (event) => {
    setError(null)
    event.preventDefault() // don't redirect the page
    try {
      setResult(db.exec(query))
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div>
      <Script type='module' strategy='beforeInteractive' src='/sql-loader.js' />
      <h2>search</h2>
      <form onSubmit={executeQuery}>
        <textarea
          style={{ padding: '1rem', width: '100%', height: '5rem' }}
          id='query'
          autoComplete='query'
          required defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <br />
        <br />
        <button type='submit'>Search</button>
      </form>
      {error?.message && (
        <h3 className='error'>{error.message}</h3>
      )}
      {!error && result.length > 0 && (
        <table>
          <thead>
            <tr>
              {result[0].columns.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {result[0].values.map((r) => (
              <tr key={r}>
                {r.map((v) => <td key={v}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
