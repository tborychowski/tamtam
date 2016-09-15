
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
		if (nodes.length) return Array.from(nodes).filter(filter(subNodeName, fn));
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

export default {
	filter: (nodes, subNodeName, fn) => filter(subNodeName, fn)(nodes),
	map: (nodes, subNodeName, fn) => map(subNodeName, fn)(nodes)
}