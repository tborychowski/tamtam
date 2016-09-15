import DOM from './dom-helper';
import Tree from './tree';


function parse (src) {
	const parser = new DOMParser();
	const xml = parser.parseFromString(`<root>${src}</root>`, 'text/xml');

	if (xml.getElementsByTagName('parsererror').length) {
		console.error(xml.getElementsByTagName('parsererror'));
		throw 'error while parsing';
	}

	const tree = DOM.getTree(xml.childNodes[0].children);

	return {
		tree,
		blocks: DOM.getBlocks(tree),
		links: DOM.getLinks(tree)
	};
}


export default {
	parse
}
