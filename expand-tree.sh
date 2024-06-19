#!/bin/bash

# This script replace { "file": "filename.json" } in a json file with the contents of filename.json
#
# Note 1: it requires the following naming convention to work:
# When you have a json file with references (as explained above), you have to let the filename end in -compressed.json. The script will then write the output to the same filename, but without -compressed.
# It will refuse to process file not ending in -compressed.json
#
# Note 2: Because referenced files can also contain references themselves, the order in which the expension is done matters. Use the supplied make.sh to execute everything in the correct order

# make sure the script is called with exactly one argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <compressed_json_file>"
    exit 1
fi

# make sure the file name ends with -compressed.json
if [[ "$1" != *-compressed.json ]]; then 
    echo "Error: Input file must end with -compressed.json"
    exit 1
fi

input_file="$1" # input file
output_file="${input_file/-compressed.json/.json}" # replace -compressed.json with .json

# make sure input file exists
if [ ! -f "$input_file" ]; then
    echo "Error: File '$input_file' does not exist."
    exit 1
fi

# validate json
if ! jq empty "$input_file" &>/dev/null; then
    echo "Error: The file '$input_file' is not valid JSON."
    exit 1
fi

temp_file=$(mktemp)
cp "$input_file" "$temp_file"

# get all attributes in the file that have a "file" attribute
jq -r '.. | objects | select(has("file")) | .file' "$input_file" | \
while IFS= read -r filename; do
    if [ -f "$filename" ]; then
        # replace content in the temporary file
        jq --tab --slurpfile newContent "$filename" --arg filename "$filename" '
        (.. | select(type == "object" and .file == $filename)) |= $newContent' "$temp_file" > "$temp_file.tmp" && mv "$temp_file.tmp" "$temp_file"
    else
        echo "Warning: Replacement file '$filename' does not exist."
    fi
done

# move the modified content to the output file
mv "$temp_file" "$output_file"
