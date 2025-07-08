#!/usr/bin/env python3
import argparse
import re
import sys
from copy import deepcopy

import yaml


def parse_markdown_definitions(content: str) -> dict[str, str]:
    """Parse markdown definition list into a dictionary."""
    definitions = {}
    # Pattern matches *[term]: definition
    pattern = r"\*\[(.*?)\]:\s*(.*?)(?=\*\[|$)"
    matches = re.finditer(pattern, content, re.DOTALL)

    for match in matches:
        term = match.group(1).strip()
        definition = match.group(2).strip()
        # Clean up definition (remove extra whitespace and newlines)
        definition = re.sub(r"\s+", " ", definition)
        definitions[term] = definition

    return definitions


def read_yaml_definitions(file_path: str) -> list[dict[str, str]]:
    """Read existing YAML definitions file."""
    try:
        with open(file_path, encoding="utf-8") as f:
            data = yaml.safe_load(f)
            if data and "definitions" in data:
                return data["definitions"]
    except FileNotFoundError:
        return []
    return []


def upsert_definitions(existing: list[dict[str, str]], new_defs: dict[str, str]) -> list[dict[str, str]]:
    """
    Update existing definitions and insert new ones.
    Preserves all existing definitions and their order, only updating if new version exists.
    Appends any new definitions at the end.
    """
    # Create a deep copy to avoid modifying the original
    result = deepcopy(existing)

    # Keep track of terms we've updated
    updated_terms = set()

    # Update existing definitions
    for i, item in enumerate(result):
        term = item["term"]
        if term in new_defs:
            if item["definition"] != new_defs[term]:
                result[i]["definition"] = new_defs[term]
                print(f"Updated definition for: {term}")
            updated_terms.add(term)

    # Add new definitions
    for term, definition in new_defs.items():
        if term not in updated_terms:
            result.append({"term": term, "definition": definition})
            print(f"Added new definition for: {term}")

    return result


def write_yaml_definitions(definitions: list[dict[str, str]], output_path: str):
    """Write definitions to YAML file."""
    output_data = {"definitions": definitions}
    with open(output_path, "w", encoding="utf-8") as f:
        yaml.dump(output_data, f, allow_unicode=True, sort_keys=False, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Convert Markdown definitions to YAML format")
    parser.add_argument("input_file", help="Input Markdown file path")
    parser.add_argument("output_file", help="Output YAML file path")
    args = parser.parse_args()

    # Read input markdown file
    try:
        with open(args.input_file, encoding="utf-8") as f:
            markdown_content = f.read()
    except FileNotFoundError:
        print(f"Error: Input file '{args.input_file}' not found")
        sys.exit(1)

    # Parse markdown definitions
    new_definitions = parse_markdown_definitions(markdown_content)

    # Read existing YAML definitions
    existing_definitions = read_yaml_definitions(args.output_file)

    # Perform upsert operation
    updated_definitions = upsert_definitions(existing_definitions, new_definitions)

    # Write updated definitions to YAML file
    write_yaml_definitions(updated_definitions, args.output_file)

    print("\nOperation completed:")
    print(f"Total definitions in output: {len(updated_definitions)}")


if __name__ == "__main__":
    main()
