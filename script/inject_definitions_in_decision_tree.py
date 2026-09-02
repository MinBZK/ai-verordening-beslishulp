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

# Definitie per term, opgezocht op het moment dat een term in de tekst staat
term_dict = {definition["term"]: definition["definition"] for definition in definitions["definitions"]}

# Doorlopende teller voor unieke id's. Op de conclusiepagina staan alle eerder
# gestelde vragen onder "Antwoorden", dus staan meerdere definities van dezelfde
# term tegelijk in de DOM. Een id per term zou dan dubbel voorkomen.
definition_counter = 0


def render_definition(term):
    """
    Zet een term om in de markup voor een definitie-tooltip.

    Bewust een <button> in een <span>, geen <div>:
    - een <div> in lopende tekst breekt de omringende <p> of <h2> open;
    - de definitie was alleen met de muis op te roepen. Als knop is de term
      focusbaar, zodat de definitie ook met het toetsenbord verschijnt.
    aria-describedby koppelt de definitie aan de term, zodat een screenreader
    die voorleest zodra de term focus krijgt.

    De definitietekst staat op aria-hidden: anders telt hij mee in de naam van
    de <h2> eromheen, die na elke stap de focus krijgt. aria-describedby leest
    ook aria-hidden-inhoud, dus de definitie blijft beschikbaar.
    """
    global definition_counter
    definition_counter += 1
    definition_id = f"aiv-definition-{definition_counter}"
    return (
        f"<span class='aiv-definition'>"
        f"<button type='button' class='aiv-definition-term' aria-describedby='{definition_id}'>"
        f"{term}"
        f"</button>"
        f"<span class='aiv-definition-text' role='tooltip' id='{definition_id}' aria-hidden='true'>"
        f"{term_dict[term]}"
        f"</span>"
        f"</span>"
    )


def create_pattern(terms):
    """Create a regex pattern from a list of terms that matches only full words, including hyphens."""
    # Sort terms by length (descending) to match longer terms first
    sorted_terms = sorted(terms, key=len, reverse=True)

    # Create patterns that consider hyphens as part of words
    # Custom word boundary that treats hyphens as part of words
    # (?<![a-zA-Z0-9_-]) = negative lookbehind for word chars or hyphen
    # (?![a-zA-Z0-9_-]) = negative lookahead for word chars or hyphen
    escaped_terms = [r"(?<![a-zA-Z0-9_-])" + re.escape(term) + r"(?![a-zA-Z0-9_-])" for term in sorted_terms]

    # Join with OR operator
    pattern_string = "|".join(escaped_terms)
    return re.compile(pattern_string)


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
            result.append(render_definition(term))
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
