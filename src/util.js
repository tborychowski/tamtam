
function getCss (el) {
	const css = [];
	const bg = (typeof el.shade !== 'undefined' ? '#eee' : '#fff');
	if (el.x) css.push(`left:${el.x}px;`);
	if (el.y) css.push(`top:${el.y}px;`);
	if (el.w) css.push(`width:${el.w}px;`);
	if (el.h) css.push(`height:${el.h}px;`);
	css.push(`background-color:${bg};`);

	return css.join(' ');
}



export default {
	getCss
}