#!/usr/bin/env python3

import re
from collections import defaultdict
from dataclasses import dataclass

import yaml
from mermaid import Config, Direction
from mermaid.configuration import Themes
from mermaid.flowchart import FlowChart, Link, Node
from mermaid.style import Style


class CustomNode(Node):
    # add options to __init__ method
    def __init__(
        self,
        id_: str,
        content: str = "",
        shape: str = "normal",
        sub_nodes: list["Node"] | None = None,
        href: str | None = None,
        href_type: str = "blank",
        styles: list[Style] | None = None,
        direction: str | Direction = "LR",
        callback_tooltip: str | None = None,
        category: str | None = None,
        subcategory: str | None = None,
    ) -> None:
        # call super and use result to add the id
        self.callback_tooltip = callback_tooltip
        self.category = category  # Store the category

        super().__init__(
            id_=id_,
            content=content,
            shape=shape,
            sub_nodes=sub_nodes,
            href=href,
            href_type=href_type,
            styles=styles,
            direction=direction,
        )

    # overwrite __string__ method to include the node id
    def __str__(self) -> str:
        # call super and use result to add the id

        mystr = super().__str__()

        mystr = "".join([mystr, "\n", f'click {self.id_} callback "{self.callback_tooltip}"'])

        return mystr


class CustomLink(Link):
    # add options to __init__ method
    def __init__(
        self,
        origin: Node,
        end: Node,
        message: str = "",
        labels: str | None = None,
    ) -> None:
        self.labels = labels

        super().__init__(
            origin=origin,
            end=end,
            message=message,
        )


class CustomStyle(Style):
    # add options to __init__ method
    def __init__(
        self,
        name: str,
        fill: str | None = None,
        color: str | None = None,
        font_weight: str | None = None,
        stroke_width: str | None = None,
        stroke: str | None = None,
        other: str | None = None,
    ) -> None:
        super().__init__(
            name=name,
            fill=fill,
            color=color,
            font_weight=font_weight,
            stroke_width=stroke_width,
            stroke=stroke,
            other=other,
        )

    def __str__(self) -> str:
        """Return the string representation of the style definition."""
        parts = [f"classDef {self.name}"]  # Start with the class definition name

        attributes = []  # Collect style attributes here
        if self.fill:
            attributes.append(f"fill:{self.fill}")
        if self.color:
            attributes.append(f"color:{self.color}")
        if self.font_weight:
            attributes.append(f"font-weight:{self.font_weight}")
        if self.stroke_width:
            attributes.append(f"stroke-width:{self.stroke_width}")
        if self.stroke:
            attributes.append(f"stroke:{self.stroke}")
        if self.other:
            attributes.append(self.other)

        if attributes:
            parts.append(",".join(attributes))  # Join attributes with commas

        return " ".join(parts)

    def __hash__(self) -> int:
        return hash(self.name)


@dataclass
class Definition:
    term: str
    definition: str
    url: str


@dataclass
class Source:
    source: str
    url: str


@dataclass
class Redirect:
    if_condition: str
    nextQuestionId: str | None = None
    nextConclusionId: str | None = None

    def __post_init__(self):
        self.if_condition = escape_for_mermaid(self.if_condition)


@dataclass
class Answer:
    answer: str
    subresult: str | None = None
    labels: list[str] = None
    nextQuestionId: str | None = None
    nextConclusionId: str | None = None
    redirects: list[Redirect] | None = None


@dataclass
class Question:
    questionId: str
    question: str
    explanation: str
    category: str
    subcategory: str
    answers: list[Answer]
    definitions: list[Definition] | None = None
    sources: list[Source] | None = None

    def __post_init__(self):
        self.question = escape_for_mermaid(self.question)


@dataclass
class Source:
    source: str
    url: str


@dataclass
class Conclusion:
    conclusionId: str
    conclusion: str
    obligation: str
    sources: list[Source] | None = None


# Function to only remove all special characters
def escape_for_mermaid(text):
    return text.replace("||", "of").replace("&&", "en")


def find_node_by_id(node_id):
    for node in nodes:
        if node.id_ == node_id:
            return node


# Main logic - Higher-level functions


# Function to create nodes for questions and conclusions
def create_nodes(conclusions: list[Conclusion], questions: list[Question], secondary_style: Style) -> list[CustomNode]:
    nodes: list[CustomNode] = []
    for question in questions:
        nodes.append(
            CustomNode(
                id_="q-" + question.questionId,
                content=question.questionId + ": " + question.subcategory,
                shape="circle",
                callback_tooltip=question.question,
                category=question.category,
            )
        )
    for conclusion in conclusions:
        nodes.append(
            CustomNode(
                id_="c-" + conclusion.conclusionId,
                content=conclusion.conclusion,
                shape="hexagon",
                styles=[secondary_style],
                callback_tooltip=conclusion.obligation,
            )
        )
    return nodes


# Function to create links between questions and conclusions
def create_links(questions: list[Question]) -> list[CustomLink]:
    links: list[CustomLink] = []

    for question in questions:
        # Convert raw answers into Answer objects
        answers: list[Answer] = [Answer(**a) for a in question.answers]
        origin = find_node_by_id(f"q-{question.questionId}")

        for answer in answers:
            link_message = format_link_message(answer)

            # Handle nextQuestionId or nextConclusionId
            if answer.nextQuestionId or answer.nextConclusionId:
                end = find_node_by_id(
                    f"q-{answer.nextQuestionId}" if answer.nextQuestionId else f"c-{answer.nextConclusionId}"
                )
                links.append(create_custom_link(origin, end, link_message, answer.labels))

            # Handle redirects
            elif answer.redirects:
                handle_redirects(links, origin, answer, link_message)

            else:
                print(
                    f"Error: No nextQuestionId or nextConclusionId found in answer for question {question.questionId}"
                )

    return links


# Function to create html files
def create_html(file_name: str, flowchart_script: str) -> None:
    html_template = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Act Beslishulp</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
        <script src='https://unpkg.com/mermaid@11.0.2/dist/mermaid.min.js'></script>

        <!-- Custom Styles -->
        <style>
            /* Tooltip styling */
            .mermaidTooltip {
                display: none; /* Hides any remaining tooltips */
            }

            /* Modal centering and responsiveness */
            .modal.is-active {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .modal-content {
                max-width: 80vw; /* Makes modal responsive to screen size */
                max-height: 80vh; /* Ensures modal fits within the viewport */
                overflow-y: auto; /* Allows scrolling inside modal if content is too long */
                position: relative;
                padding: 20px;
                background-color: white;
                border-radius: 10px;
            }
        </style>
    </head>
    <body class="has-background-white-ter">

        <!-- Modal -->
        <div id="model1" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div id="modelcontent1"></div>
            </div>
            <button id="modealclose1" class="modal-close is-large" aria-label="close"></button>
        </div>

        <!-- Diagram (placeholder) -->
        <pre class="mermaid has-background-white-ter">
            {script}
        </pre>

        <!-- Mermaid initialization -->
        <script>mermaid.initialize({ maxTextSize: 9000000000, startOnLoad: true, securityLevel: 'loose' })</script>

        <!-- JavaScript for tooltip and modal handling -->
        <script>
            // Function to handle modal popup when a node is clicked
            window.callback = function (name) {
                let cookieValue = document.getElementsByClassName("mermaidTooltip");
                let modelcontent1 = document.getElementById("modelcontent1");
                let model1 = document.getElementById("model1");

                // If a tooltip exists, display its content in the modal
                if (cookieValue[0]) {
                    // Hide the tooltip when opening the modal
                    cookieValue[0].style.display = "none";
                    // Set the modal content from the tooltip text
                    modelcontent1.innerHTML = cookieValue[0].innerText.replaceAll("#specialnewline#", "<br>");
                    // Open the modal by adding the 'is-active' class
                    model1.classList.add('is-active');
                }
            };

            // Function to close the modal and restore tooltip visibility
            document.addEventListener('DOMContentLoaded', () => {
                let modealclose1 = document.getElementById("modealclose1");

                // Event listener to close the modal when the close button is clicked
                modealclose1.addEventListener('click', () => {
                    let model1 = document.getElementById("model1");
                    let cookieValue = document.getElementsByClassName("mermaidTooltip");

                    // Close the modal by removing the 'is-active' class
                    model1.classList.remove('is-active');

                    // Restore the tooltip visibility after the modal is closed
                });
            });

        </script>

    </body>
    </html>
    """.replace("{script}", flowchart_script)
    with open(file_name, "w") as file:
        file.write(html_template)


# Function to create structure for subgraphs by categorizing links question_id per category
def create_subgraph_structure(links: list[CustomLink]) -> defaultdict:
    if not links:
        raise ValueError("Links cannot be empty")

    subgraphs = defaultdict(list)

    for link in links:
        origin_category = link.origin.category
        origin_id = f"{link.origin.id_}"
        end_id = f"{link.end.id_}"

        if origin_id not in subgraphs[origin_category]:
            subgraphs[origin_category].append(origin_id)

        if end_id not in subgraphs[origin_category] and end_id.startswith("c-"):
            subgraphs[origin_category].append(end_id)

    return subgraphs


# Function to create HTML of the complete graph from subgraph structure
def create_complete_graph_html(
    subgraphs: defaultdict, nodes: list[CustomNode], links: list[CustomLink], name: str, orientation: str, config: dict
) -> None:
    # create mermaid syntax subgraphs including styling for each category
    subgraphs_complete = "\n".join(
        [f"subgraph {category}\n" + "\n".join(questions) + "\nend" for category, questions in subgraphs.items()]
        + [str(secondary_style)]
        + [f"class {category} secondaryStyle" for category in subgraphs]
    )

    flowchart_complete = FlowChart(title=name, nodes=nodes, links=links, config=config)

    create_html(
        "./mermaid_graphs/decision-tree-complete.html",
        flowchart_complete.script + subgraphs_complete,
    )


# Create subgraphs and write into html files
def create_subgraph_html(subgraphs: defaultdict, orientation: str, config: dict) -> None:
    nodes_by_category = defaultdict(list)
    links_by_category = defaultdict(list)

    # Loop over the subgraphs/category
    for category, cat_questions in subgraphs.items():
        # Select nodes and links that belong to a category
        links_by_category[category] = [link for link in links if link.origin.id_ in cat_questions]
        nodes_by_category[category] = [node for node in nodes if node.id_ in cat_questions]

        # Create flowchart for the category
        flowchart_complete = FlowChart(
            title=category,
            nodes=nodes_by_category.get(category, []),
            links=links_by_category.get(category, []),
            orientation=orientation,
            config=config,
        )

        # Extract 'end' nodes of the category that are not already in the category's questions (link to other subgraphs)
        external_links = {link.end.id_ for link in links_by_category[category] if link.end.id_ not in cat_questions}

        # Create clickable links between subgraph HTML files in Mermaid syntax
        links_between_subgraphs = "\n".join(
            f'click {link} href "decision-tree-subgraphs-{end_category}.html" "{end_category}"'
            for link in external_links
            if (end_category := get_category(subgraphs, link)) is not None
        )

        # Initialize the script by appending links between subgraphs to the main flowchart script
        subgraph_script = flowchart_complete.script + "\n" + links_between_subgraphs

        # Replace 'end' node IDs with their corresponding category in the subgraph script (display category and not ID)
        subgraph_script = replace_external_ids_with_category(subgraph_script, subgraphs, external_links)

        # Create the HTML file for the current category's subgraph
        create_html(
            f"./mermaid_graphs/decision-tree-subgraphs-{category}.html",
            subgraph_script,
        )


def create_main_graph_html(
    links: list[CustomLink], subgraphs: list[str], name: str, orientation: str, config: dict
) -> None:
    # Generate edges between different categories
    pairs_main = "\n".join(
        {
            f"{link.origin.category} --> {link.end.category}"
            for link in links
            if link.origin.category != link.end.category and link.end.category
        }
    )

    # Generate labels per category for the flowchart in mermaid syntax
    labels_per_category = "\n".join(
        {
            f"{link.origin.category}~~~| {link.labels[0]}|{link.origin.category}"
            for link in links
            if link.labels is not None
        }
    )

    # Generate clickable links for subgraphs in the main graph in mermaid syntax
    htmls = "\n".join(
        f'click {category} href "decision-tree-subgraphs-{category}.html" "{category}"' for category in subgraphs
    )

    # Create the main flowchart object
    flowchart_main = FlowChart(title=name, orientation=orientation, config=config)

    # Combine the flowchart's script with the generated pairs, labels, and clickable links.
    create_html(
        "./mermaid_graphs/decision-tree-main.html",
        f"{flowchart_main.script}\n{pairs_main}\n{labels_per_category}\n{htmls}",
    )


# Helper logic - Low-level functions


# Function to replace node IDs with their corresponding category in the script
def replace_external_ids_with_category(script: str, subgraphs: defaultdict, external_links: set) -> str:
    # Iterate through each subgraph to replace external node IDs with category names
    for category, category_nodes in subgraphs.items():
        # Find external nodes that belong to the current category
        nodes_to_replace = [node_id for node_id in category_nodes if node_id in external_links]

        # Replace each node ID with the category name
        for node_id in nodes_to_replace:
            script = script.replace(node_id, category)

    return script


# Function to find the category that contains a specific link.
def get_category(subgraphs: dict, link: str) -> str:
    return next((key for key, values in subgraphs.items() if link in values), None)


# Function to format the link message with the answer and labels
def format_link_message(answer: Answer) -> str:
    label_info = f"\nOpgehaalde labels: {', '.join(str(label) for label in answer.labels)}" if answer.labels else ""
    return f"{answer.answer}\n{label_info}"


# Function to create a CustomLink
def create_custom_link(origin: CustomNode, end: CustomNode, message: str, labels: list[str]) -> CustomLink:
    if end is None:
        raise ValueError(f"Error: Could not find destination node for link with message '{message}'")
    return CustomLink(origin=origin, end=end, message=message, labels=labels)


# Function to handle creation of links for redirects with nextQuestionId or nextConclusionId
def handle_redirects(links: list[CustomLink], origin: CustomNode, answer: Answer, base_message: str) -> None:
    redirects: list[Redirect] = [
        Redirect(
            nextQuestionId=r.get("nextQuestionId"), nextConclusionId=r.get("nextConclusionId"), if_condition=r["if"]
        )
        for r in answer.redirects
    ]

    for redirect in redirects:
        redirect_message = format_redirect_message(answer, redirect, base_message)
        if redirect.nextQuestionId:
            end = find_node_by_id(f"q-{redirect.nextQuestionId}")
            links.append(create_custom_link(origin, end, redirect_message, answer.labels))
        elif redirect.nextConclusionId:
            end = find_node_by_id(f"c-{redirect.nextConclusionId}")
            links.append(create_custom_link(origin, end, redirect_message, answer.labels))
        else:
            print(f"Error: No nextQuestionId or nextConclusionId found in redirects for question {origin.id_}")


# Function to format the message for redirect links
def format_redirect_message(answer: Answer, redirect: Redirect, base_message: str) -> str:
    match_list = [m[0] or m[1] for m in re.findall(r'"([^"]+)"\s+in\s+labels|(\bof\b|\ben\b)', redirect.if_condition)]
    condition_message = f"Als: {' '.join(match_list)}."
    return f"{base_message}\n{condition_message}"


with open("decision-tree.yaml") as file:
    decision_tree = yaml.safe_load(file)

version: str = decision_tree.get("version")
name: str = decision_tree.get("name")

questions: list[Question] = [Question(**q) for q in decision_tree.get("questions", [])]
conclusions: list[Conclusion] = [Conclusion(**q) for q in decision_tree.get("conclusions", [])]

config = Config(
    theme=Themes.BASE,
    primary_color="#007bc7",
    primary_text_color="#000000",
    primary_border_color="#007bc7",
    secondary_color="#CCE7F4",
    line_color="#154273",
)

secondary_style = CustomStyle(name="secondaryStyle", fill="#FFFFFF", stroke="#39870c")

orientation = Direction.TOP_TO_BOTTOM

# Create nodes, links and subgraphs
nodes = create_nodes(conclusions=conclusions, questions=questions, secondary_style=secondary_style)
links = create_links(questions=questions)
subgraphs = create_subgraph_structure(links=links)

# Generate HTML files
create_complete_graph_html(
    subgraphs=subgraphs, links=links, nodes=nodes, name=name, orientation=orientation, config=config
)
create_subgraph_html(subgraphs=subgraphs, orientation=orientation, config=config)
create_main_graph_html(subgraphs=subgraphs, links=links, name=name, orientation=orientation, config=config)
