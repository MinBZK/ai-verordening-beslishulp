import json

import yaml

# Load the decision-tree.yaml file
with open("categories.yaml") as file:
    categories = yaml.safe_load(file)

# Save the modified decision_tree back to a YAML file
with open("frontend/src/assets/categories.json", "w+") as file:
    json.dump(categories, file)
