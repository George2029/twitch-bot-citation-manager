import db from './../../../../db.js';

export let mycitations = ({user: {user_id}, user_type: {broadcaster, mod}}) => 
	new Promise( async (res, rej) => {

		let citations = db.collection('citations');

		if (!(broadcaster || mod)) return "Moderator command";

		let query = {"citations.user_id": user_id}

		let data = await citations.find(query, {projection: { _id: 0, name: 1, "citations.tag": 1 }}).toArray();		
		if(!data.length) return res('Not Found');

		let arr = [];
		data.forEach(author => author.citations.forEach(citation=>arr.push(`${author.name}: ${citation.tag}`)));
		
		return res(`Total: ${arr.length}. ${arr.slice(0, 25).join(' ')}`.slice(0, 500));
	})
