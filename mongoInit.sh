#!/bin/sh
mongo --port 37017 <<EOF
use bookstore-api
db.createCollection('users')
db.createCollection('orders')
EOF