
scp docker-compose.yml pi@${HOST}:/home/pi/mediaplayer/
scp ${ENV_FILE} pi@${HOST}:/home/pi/mediaplayer/.env
scp Caddyfile pi@${HOST}:/home/pi/mediaplayer/
scp -r out/* pi@${HOST}:/home/pi/mediaplayer/out/