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
    simplifiedQuestion: str
    category: str
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


# function to only remove all special characters
def escape_for_mermaid(text):
    return text.replace("||", "of").replace("&&", "en")

def find_node_by_id(node_id):
    for node in nodes:
        if node.id_ == node_id:
            return node


def get_category(subgraphs, link):
    return next((key for key, values in subgraphs.items() if link in values), None)


def create_html(file_name, flowchart_script):
    with open(file_name, "w") as file:
        file.write(
            """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Decision Tree</title>
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
        )

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

secondary_style = CustomStyle(
                    name="secondaryStyle",
                    fill="#FFFFFF",
                    stroke="#39870c"
                )

orientation = Direction.TOP_TO_BOTTOM
nodes: list[CustomNode] = []
links: list[CustomLink] = []


# Create nodes for conclusions and questions

def create_nodes(conclusions, questions):
    for conclusion in conclusions:
        nodes.append(
            CustomNode(
                id_="c-" + conclusion.conclusionId,
                content=conclusion.conclusion,
                shape="hexagon",
                styles= [secondary_style],
                callback_tooltip=conclusion.obligation,
            )
        )
    for question in questions:
        nodes.append(
            CustomNode(
                id_="q-" + question.questionId,
                content=question.questionId + ": " + question.simplifiedQuestion,
                shape="circle",
                callback_tooltip=question.question,
                category=question.category,
            )
        )
    return nodes

# Create links between nodes (question and conclusion
def create_links(questions):
    for question in questions:

        answers: list[Answer] = [Answer(**a) for a in question.answers]
        origin = find_node_by_id("q-" + question.questionId)

        for answer in answers:
            link_message = (
                answer.answer
                + "\n"
                + (
                    "\nOpgehaalde labels: " + ", ".join(str(label) for label in answer.labels)
                    if answer.labels is not None
                    else ""
                )
            )
            if answer.nextQuestionId:
                end = find_node_by_id("q-" + answer.nextQuestionId)
                links.append(
                    CustomLink(
                        origin=origin,
                        end=end,
                        message=link_message,
                        labels=answer.labels,
                    )
                )
            elif answer.nextConclusionId:
                end = find_node_by_id("c-" + answer.nextConclusionId)
                links.append(
                    CustomLink(
                        origin=origin,
                        end=end,
                        message=link_message,
                        labels=answer.labels,
                    )
                )
            elif answer.redirects:
                redirects: list[Redirect] = [
                    Redirect(
                        nextQuestionId=r.get("nextQuestionId"),
                        nextConclusionId=r.get("nextConclusionId"),
                        if_condition=r["if"],
                    )
                    for r in answer.redirects
                ]

                for redirect in redirects:
                    if redirect.nextQuestionId:

                        match_list = [
                            m[0] or m[1]
                            for m in re.findall(
                                r'"([^"]+)"\s+in\s+labels|(\bof\b|\ben\b)',
                                redirect.if_condition,
                            )
                        ]

                        redirect_message = (
                                    answer.answer
                                    + ",\n"
                                    + "Als: "
                                    + " ".join(str(m) for m in match_list)
                                    + ".\n\n\n"
                                    + (
                                        "\nOpgehaalde labels: " + ", ".join(str(label) for label in answer.labels)
                                        if answer.labels is not None
                                        else ""
                                    )
                                )

                        end = find_node_by_id("q-" + redirect.nextQuestionId)
                        links.append(
                            CustomLink(
                                origin=origin,
                                end=end,
                                message=redirect_message,
                                labels=answer.labels,
                            )
                        )
                    elif redirect.nextConclusionId:
                        end = find_node_by_id("c-" + redirect.nextConclusionId)
                        links.append(
                            CustomLink(
                                origin=origin,
                                end=end,
                                message=redirect_message,
                                labels=answer.labels,
                            )
                        )
                    else:
                        print(
                            f"""Error: No nextQuestionId or nextConclusionId found
                            in redirects for question {question.questionId}"""
                        )

            else:
                print(f"Error: No nextQuestionId or nextConclusionId found in answer for question {question.questionId}")
    return links

# Create structure for subgraphs
def create_subgraph_structure(links):
    subgraphs = defaultdict(list)
    for link in links:
        if f"{link.origin.id_}" not in subgraphs[link.origin.category]:
            subgraphs[link.origin.category].append(f"{link.origin.id_}")
        if f"{link.end.id_}" not in subgraphs[link.origin.category] and link.end.id_.startswith("c-"):
            subgraphs[link.origin.category].append(f"{link.end.id_}")
    return subgraphs

# Create complete graph html
def create_complete_graph_html(subgraphs):
    subgraphs_complete = "\n".join(
        [f"subgraph {category}\n" + "\n".join(questions) + "\nend" for category, questions in subgraphs.items()]
        + [str(secondary_style)]
        + [f"class {category} secondaryStyle" for category in subgraphs])

    flowchart_complete = FlowChart(title=name, nodes=nodes, links=links, orientation=orientation, config=config)
    create_html(
        "./mermaid_graphs/decision-tree-complete.html",
        flowchart_complete.script + subgraphs_complete,
    )

# Create subgraphs and write into html files
def create_subgraph_html(subgraphs):
    nodes_by_category = defaultdict(list)
    links_by_category = defaultdict(list)

    for category, cat_questions in subgraphs.items():
        links_by_category[category] = [link for link in links if link.origin.id_ in cat_questions]
        nodes_by_category[category] = [node for node in nodes if node.id_ in cat_questions]
        flowchart = FlowChart(
            title=category,
            nodes=nodes_by_category.get(category, []),
            links=links_by_category.get(category, []),
            orientation=orientation,
            config=config,
        )
        # Add 'end' nodes to categories
        subgraph_links = {link.end.id_ for link in links_by_category[category] if link.end.id_ not in cat_questions}

        # Create links between subgraphs
        links_between_subgraphs = "\n".join(
            [
                f'click {link} href "decision-tree-subgraphs-{end_category}.html" "{end_category}"'
                for link in subgraph_links
                if (end_category := get_category(subgraphs, link)) is not None
            ]
        )
        subgraph_script = flowchart.script + "\n" + links_between_subgraphs
        for key, values in subgraphs.items():
            for value in (v for v in values if v in subgraph_links):
                subgraph_script = subgraph_script.replace(value, key)

        create_html(
            "./mermaid_graphs/decision-tree-subgraphs-" + category + ".html",
            subgraph_script,
        )


# Create main graph and write into html
def create_main_graph_html(links):
    pairs_main = "\n".join(
        {
            f"{link.origin.category} --> {link.end.category}"
            for link in links
            if link.origin.category != link.end.category and link.end.category
        }
    )

    labels_per_category = "\n".join(
        {
            f"{link.origin.category}~~~| {link.labels[0]}|{link.origin.category}"
            for link in links
            if link.labels is not None
        }
    )

    htmls = "\n".join(
        [f'click {category} href "decision-tree-subgraphs-{category}.html" "{category}"' for category in subgraphs]
    )

    flowchart_main = FlowChart(title=name, config=config)

    create_html(
        "./mermaid_graphs/decision-tree-main.html",
        flowchart_main.script + pairs_main + "\n" + labels_per_category + "\n" + htmls,
    )


# Create graphs
nodes = create_nodes(conclusions, questions)
links = create_links(questions)
subgraphs = create_subgraph_structure(links)

create_complete_graph_html(subgraphs)
create_subgraph_html(subgraphs)
create_main_graph_html(links)
