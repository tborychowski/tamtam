import Tree from './tree';

function getAttributes (node) {
	if (!node || !node.attributes) return;
	const attrs = {};
	for (let {name, value} of node.attributes) {
		attrs[name] = value;
	}
	return attrs;
}

function getTextContent (item) {
	if (!item.childNodes) return '';
	return Array.from(item.childNodes)
			.filter(item => item.nodeName === '#text')
			.map(item => item.textContent)
			.join(' ').trim();
}


function getTree (dom) {
	return Tree.map(dom, 'children', item => {
		return {
			tag: item.tagName.toLowerCase(),
			text: getTextContent(item),
			attrs: getAttributes(item)
		};
	});
}

function getBlocks (tree) {
	const f = Tree.flatten(tree).filter(item => {
		return item.tag === 'box' || item.tag === 'store';
	});

	return Tree.deflatten(f);
}

function getLinks (tree) {
	const f = Tree.flatten(tree).filter(item => {
		return item.tag === 'link';
	});

	// return Tree.deflatten(f);
	return f;
}


export default {
	getAttributes,
	getTextContent,
	getTree,
	getBlocks,
	getLinks
}
