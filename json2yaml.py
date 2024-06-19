#!/usr/bin/env python

import json
import yaml
import argparse
from pathlib import Path
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

questions = []


def parse_question(data, id="0"):
    global questions

    if isinstance(data, list): # all lists are 1 length. why is it like this?
        for item in data:
            parse_question(item, id)
    elif isinstance(data, dict):

            question = data.get('question', None)
            options = data.get('options', [])
            option_length = len(options)
            question_type = "SingleChoice"

            # switch based on option length
            match option_length:
                case 2:
                     pass
                case 3:
                    question_type = "MultipleChoice"
                case _:
                    logger.info(f'this should not happen')

            answers = []
            for i, option in enumerate(options):
                next = option.get('next', None)
                a = {
                    "answer": option.get('text')
                }
                if next:
                    a['nextQuestionId'] = f"{id}.{i}"
                else:
                    a['result'] = option.get('result', None)

                answers.append(a)

            questions.append(
                {
                    'questionId': id,
                    'question': question,
                    'questionType': question_type,
                    'answers': answers
                }
            )

            for i, option in enumerate(options):
                if 'next' in option:
                    next = option.get('next')
                    parse_question(next, f"{id}.{i}")
                elif 'result' in option:
                    pass
                else:
                    logger.debug(f'No next or result found {data}')


def read_json(file: str) -> dict:
    with open(file, 'r') as f:
        json_str = f.read()
        data = json.loads(json_str)
    return data

def write_yaml(dict: dict, file: str):
    with open(file, 'w') as f:
        yaml.dump(dict, f, default_flow_style=False, sort_keys=False, width=float("inf"))

def change_answer_id(questions,old, new):

    for question in questions:
        for answer in question.get('answers'):
            if answer.get('nextQuestionId') == old:
                answer['nextQuestionId'] = new

def remove_duplicates():
    global questions

    ids = []
    q = []
    new_questions = []

    for question in questions:
        duplicate_q = question.get('question')
        duplicate_id = question.get('questionId')
        if duplicate_q in q:
            index = q.index(duplicate_q)
            change_answer_id(new_questions,duplicate_id, ids[index])

            pass
        else:
            new_questions.append(question)
            q.append(duplicate_q)
            ids.append(duplicate_id)

    return new_questions

if __name__ == '__main__':


    parser = argparse.ArgumentParser(description='Convert JSON to YAML')
    parser.add_argument('--file', '-f', type=Path, default=Path('decision-tree.json'), help='Directory to convert JSON files to YAML')

    args = parser.parse_args()
    json_file = args.file
    yaml_file = args.file.with_suffix('.yaml')

    logger.debug(f'Converting {json_file} to YAML {yaml_file}')

    json_data = read_json(json_file)
    parse_question(json_data)

    data = remove_duplicates()

    write_yaml({
        "version": "1.0.0",
        "name": "Decision Tree",
        "questions": data,
        }, yaml_file)
