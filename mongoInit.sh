#!/bin/sh
mongo --port 27017 <<EOF
use bookstore-api
db.createCollection('users')
db.createCollection('orders')
EOF