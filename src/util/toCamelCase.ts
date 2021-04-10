interface Obj {
	[prop: string]: any;
}

export const toCamelCase = (rows: any[]) => {
	return rows.map((row) => {
		const replaced: Obj = {};

		for (let key in row) {
			const camelCase = key.replace(/([-_][a-z])/gi, ($1) => {
				return $1.toUpperCase().replace("_", "");
			});

			replaced[camelCase] = row[key];
		}

		return replaced;
	});
};
