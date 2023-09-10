import db from './../../../db.js';

export let def = ({name, params}) =>
	new Promise(async (res, rej) => {
		name = name.toLowerCase();
		let output;
		let tag = params?.toLowerCase();
		if (tag) {
			if (!tag.startsWith('#')) return;	
			output = await db.collection('citations')
				.findOne({
					name, 
					"citations.tag": tag
				});
			if(output) {
				return res(output.citations.find(el=>el.tag===tag).text);
			} else {
				return res(`There's no such a thought of the specified thinker `);
			}
		} else {
			output = await db.collection('citations').findOne({name});
			if (output) {
				if (!!output.citations.length) {
					let randomIdx = Math.floor(Math.random()*output.citations.length);
					return res(output.citations[randomIdx].text);
				} else {
					return res(`No thoughts left`);
				} 
			}
		} 	
	})
