import Blocks from './block';
import Links from './link';

export default {
	render: (canvas, { blocks, links }) => {
		Blocks.render(canvas, blocks);
		Links.render(canvas, links);
	}
};
