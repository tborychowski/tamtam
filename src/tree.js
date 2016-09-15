
function map (subNodeName, fn) {
	return (nodes) => {
		if (!nodes) return null;

		if (nodes.length && typeof nodes !== 'string') {
			return Array.from(nodes).map(map(subNodeName, fn));
		}

		const newNode = fn(nodes) || {};

		if (nodes[subNodeName] && nodes[subNodeName].length && typeof newNode === 'object') {
			newNode[subNodeName] = map(subNodeName, fn)(nodes[subNodeName]);
		}

		return newNode;
	}
}


function filter (subNodeName, fn) {
	return (nodes) => {
		if (!nodes) return false;
		if (nodes.length) return nodes.filter(filter(subNodeName, fn));
		if (!nodes[subNodeName] || !nodes[subNodeName].length) {
			return fn(nodes) || false;
		}

		const newNodes = Object.assign({}, nodes);

		newNodes[subNodeName] = Array
			.from(nodes[subNodeName])
			.filter(filter(subNodeName, fn));

		if (newNodes[subNodeName].length) return newNodes;

		return fn(newNodes) ? newNodes : false;
	}
}

function flatten1 (subNodeName, parentNode) {
	return (nodes) => {
		if (!nodes) return [];

		if (nodes.length && typeof nodes !== 'string') {
			return nodes.map(flatten1(subNodeName, parentNode));
		}

		const newNode = Object.assign({}, nodes);
		delete newNode.children;
		newNode.parentNode = parentNode || 'ROOT';

		let newNodes = [];

		if (nodes[subNodeName] && nodes[subNodeName].length && typeof newNodes === 'object') {
			newNodes = flatten1(subNodeName, nodes.attrs.id)(nodes[subNodeName]);
		}
		if (newNodes.length) newNodes.push(newNode);
		else newNodes = newNode;

		return newNodes;
	}
}

function flatten2 (list) {
	return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten2(b) : b), []);
}


function flatten (nodes, subNodeName = 'children') {
	const flat1 = flatten1(subNodeName)(nodes);
	return flatten2(flat1);
}


function deflatten (arr, subNodeName = 'children') {
	return function (node = { attrs: { id: 'ROOT' }}) {
		const items = arr.filter(item => item.parentNode === node.attrs.id);
		if (items.length) {
			node[subNodeName] = items.map(deflatten(arr, subNodeName));
		}
		return node;
	}
}

export default {
	filter: (nodes, subNodeName, fn) => filter(subNodeName, fn)(nodes),
	map: (nodes, subNodeName, fn) => map(subNodeName, fn)(nodes),
	flatten,
	deflatten: arr => deflatten(arr)().children
}