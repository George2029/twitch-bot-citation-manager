// main command handler

import * as commands from './commands/index.js';

export default 
	({
		command: {botCommand: name, botCommandParams: params}, 
		tags: {
			user_id, 
			mod, 
			broadcaster,
			vip
		},
		source: {nick: user_login}
	}) => {  
		return new Promise( async (res, rej) => {
			let result;
			const commandData = {
				user: {user_id, user_login},
				user_type: {vip, mod, broadcaster},
				name,
				params
			}
			switch (name) {

				case 'docs':
				// moderator commands				

  	    		case 'cite':
				case 'editc':
				case 'deletec':
				case 'mycitations':
					result = await commands[name](commandData);
					break;
   		   		default:
					result = await commands.def(commandData);
   		 	}

			return res(result);
		})
	}
