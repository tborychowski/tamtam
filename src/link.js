import Util from './util';

let canvas;

function createStoreLink (src, tar) {
	var canvasOff = canvas.getBoundingClientRect();
	var srcPos = src.getBoundingClientRect();
	var tarPos = tar.getBoundingClientRect();

	var l1 = document.createElement('div');
	var l2 = document.createElement('div');
	l1.classList.add('link', 'link-arc-left');
	l2.classList.add('link', 'link-arc-right');

	var top, size, realSize, middle, left1, left2, margin = 5;

	// reverse positions if target is higher than source
	if (tarPos.top < srcPos.top) [srcPos, tarPos] = [tarPos, srcPos];

	top = srcPos.top + srcPos.height - canvasOff.top;
	size = tarPos.top - top - canvasOff.top;
	middle = srcPos.left + srcPos.width / 2 - canvasOff.left;


	// get real size of a square side from its diagonal
	realSize = Math.sqrt(size * size / 2) - margin * 2;
	top = top + (size - realSize) / 2 - margin;

	left1 = middle - realSize / 2 - 18;
	left2 = middle - realSize / 2 + 18;


	l1.style.top = top + 'px';
	l1.style.left = left1 + 'px';
	l1.style.height = realSize + 'px';
	l1.style.width = realSize + 'px';

	l2.style.top = top + 'px';
	l2.style.left = left2 + 'px';
	l2.style.height = realSize + 'px';
	l2.style.width = realSize + 'px';

	canvas.appendChild(l1);
	canvas.appendChild(l2);
}

function createRequestLink (src, tar) {
	var canvasOff = canvas.getBoundingClientRect();
	var srcPos = src.getBoundingClientRect();
	var tarPos = tar.getBoundingClientRect();

	var l1 = document.createElement('div');
	var l2 = document.createElement('div');
	var l3 = document.createElement('div');
	l1.classList.add('link', 'link-v');
	l2.classList.add('link', 'link-h');
	l3.classList.add('link', 'link-v');


	var top = srcPos.top + srcPos.height - canvasOff.top;
	var left = srcPos.left + srcPos.width / 2 - canvasOff.left;
	var height = tarPos.top - top - canvasOff.top;
	var width = tarPos.left + tarPos.width / 2 - left - canvasOff.left;
	var l2left;


	l1.style.top = top + 'px';
	l1.style.left = left + 'px';
	l1.style.height = (height / 2) + 'px';

	l3.style.top = (top + height / 2) + 'px';
	l3.style.left = (left + width) + 'px';
	l3.style.height = (height / 2) + 'px';

	if (width < 0) {
		l2left = left + width + 1;
		width = Math.abs(width);
	}
	else l2left = left;

	l2.style.top = (top + height / 2) + 'px';
	l2.style.left = l2left + 'px';
	l2.style.width = width + 'px';

	var linkReq = document.createElement('div');
	linkReq.classList.add('link-request');
	linkReq.style.left = (l2left + width / 2 - 10) + 'px';
	linkReq.style.top = (top + height / 2 - 10) + 'px';



	canvas.appendChild(l1);
	canvas.appendChild(l2);
	canvas.appendChild(l3);
	canvas.appendChild(linkReq);
}



function renderLink (link) {
	var src = document.getElementById(link.attrs.src);
	var tar = document.getElementById(link.attrs.target);

	if (!src || !tar) return;

	if (link.attrs.type === 'request') createRequestLink(src, tar);
	else if (link.attrs.type === 'store') createStoreLink(src, tar);
}


function render (canvas1, links) {
	canvas = canvas1;
	links.forEach(renderLink);
}

export default {
	render
};
