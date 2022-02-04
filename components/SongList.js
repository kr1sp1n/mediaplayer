import Link from 'next/link'

function getRandomColor(name) {
  // get first alphabet in upper case
  const firstAlphabet = name.charAt(0).toLowerCase();
  // get the ASCII code of the character
  const asciiCode = firstAlphabet.charCodeAt(0);
  // number that contains 3 times ASCII value of character -- unique for every alphabet
  const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();
  const num = Math.round(0xffffff * parseInt(colorNum));
  const r = num >> 16 & 255;
  const g = num >> 8 & 255;
  const b = num & 255;
  return {
    color: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.3)',
    character: firstAlphabet.toUpperCase()
  }
}

export default ({
  songs
}) => {
  return (
    <ul>
      {songs.map((song) => {
        const artist = song.artists.map((a) => a.name).join(' & ')
        const coverArt = getRandomColor(artist)
        const coverUrl = `/images/cover/${song.file.id}.jpg`
        // console.log(coverUrl)
        return (
          <li className='song' key={song.id}>
            <div
              className='cover'
              style={{
                backgroundColor: coverArt.color
              }}
            >
              {song.hasCover && <img src={coverUrl} />}
            </div>
            <div className='title'>
              <Link href={`/songs/${song.id}`}>
                <a>
                  <h3>{(artist) ? `${artist} - ` : ''}{song.title}</h3>
                </a>
              </Link>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
