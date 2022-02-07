import Link from 'next/link'

export default () => {
  const pages = [
    { title: 'home', href: '/' },
    // { title: 'albums', href: '/albums' },
    { title: 'artists', href: '/artists' },
    { title: 'songs', href: '/songs' },
    { title: 'search', href: '/search' }
  ]
  return (
    <nav>
      <ul>
        {pages.map(({ title, href }) => (
          <li key={title}>
            <Link href={href}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
