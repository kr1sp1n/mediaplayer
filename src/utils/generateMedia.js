const config = require('config')
const fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const { v4: uuid } = require('uuid')
const prisma = new PrismaClient()
const FileHound = require('filehound')
const mm = require('music-metadata')

const pathSplitter = '/mp3'
const pathPrefix = '/mp3'
const {
  fileHost,
  mediaPath
} = config

async function main () {
  const files = await FileHound.create()
    .paths(mediaPath)
    .ext('mp3')
    .find()
  for (const filePath of files) {
    const { common } = await mm.parseFile(filePath)
    const cover = mm.selectCover(common.picture)
    const id = uuid()
    let hasCover = false
    let song
    let file

    const hostPath = `${pathPrefix}${filePath.split(pathSplitter)[1]}`
    if (common.title) {
      file = await prisma.file.findFirst({
        where: {
          path: hostPath
        }
      })
      if (!file) {
        file = await prisma.file.create({
          data: {
            id,
            path: hostPath,
            host: fileHost
          }
        })
      } else {
        if (file.host !== fileHost) {
          await prisma.file.update({
            where: {
              id: file.id
            },
            data: {
              host: fileHost
            }
          })
        }
      }
      song = await prisma.song.findFirst({
        where: {
          fileId: file.id
        }
      })
      if (!song) {
        song = await prisma.song.create({
          data: {
            title: common.title,
            fileId: file.id,
            hasCover
          }
        })
      }
      // console.log(file)
      // console.log(song)
    } else {
      // console.log(common, filePath)
    }
    if (cover) {
      const coverPath = `${__dirname}/../../public/images/cover/${file.id}.jpg`
      fs.writeFileSync(coverPath, cover.data, { flag: 'w+' })
      hasCover = true
    }
    if (common.artists) {
      for (const name of common.artists) {
        let artist = await prisma.artist.findFirst({
          where: {
            name
          }
        })
        if (!artist) {
          artist = await prisma.artist.create({
            data: {
              name
            }
          })
        }
        await prisma.song.update({
          where: { id: song.id },
          data: {
            artists: {
              connect: [{ id: artist.id }]
            },
            hasCover: hasCover
          }
        })
      }
    }
  }
}

main().catch(console.error)
