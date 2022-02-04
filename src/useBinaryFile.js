import { useEffect, useState } from 'react';

export default function useBinaryFile (url) {
  const [dataFile, setDataFile] = useState(null)

  useEffect(() => {
    console.log(`Loading binary file ${url}`)
    fetch(
      url
    ).then((res) => {
      res.arrayBuffer().then((data) => setDataFile(data))
      console.log('Binary file loaded.')
    }).catch((err) => {
      console.error(err)
    })
    return () => { console.log('Unmounted binary file') }
  }, [url])
  return dataFile
}
