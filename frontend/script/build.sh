#!/usr/bin/env bash

python script/inject_definitions_in_decision_tree.py

docker build . -t ghcr.io/minbzk/ai-verordening-beslishulp:main --platform linux/amd64
