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
	return Array.from(item.childNodes)
			.filter(item => item.nodeName === '#text')
			.map(item => item.textContent)
			.join(' ').trim();
}


function getTree (dom) {
	return Tree.map(dom, 'children', item => {
		return {
			tag: item.tagName,
			text: getTextContent(item),
			attrs: getAttributes(item)
		};
	});
}

function getBlocks (tree) {
	return Tree.filter(tree, 'children', item => {
		return item.tag === 'box' || item.tag === 'store';
	});
}

function getLinks (tree) {
	return Tree.filter(tree, 'children', item => {
		return item.tag === 'link';
	});
}


export default {
	getAttributes,
	getTextContent,
	getTree,
	getBlocks,
	getLinks
}
