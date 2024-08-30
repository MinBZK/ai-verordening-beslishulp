#!/usr/bin/env python3

import re
from dataclasses import dataclass
from typing import List, Optional, Union

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
    ) -> None:
        # call super and use result to add the id

        self.callback_tooltip = callback_tooltip.replace(
            "\n", "#specialnewline#"
        ).replace("\r", "")

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


# function to only remove all special characters
def escape_for_mermaid(text):
    return text.replace("||", "of").replace("&&", "en")


def dict_to_str(subgraph):
    mermaid_array = []
    for group, questions in subgraph.items():
        mermaid_array.append(f"subgraph {group}")
        mermaid_array.extend(questions)
        mermaid_array.append("end")
    return "\n".join(mermaid_array)


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
    group: str
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

nodes: List[Node] = []
links: List[Link] = []


def find_node_by_id(node_id):
    for node in nodes:
        if node.id_ == node_id:
            return node

    raise Exception(f"Node with id {node_id} not found")


for conclusion in conclusions:
    nodes.append(
        CustomNode(
            id_="c-" + conclusion.conclusionId,
            content=conclusion.conclusion,
            shape="hexagon",
            callback_tooltip=conclusion.obligation,
        )
    )

for question in questions:
    sub_nodes = []

    nodes.append(
        CustomNode(
            id_="q-" + question.questionId,
            content=question.questionId + ": " + question.simplifiedQuestion,
            shape="round-edge",
            callback_tooltip=question.question,
        )
    )

subgraph = {}

for question in questions:
    answers: List[Answer] = [Answer(**a) for a in question.answers]

    origin = find_node_by_id("q-" + question.questionId)

    # fill in subgraph dictionairy based on group
    if question.group not in subgraph:
        subgraph[question.group] = ["q-" + question.questionId]
    else:
        subgraph[question.group].append("q-" + question.questionId)

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

flowchart = FlowChart(
    title=name, nodes=nodes, links=links, orientation=orientation, config=config
)

with open("decision-tree.html", "w") as file:
    file.write(
        """
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Decision tree</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
  <script src='https://unpkg.com/mermaid@11.0.2/dist/mermaid.min.js'></script>
  <script>
    window.callback = function (name) {
      let cookieValue = document.getElementsByClassName("mermaidTooltip");
      let modelcontent1 = document.getElementById("modelcontent1");
      let model1 = document.getElementById("model1");
      console.log(cookieValue[0]);
      // hide the tooltip
      cookieValue[0].style.display = "none";

      modelcontent1.innerHTML = cookieValue[0].innerText.replaceAll("#specialnewline#", "<br>");;
      model1.classList.add('is-active');
    };

    document.addEventListener('DOMContentLoaded', () => {
      let modealclose1 = document.getElementById("modealclose1");
      modealclose1.addEventListener('click', () => {
        let model1 = document.getElementById("model1");
        model1.classList.remove('is-active');
      });

    });

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

</html>
        """.replace("{script}", (flowchart.script + dict_to_str(subgraph)))
    )
# //.format(script=flowchart.script)
