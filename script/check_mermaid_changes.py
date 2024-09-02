#!/usr/bin/env python3
import subprocess
import sys
import os

input_file = "decision-tree.html"


def has_file_changed(filepath):
    """Check if the file has changed since the last commit."""
    try:
        # Check the diff of the file with the last commit
        diff_output = subprocess.check_output(
            ["git", "diff", "--name-only", "HEAD", filepath]
        ).strip()
        return bool(diff_output)
    except subprocess.CalledProcessError:
        print(f"Error: Unable to check the file {filepath}.")
        sys.exit(1)


# Check if the input file exists
if not os.path.exists(input_file):
    print(f"Error: Input file {input_file} not found.")
    sys.exit(1)

# Check if the file has changed
if has_file_changed(input_file):
    print(
        f"Warning: {input_file} has changed since the last commit. Ensure it is rendered."
    )
else:
    print(f"No changes detected in {input_file}.")
