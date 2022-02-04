import client from '../../src/utils/client'
import SongList from '../../components/SongList'

export async function getStaticProps (_ctx) {
  const songs = await client.song.findMany({
    include: {
      artists: true,
      file: true
    }
  })
  return {
    props: {
      songs
    }
  }
}

export default ({
  songs
}) => {
  return (
    <div>
      <h2>songs</h2>
      <SongList songs={songs} />
    </div>
  )
}
