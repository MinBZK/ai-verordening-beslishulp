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
        node = Node(f"question{question['questionId']}", question['question'].replace("\n", " "))
        nodes.append(node)

        # add nodes for the results
        for answer in question['answers']:
            if 'result' in answer:
                if answer['result'] not in results:
                    results.append(answer['result'])
                    node_result = Node(f"result.{i}", answer['result'])
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

# print(nodes)
print(chart)

with open('graph.md', 'w') as f:
    f.write(chart.string)

# def parse_tree(tree, root, id="0"):
#     for option in tree.get("options", []):
#         if "text" in option:
#             o_node = Node(f"{id}.node", option.get("text"))
#             o_result = Node(f"{id}.result", option.get("result"))
#             edges.append(o_node)
#             edges.append(o_result)
#             edges.append(Link(root, o_node))
#             edges.append(Link(o_node, o_result))
#             if "next" in option:
#                 for i, t in enumerate(option.get("next")):
#                     parse_tree(t, o_result, f"{id}.{i}")
#         else:
#             o_node = Node(f"{id}.question", option.get("question"))
#             edges.append(o_node)
#             edges.append(Link(q_node, o_node))
#             parse_tree(option, o_node, f"{id}.0")


# decision_tree = yaml.load(open("decision-tree.yaml", "r"))
# q_node = Node("root_question", decision_tree["question"])
# nodes.append(q_node)
# parse_tree(decision_tree, q_node)



# with open('graph.md', 'w') as f:
#     f.write(chart.string)
