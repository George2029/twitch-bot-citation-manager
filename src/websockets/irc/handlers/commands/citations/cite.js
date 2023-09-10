import db from './../../../../db.js';

let description = `Moderator command. *CITATIONS* The command memorizes people's thoughts. 3 parameters required: name - citation's author, #tag - tag for a citation, text - citation's text. Example usage: "!cite jordanpeterson #compare Compare yourself to who you were yesterday, not to who someone else is today.". The name and tag parameters are case insensitive`;

export let citeDocs = description;

export let cite = ({user: {user_id, user_login}, user_type: {broadcaster, mod}, params}) => 
	new Promise(async (res, rej) => {
		let result;
 			if (mod || broadcaster) {
   				if (params?.split(' ').length > 2) {
       				params = params.toLowerCase().split(' ');
					let name = params[0];
					let tag = params[1];
					if(!tag.startsWith('#') || tag === '#') {
						return res(`Forgot to specify a tag. Enter it right after author's name appending '#' to the start, without spaces in between.`);
					};
					let text = `${name}: ${params.slice(2).join(' ')}`;
					let author = await db.collection('citations').findOne(
   						{
      						name, 
   						})
       				if (!author) {
       					result = await db.collection('citations').insertOne({
        					name, 
           					citations: [
           						{tag, text, user_id, user_login}
           					]
       					});
						return res(`${name}'s thought was successfully added`);
            		} else if(author.citations.some(citation=>citation.tag == tag)) {
						return res(`There is already such a tagged thought, try using !editc instead, if you want to modify it`);
					} else {
              			result = await db.collection('citations').updateOne(
                			{name}, 
                			{$push: 
                  			{citations: 
           						{tag, text, user_id, user_login}
                  			}
                		})
						console.log(result);
						return res(`${name}'s thought was successfully added`);
            		}
				} else {
					return res(description);
				}
			} else {
				return res(`Moderator command`);
			}
	})
