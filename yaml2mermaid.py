import yaml

with open("decision-tree.yaml") as stream:
    try:
        data_loaded = yaml.safe_load(stream)
    except yaml.YAMLError as exc:
        print(exc)

# print(data_loaded['questions'])

from python_mermaid.diagram import (
    MermaidDiagram, Node, Link
)

nodes = []
edges = []
results = []

def parse_tree(tree):
    i = 0

    # add all nodes
    for question in data_loaded['questions']:
        node = Node(f"question{question['questionId']}", "`" + question['question'].replace("\n", " ") + "`")
        nodes.append(node)

        # add nodes for the results
        for answer in question['answers']:
            if 'result' in answer:
                if answer['result'] not in results:
                    results.append(answer['result'])
                    node_result = Node(f"result.{i}", "`" + answer['result'] + "`")
                    i += 1
                    nodes.append(node_result)

                    edge = Link(node, node_result, message=answer['answer'])
                    edges.append(edge)

            elif 'nextQuestionId' in answer:
                    node_next = Node(f"question{answer['nextQuestionId']}", "")
                    edge = Link(node, node_next, message=answer['answer'])
                    edges.append(edge)

parse_tree(data_loaded)


chart = MermaidDiagram(
    title="AI Act Beslisboom",
    nodes=nodes,
    links=edges
)

print(chart)

with open('graph.md', 'w') as f:
    f.write(chart.string)
