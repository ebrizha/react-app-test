#!/bin/sh
set -eu

: "${REACT_APP_API_URL:=}"

escaped_value=$(printf '%s' "$REACT_APP_API_URL" | sed 's/\\/\\\\/g; s/"/\\"/g')

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__ENV__ = window.__ENV__ || {};
window.__ENV__.REACT_APP_API_URL = "$escaped_value";
EOF

