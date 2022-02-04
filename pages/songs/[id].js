import client from '../../src/utils/client'

export async function getStaticProps ({ params }) {
  const song = await client.song.findUnique({
    include: {
      artists: true,
      file: true
    },
    where: {
      id: params.id
    }
  })

  return {
    props: {
      song
    }
  }
}

export async function getStaticPaths () {
  const songs = await client.song.findMany()
  return {
    paths: songs.map((song) => ({
      params: {
        id: song.id.toString()
      }
    })),
    fallback: false
  }
}

export default ({ song }) => {
  const encodedPath = song.file.path.split('/').map((p) => encodeURIComponent(p)).join('/')
  const fileUrl = `${song.file.host}${encodedPath}`
  const coverUrl = `/images/cover/${song.file.id}.jpg`
  const artist = song.artists.map((a) => a.name).join(' & ')
  return (
    <div>
      <h2>{artist} - {song.title}</h2>
      {song.hasCover && <img src={coverUrl} width='500' />}
      <p>
        <a href={fileUrl}>{fileUrl}</a>
      </p>
      <p>
        <audio controls>
          <source src={fileUrl} type='audio/mpeg' />
          Your browser does not support audio tag.
        </audio>
      </p>
    </div>
  )
}
