#!/usr/bin/env python

import json
import yaml
import argparse
from pathlib import Path
import glob
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def read_json(file: str) -> dict:
    with open(file, 'r') as f:
        json_str = f.read()
        data = json.loads(json_str)
    return data

def write_yaml(dict: dict, file: str):
    with open(file, 'w') as f:
        yaml.dump(dict, f, default_flow_style=False, sort_keys=False, width=float("inf"))


if __name__ == '__main__':


    parser = argparse.ArgumentParser(description='Convert JSON to YAML')
    parser.add_argument('directory', type=Path, default=Path('.'), nargs='?', help='Directory to convert JSON files to YAML')

    args = parser.parse_args()

    logger.info(f'Converting all *.json files in directory {args.directory} to YAML')


    json_files = glob.glob('*.json')
    for json_file in json_files:
        yaml_file = json_file.replace('json', 'yaml')
        logger.debug(f'Converting {json_file} to YAML {yaml_file}')

        json_data = read_json(json_file)
        write_yaml(json_data, yaml_file)
