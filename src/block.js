import Tree from './tree';
import Util from './util';



function getBlockHtml (el) {
	return `<div id="${el.attrs.id}" class="${el.tag}" style="${Util.getCss(el.attrs)}">
${el.text || ''}
${el.html || ''}
</div>`;
}


function render (canvas, blocks) {
	let html = Tree.map(blocks, 'children', item => {
		if (!item.children) return getBlockHtml(item);
		return item;
	});


	html = Tree.map(html, 'children', item => {
		if (typeof item !== 'string' && item.children) {
			item.html = item.children.join('');
			item = getBlockHtml(item);
		}
		return item;
	});

	canvas.innerHTML = html.join('');
}

export default {
	render
};
