const s = document.createElement('script')
s.setAttribute('src', '/sql-wasm.js')
document.body.appendChild(s)

window.loadSQL = async () => {
  // console.log( "loadSQL function called")
  return await initSqlJs({
    locateFile: (file) => `/${file}`
  })
}
