# How to test app-express.js
## GET list
- curl http://localhost:3001/items

## GET a resource
- curl http://localhost:3001/items/:id

## POST a resource
- curl -X POST -d '{"id": {id}, "name": {name}}' -H "Accept: application/json" -H 'Content-Type:application/json' http://localhost:3001/items

## POST a resource
- curl -X PUT -d '{"id": {id}, "name": "updated!"}' http://localhost:3001/items/:id

## DELETE a resource
- curl -X DELETE  http://localhost:3001/items/:id

