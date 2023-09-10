import db from './../../../../db.js';

let description = `For mods only. The command is used to edit a citation. 3 parameters required: a name of an author, a tag of a citation, a new text. Example usage: "!editc statham #advice stop stopping yourself!". The name and the tag parameters are case insensitive.`;

export let editcDocs = description;

export let editc = ({user: {user_id}, user_type: {mod, broadcaster}, params}) => 
	new Promise( async (res, rej) => {
		if(mod || broadcaster) {
			if(paramsArr?.length > 2) {
       			params = params.toLowerCase().split(' ');
				let name = params[0];
				let tag = params[1];

				let citation = await db.collection('citations').findOne({name, "citations.tag": tag});
				if (citation.user_id !== user_id && citation.user_id) {
					return res(`Only the submitter can modify it: ${citation.user_login}`);
				}

				let text = `${name}: ${paramsArr.slice(2).join(' ')}`;
				let result = await db.collection('citations').updateOne(
					{
						name, 
						"citations.tag": tag
					}, 
					{
						$set: {"citations.$.text": text}
					})

				if (result.modifiedCount != 0) {
					return res(`updated the thought of the specified thinker`);
				} else {
					return res('there is no such a thought to edit. try add it then.'); 
				}
			} else {
				return res('!edit command requires 3 params: thinker, tag, text');
			}
		} else {
			return res('Only for the moderator-submitter');
		}
				


	})
