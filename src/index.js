import Parser from './parser.js';
import Renderer from './renderer.js';


function update (canvas, code) {
	return () => {
		const parsed = Parser.parse(code.value);
		Renderer.render(canvas, parsed);
	}
}


function onload () {
	const code = document.getElementById('code');
	const canvas = document.getElementById('canvas');
	code.value = '<box x="30" y="10" w="200" h="100" id="box1">box1</box>\n' +
				'<box x="20" y="200" w="200" h="100" id="box2">box2</box>\n' +
				'<link src="box1" target="box2" type="request"></link>\n\n' +

				'<store x="20" y="400" w="200" h="100" id="store1">DB1</store>\n' +
				'<link src="store1" target="box2" type="store"></link>' +
				'';

	code.addEventListener('keyup', update(canvas, code));
	update(canvas, code)();
	code.focus();
}



window.addEventListener('load', onload);
