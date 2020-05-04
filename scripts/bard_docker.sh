#!/usr/bin/env bash

set -e

db_path_default="/db/music.db"
music_path_default="/music/"

mkdir -p /root/.config
cat > /root/.config/bard << EOF
{
    "databasePath": "${BARD_DB_PATH:-$db_path_default}",
    "musicPaths": [
        "${BARD_MUSIC_PATH:-$music_path_default}"
    ]
}
EOF

bard $*
