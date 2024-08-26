#!/usr/bin/env bash

python script/inject_definitions_in_decision_tree.py

docker build . -t ghcr.io/minbzk/ai-act-beslisboom:main --platform linux/amd64
