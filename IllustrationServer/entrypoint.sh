#!/bin/bash

set -e

host="0.0.0.0"
port="5432"
cmd="$@"

>&2 echo "Check BD for available"

until curl http://"$host":"$port"; do
  >&2 echo "BD is unavailable - sleeping"
  sleep 5
done

>&2 echo "DB is up - executing command"

exec $cmd