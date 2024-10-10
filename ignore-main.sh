#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  # Proceed with the build
  echo "🛑 - Build cancelled"
  exit 0;

else
  # Don't build
  echo "✅ - Build can proceed"
  exit 1;
fi