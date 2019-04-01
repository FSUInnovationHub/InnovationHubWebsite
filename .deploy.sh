#/bin/bash

usage() {
    echo -e "\tUSAGE: $0 USERNAME PASSWORD SERVER"
}

if [ $# -lt 3 ]; then
    echo "ERROR: missing arguments"
    usage
    exit 2
fi

echo "Updating Files"

curl --user "$1:$2" -T . "$3"
