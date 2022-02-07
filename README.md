# mediaplayer
Simple mediaplayer in the browser with the help of nextjs and sqlite

## Build

```bash
npm i
npm run export
```

## Run

```bash
npm run serve
```

Go to http://localhost:5000


## SQL

Rewrite file host:
```
UPDATE File SET host = 'https://mydomain.com';
```

Show schema:
```
SELECT name FROM sqlite_schema WHERE type ='table';
```