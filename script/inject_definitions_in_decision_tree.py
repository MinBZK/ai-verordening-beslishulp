# !/usr/bin/env python3

import json
import re

import yaml

# Load the decision-tree.yaml file
with open("decision-tree.yaml") as file:
    decision_tree = yaml.safe_load(file)

# Load the definitions.yaml file
with open("definitions.yaml") as file:
    definitions = yaml.safe_load(file)

# Create a dictionary to lookup terms
term_dict = {
    definition["term"]: (f"<dfn><abbr title=\"{definition['definition']}\">{definition['term']}</abbr></dfn>")
    for definition in definitions["definitions"]
}

pattern = re.compile("|".join([re.escape(term) for term in sorted(term_dict.keys(), key=len, reverse=True)]))


def replace_terms_callback(match):
    """
    Callback function for replacing terms with their <dfn><abbr>...</abbr></dfn> version.
    """
    term = match.group(0)
    return term_dict.get(term, term)


def replace_terms(text, term_dict):
    """
    Replace all occurrences of terms in the text with their corresponding <dfn><abbr title=""></abbr></dfn> wrapped
    terms. Uses a regular expression with a callback function to ensure the longest term is replaced first.
    """
    return pattern.sub(replace_terms_callback, text)


def process_question_or_conclusion(text, term_dict):
    """
    Process a question or conclusion, replacing terms and returning the modified text.
    """
    if text:
        modified_text = replace_terms(text, term_dict)
        return modified_text
    return text


# Process questions
for q in decision_tree.get("questions", []):
    q["question"] = process_question_or_conclusion(q.get("question", ""), term_dict)

    if "description" in q:
        q["description"] = process_question_or_conclusion(q.get("description", ""), term_dict)

    for a in q.get("answers", []):
        if "subresult" in a:
            a["subresult"] = process_question_or_conclusion(a.get("subresult", ""), term_dict)

        if "answerComment" in a:
            a["answerComment"] = process_question_or_conclusion(a.get("answerComment", ""), term_dict)

# Process conclusions
for c in decision_tree.get("conclusions", []):
    c["conclusion"] = process_question_or_conclusion(c.get("conclusion", ""), term_dict)

    c["obligation"] = process_question_or_conclusion(c.get("obligation", ""), term_dict)

    if "conclusionComment" in c:
        c["conclusionComment"] = process_question_or_conclusion(c.get("conclusionComment", ""), term_dict)

# Save the modified decision_tree back to a YAML file
with open("frontend/src/assets/decision-tree.json", "w+") as file:
    json.dump(decision_tree, file)
