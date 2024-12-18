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
    definition["term"]: (
        f"<div class='aiv-definition'>"
        f"{definition['term']}"
        f"<span class='aiv-definition-text'>"
        f"{definition['definition']}"
        f"</span>"
        f"</div>"
    )
    for definition in definitions["definitions"]
}


def create_pattern(terms):
    """Create a regex pattern from a list of terms."""
    return re.compile("|".join([re.escape(term) for term in sorted(terms, key=len, reverse=True)]))


def replace_terms_with_tracking(text, term_dict):
    """
    Replace terms in text with their definitions, but only the first occurrence of each term.
    Returns the modified text and a set of terms that were already used.
    """
    if not text:
        return text

    used_terms = set()
    result = []
    current_pos = 0

    # Create pattern from all available terms
    pattern = create_pattern(term_dict.keys())

    # Find all matches in the text
    for match in pattern.finditer(text):
        term = match.group(0)
        start, end = match.span()

        # Add text before the match
        result.append(text[current_pos:start])

        # If this is the first occurrence of the term, add the definition
        if term not in used_terms:
            result.append(term_dict[term])
            used_terms.add(term)
        else:
            result.append(term)

        current_pos = end

    # Add any remaining text
    result.append(text[current_pos:])

    return "".join(result)


def process_question_or_conclusion(text, term_dict):
    """
    Process a question or conclusion, replacing terms and returning the modified text.
    Each term will only be defined once within the given text.
    """
    if text:
        return replace_terms_with_tracking(text, term_dict)
    return text


# Process questions
for q in decision_tree.get("questions", []):
    q["question"] = process_question_or_conclusion(q.get("question", ""), term_dict)
    q["explanation"] = process_question_or_conclusion(q.get("explanation", ""), term_dict)

# Process conclusions
for c in decision_tree.get("conclusions", []):
    c["conclusion"] = process_question_or_conclusion(c.get("conclusion", ""), term_dict)
    # Process obligation separately to allow for one definition per field
    c["obligation"] = process_question_or_conclusion(c.get("obligation", ""), term_dict)

# Save the modified decision_tree back to a JSON file
with open("frontend/src/assets/decision-tree.json", "w+") as file:
    json.dump(decision_tree, file)
