#!/usr/bin/env python3

import re

# import sys
from dataclasses import dataclass
from typing import List, Optional, Union
from collections import defaultdict
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
        sub_nodes: Optional[list["Node"]] = None,
        href: Optional[str] = None,
        href_type: str = "blank",
        styles: Optional[list[Style]] = None,
        direction: Union[str, Direction] = "LR",
        callback_tooltip: Optional[str] = None,
        category: Optional[str] = None,
    ) -> None:
        # call super and use result to add the id
        self.callback_tooltip = (
            callback_tooltip.replace("-", "\n-")
            if callback_tooltip
            else ""
        )
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

        mystr = "".join(
            [mystr, "\n", f'click {self.id_} callback "{self.callback_tooltip}"']
        )

        return mystr


class CustomLink(Link):
    pass
"""    # add options to __init__ method
    def __init__(
        self,
        origin:  Node,
        end: Node,
        message: str = "",
        labels: Optional[str] = None,
    )-> None:

        self.labels = labels

        super().__init__(
            origin=origin,
            end=end,
            message=message,
        )"""


# function to only remove all special characters
def escape_for_mermaid(text):
    return text.replace("||", "of").replace("&&", "en")


def create_html(file_name, flowchart_script):
    with open(file_name, "w") as file:
        file.write(
            """
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Verordening Beslisboom</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
        <script src='https://unpkg.com/mermaid@11.0.2/dist/mermaid.min.js'></script>
        <script>
            window.callback = function (name) {
                let cookieValue = document.getElementsByClassName("mermaidTooltip");
                console.log(cookieValue[0]);


                // Optionally, you can perform other actions here if needed
            };
        </script>

        </head>

        <body class="has-background-white-ter">

        <div id="model1" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
            <div id="modelcontent1">
            </div>
            </div>
            <button id="modealclose1" class="modal-close is-large" aria-label="close"></button>
        </div>


        <pre class="mermaid has-background-white-ter">
            {script}
        </pre>

    <script>mermaid.initialize({ maxTextSize: 9000000000, startOnLoad: true, securityLevel: 'loose' })</script>
    </body>

    </html>""".replace("{script}", flowchart_script)
        )


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
    nextQuestionId: Optional[str] = None
    nextConclusionId: Optional[str] = None

    def __post_init__(self):
        self.if_condition = escape_for_mermaid(self.if_condition)


@dataclass
class Answer:
    answer: str
    subresult: Optional[str] = None
    labels: List[str] = None
    nextQuestionId: Optional[str] = None
    nextConclusionId: Optional[str] = None
    redirects: Optional[List[Redirect]] = None


@dataclass
class Question:
    questionId: str
    question: str
    simplifiedQuestion: str
    category: str
    questionType: str
    answers: List[Answer]
    definitions: Optional[List[Definition]] = None
    sources: Optional[List[Source]] = None

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
    sources: Optional[List[Source]] = None


with open("decision-tree.yaml", "r") as file:
    decision_tree = yaml.safe_load(file)

version: str = decision_tree.get("version")
name: str = decision_tree.get("name")

questions: List[Question] = [Question(**q) for q in decision_tree.get("questions", [])]
conclusions: List[Conclusion] = [
    Conclusion(**q) for q in decision_tree.get("conclusions", [])
]

nodes: List[CustomNode] = []
links: List[Link] = []


def find_node_by_id(node_id):
    for node in nodes:
        if node.id_ == node_id:
            return node

    raise Exception(f"Node with id {node_id} not found")


# create conclusion nodes
for conclusion in conclusions:
    nodes.append(
        CustomNode(
            id_="c-" + conclusion.conclusionId,
            content=conclusion.conclusion,
            shape="hexagon",
            callback_tooltip=conclusion.obligation,
        )
    )

# create question nodes
subgraphs = {}
for question in questions:
    sub_nodes = []

    nodes.append(
        CustomNode(
            id_="q-" + question.questionId,
            content=question.questionId + ": " + question.simplifiedQuestion,
            shape="round-edge",
            callback_tooltip=question.question,
            category=question.category,
        )
    )
    if question.category not in subgraphs:
        subgraphs[question.category] = ["q-" + question.questionId]
    else:
        subgraphs[question.category].append("q-" + question.questionId)

# create links between nodes (question and conclusion)
for question in questions:
    answers: List[Answer] = [Answer(**a) for a in question.answers]

    origin = find_node_by_id("q-" + question.questionId)

    for answer in answers:
        if answer.nextQuestionId:
            end = find_node_by_id("q-" + answer.nextQuestionId)
            links.append(CustomLink(origin=origin, end=end, message=answer.answer))
        elif answer.nextConclusionId:
            end = find_node_by_id("c-" + answer.nextConclusionId)
            links.append(CustomLink(origin=origin, end=end, message=answer.answer))
        elif answer.redirects:
            redirects: List[Redirect] = [
                Redirect(
                    nextQuestionId=r.get("nextQuestionId"),
                    nextConclusionId=r.get("nextConclusionId"),
                    if_condition=r["if"],
                )
                for r in answer.redirects
            ]

            for redirect in redirects:
                if redirect.nextQuestionId:
                    match = re.findall('(?:"(.*?)")', redirect.if_condition)
                    end = find_node_by_id("q-" + redirect.nextQuestionId)
                    links.append(
                        CustomLink(
                            origin=origin,
                            end=end,
                            message=answer.answer + ": " + ", ".join(match),
                        )
                    )
                elif redirect.nextConclusionId:
                    match = re.findall('(?:"(.*?)")', redirect.if_condition)
                    end = find_node_by_id("c-" + redirect.nextConclusionId)
                    links.append(
                        CustomLink(
                            origin=origin,
                            end=end,
                            message=answer.answer + ": " + ", ".join(match),
                        )
                    )
                else:
                    print(
                        f"Error: No nextQuestionId or nextConclusionId found in redirects for question {question.questionId}"
                    )

        else:
            print(
                f"Error: No nextQuestionId or nextConclusionId found in answer for question {question.questionId}"
            )


config = Config(
    theme=Themes.BASE,
    primary_color="#007bc7",
    primary_text_color="#000000",
    primary_border_color="#007bc7",
    secondary_color="#CCE7F4",
    line_color="#154273",
)

orientation = Direction.TOP_TO_BOTTOM

# create complete graph and write into html
subgraphs = defaultdict(list)
for link in links:
    if f"{link.origin.id_}" not in subgraphs[link.origin.category]:
        subgraphs[link.origin.category].append(f"{link.origin.id_}")
    if f"{link.end.id_}" not in subgraphs[
        link.origin.category
    ] and link.end.id_.startswith("c-"):
        subgraphs[link.origin.category].append(f"{link.end.id_}")

subgraphs_complete = "\n".join(
    [
        f"subgraph {category}\n" + "\n".join(questions) + "\nend"
        for category, questions in subgraphs.items()
    ]
    + ["classDef commonStyle fill:#FFFFFF,stroke:#39870c,stroke-width:2px"]
    + [f"class {category} commonStyle" for category in subgraphs]
)
flowchart_complete = FlowChart(
    title=name, nodes=nodes, links=links, orientation=orientation, config=config
)
create_html(
    "./mermaid_links/decision-tree-complete.html",
    flowchart_complete.script + subgraphs_complete,
)

# Create subgraphs and write into htmls
nodes_by_category = defaultdict(list)
links_by_category = defaultdict(list)


def get_category(subgraphs, link):
    return next((key for key, values in subgraphs.items() if link in values), None)


for category, cat_questions in subgraphs.items():
    links_by_category[category] = [
        link for link in links if link.origin.id_ in cat_questions
    ]
    nodes_by_category[category] = [node for node in nodes if node.id_ in cat_questions]
    flowchart = FlowChart(
        title=category,
        nodes=nodes_by_category.get(category, []),
        links=links_by_category.get(category, []),
        orientation=orientation,
        config=config,
    )

    subgraph_links = {
        link.end.id_
        for link in links_by_category[category]
        if link.end.id_ not in cat_questions
    }

    htmls = "\n".join(
        [
            f'click {link} href "decision-tree-subgraphs-{end_category}.html" "{end_category}"'
            for link in subgraph_links
            if (end_category := get_category(subgraphs, link)) is not None
        ]
    )

    create_html(
        "./mermaid_links/decision-tree-subgraphs-" + category + ".html",
        flowchart.script + "\n" + htmls,
    )

# Create main graph and write into html
pairs_main = "\n".join(
    {
        f"{link.origin.category} --> {link.end.category}"
        for link in links
        if link.origin.category != link.end.category and link.end.category
    }
)

htmls = "\n".join(
    [
        f'click {category} href "decision-tree-subgraphs-{category}.html" "{category}"'
        for category in subgraphs
    ]
)

flowchart_main = FlowChart(title=name, config=config)


create_html(
    "./mermaid_links/decision-tree-main.html",
    flowchart_main.script + pairs_main + "\n" + htmls,
)


# TO DO: make sure that html is rendered correctly.
# try:
#     mermaid_str = dict_to_str(subgraph)

#     if not flowchart.script:
#         raise ValueError("Error: The flowchart script is empty.")

#     if not mermaid_str.strip():
#         raise ValueError("Error: The Mermaid diagram string is empty.")

#     print("Flowchart script and Mermaid diagram are not empty.")
# except ValueError as e:
#     print(e)
#     sys.exit(1)
# except Exception as e:
#     print(f"An unexpected error occured: {e}")
#     sys.exit(1)
