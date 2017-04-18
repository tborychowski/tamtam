import DOM from './dom-helper';
import Tree from './tree';


function parse (src) {
	const parser = new DOMParser();
	const html = parser.parseFromString(src, 'text/html');
	const body = html.body;
	if (body.getElementsByTagName('parsererror').length) {
		console.error(body.getElementsByTagName('parsererror'));
		throw 'error while parsing';
	}

	const tree = DOM.getTree(body.children);
	return {
		tree,
		blocks: DOM.getBlocks(tree),
		links: DOM.getLinks(tree)
	};
}


export default {
	parse
}
