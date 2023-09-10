import {citeDocs} from './citations/cite.js';
import {editcDocs} from './citations/editc.js';
import {deletecDocs} from './citations/deletec.js';

export let docs = ({params}) => {
	if(!params) return; 
	switch (params) {
		case 'deletec':
			return deletecDocs;
		case 'cite':
			return citeDocs;
		case 'editc':
			return editcDocs;
	}
}	
