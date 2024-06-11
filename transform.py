import json

from python_mermaid.diagram import (
    MermaidDiagram, Node, Link
)

#
# meg = Node("Meg")
# jo = Node("Jo")
# beth = Node("Beth")
# amy = Node("Amy")
# robert = Node("Robert March")
#
# nodes = [meg, jo, beth, amy, robert]
#
# edges = [
#     Link(robert, meg),
#     Link(robert, jo),
#     Link(robert, beth),
#     Link(robert, amy),
# ]

nodes = []
edges = []


def parse_tree(tree, root, id="0"):
    for option in tree.get("options", []):
        if "text" in option:
            o_node = Node(f"{id}.node", option.get("text"))
            o_result = Node(f"{id}.result", option.get("result"))
            edges.append(o_node)
            edges.append(o_result)
            edges.append(Link(root, o_node))
            edges.append(Link(o_node, o_result))
            if "next" in option:
                for i, t in enumerate(option.get("next")):
                    parse_tree(t, o_result, f"{id}.{i}")
        else:
            o_node = Node(f"{id}.question", option.get("question"))
            edges.append(o_node)
            edges.append(Link(q_node, o_node))
            parse_tree(option, o_node, f"{id}.0")


decision_tree = json.load(open("decisiontree.json", "r"))
q_node = Node("root_question", decision_tree["question"])
nodes.append(q_node)
parse_tree(decision_tree, q_node)

chart = MermaidDiagram(
    title="AI Act Beslisboom",
    nodes=nodes,
    links=edges
)

with open('graph.md', 'w') as f:
    f.write(chart.string)
