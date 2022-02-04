import client from '../../src/utils/client'
import SongList from '../../components/SongList'

export async function getStaticProps ({ params }) {
  const artist = await client.artist.findUnique({
    include: {
      songs: {
        include: {
          artists: true,
          file: true
        }
      }
    },
    where: {
      id: params.id
    }
  })
  return {
    props: {
      artist
    }
  }
}

export async function getStaticPaths () {
  const artists = await client.artist.findMany()
  return {
    paths: artists.map((artist) => ({
      params: {
        id: artist.id.toString()
      }
    })),
    fallback: false
  }
}

export default ({ artist }) => {
  const { songs } = artist
  return (
    <div>
      <h2>{artist.name}</h2>
      <SongList songs={songs} />
    </div>
  )
}
