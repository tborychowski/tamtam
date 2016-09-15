
function getCss (el) {
	var css = '';
	if (el.x) css += 'left: ' + el.x + 'px;';
	if (el.y) css += 'top: ' + el.y + 'px;';
	if (el.w) css += 'width: ' + el.w + 'px;';
	if (el.h) css += 'height: ' + el.h + 'px;';
	return css;
}



export default {
	getCss
}