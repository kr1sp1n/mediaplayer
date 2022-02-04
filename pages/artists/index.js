import client from '../../src/utils/client'
import Link from 'next/link'

export async function getStaticProps (_ctx) {
  const artists = await client.artist.findMany({
  })
  return {
    props: {
      artists
    }
  }
}

export default ({ artists }) => {
  return (
    <div>
      <h2>artists</h2>
      <ul>
        {artists.map(({ id, name }) => {
          return (
            <li key={id}>
              <Link href={`/artists/${id}`}>
                <a>{name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}