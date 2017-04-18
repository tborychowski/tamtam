import Parser from './parser';
import Renderer from './renderer';

const defHtml = `<box x=20 y=10 w=232 h=170 id=box1 shade>box1
	<box x=10 id=innerBox1 w=100>inner box 1</box>
	<box x=120 w=100>inner box 2</box>
	<store x=10 y=120 w=210 id=innerStore1>inner store 1</store>
	<link src=innerBox1 target=innerStore1 type=store></link>
</box>

<box x=20 y=250 w=232 h=70 id=box2>box2</box>
<link src=box1 target=box2 type=request></link>

<store x=20 y=400 w=235 h=60 id=store1>DB1</store>
<link src=store1 target=box2 type=store></link>
`;



function update (canvas, code) {
	return () => {
		const parsed = Parser.parse(code.value);
		Renderer.render(canvas, parsed);
	}
}


function onload () {
	const code = document.getElementById('code');
	const canvas = document.getElementById('canvas');
	code.value = defHtml;

	code.addEventListener('keyup', update(canvas, code));
	update(canvas, code)();
	code.focus();
}



window.addEventListener('load', onload);
