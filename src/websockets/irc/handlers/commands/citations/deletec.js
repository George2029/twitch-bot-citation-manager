import db from './../../../../db.js';

export let deletecDocs = `Only for mods. Removes a citation. An author's name and a tag are required. Case insensitive. Example usage: !deletec biden #kids`; 

export let deletec = ({user: {user_id}, user_type: {mod, broadcaster}, params}) => 
	new Promise( async (res, rej) => {
		if(mod || broadcaster) {
			if(paramsArr?.length === 2) {
				let paramsArr = params?.toLowerCase().split(' ');
				let name = paramsArr[0];
				let tag = paramsArr[1];
				let citation = await db.collection('citations').findOne({name, "citations.tag": tag});
				if (citation.user_id !== user_id && citation.user_id) return res(`Only the submitter can delete it: ${citation.user_login}`);
				let result = await db
						.collection('citations')
						.updateOne(
								{
									name, 
									citations: {$elemMatch: {tag}}
								}, 
								{$pull: {citations: {tag}}}
						);
				if (result.modifiedCount != 0) {
					return res('Removed this thought');
				} else {
					return res('There is no such a thought of the specified thinker');
				}
			} else {
				return res('!delete command requires 2 parameters: thinker and tag');
			}
		} else {
			return res('Only for the moderator-submitter');
		}

	})
