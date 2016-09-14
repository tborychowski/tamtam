function assignAttrs (newNode, node) {
	if (!node || !node.attributes) return;

	for (let {name, value} of node.attributes) {
		newNode[name] = value;
	}

}

function getElFromNode (node) {
	var newNode = { tag: node.tagName };

	if (node.textContent && node.textContent === node.innerHTML) newNode.text = node.innerHTML;
	if (node.items) newNode.items = node.items;
	assignAttrs(newNode, node);

	return newNode;
}


function parseEl (el) {
	if (!el) return null;
	if (!el.children) return getElFromNode(el);

	el.items = el.items || [];
	for (let child of el.children) {
		el.items.push(parseEl(child));
	}

	return getElFromNode(el);
}


function parse (src) {
	const parser = new DOMParser();
	const xml = parser.parseFromString(`<root>${src}</root>`, 'text/xml');

	if (xml.getElementsByTagName('parsererror').length) {
		console.error(xml.getElementsByTagName('parsererror'));
		throw 'error while parsing';
	}

	const root = xml.childNodes[0];
	const parsed = parseEl(root).items.filter(item => item.tag);

	console.log(parsed);

	return {
		blocks: parsed.filter(item => item.tag !== 'link'),
		links: parsed.filter(item => item.tag === 'link')
	};
}


export default {
	parse
}
