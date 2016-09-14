import Util from './util';



function renderBlock (el) {
	return `<div id="${el.id}" class="${el.tag}" style="${Util.getCss(el)}">${el.text || ''}</div>`;
}


function render (blocks) {
	if (!blocks.length) return renderBlock(blocks);
	return blocks.map(render).join('');

}

export default {
	render: (canvas, blocks) => {
		canvas.innerHTML = render(blocks);
	}
};
