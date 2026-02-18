#!/bin/sh
set -e
BASE_PATH="${BASE_PATH:-/}"
case "$BASE_PATH" in
    */) BASE_HREF="$BASE_PATH" ;;
    *)  BASE_HREF="${BASE_PATH}/" ;;
esac
sed -i "s|<base href=\"/\">|<base href=\"${BASE_HREF}\">|" /usr/share/nginx/html/index.html
