import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'search',
})
export class SearchPipe implements PipeTransform {

	transform(values: any, args: any) {
		const term = args.length ? args.toLowerCase() : '';
		// const jsonPath = args[1];
		let matchTerm = (item) => { return matchString(item) };
		let matchString = (key) => {
			if (typeof key === 'string') {
				return key.toLowerCase().indexOf(term) > -1;
			}
			return Object.keys(key).some((prop) => { return matchTerm(key[prop]) });
		};
		return values.filter(matchString);
		// return values.filter((item) => {
		// 	const itemValues = JSON.stringify(item).replace(/[a-z]+":/gmi, '');
		// 	return itemValues.toLowerCase().indexOf(term) > -1;
		// });
	}
}
