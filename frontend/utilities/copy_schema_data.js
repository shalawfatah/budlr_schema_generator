export function copy_schema_data(schemaData) {
	navigator.clipboard
		.writeText(schemaData)
		.then(() => {
			console.log('Schema data copied to clipboard!');
		})
		.catch((err) => {
			console.error('Failed to copy schema data:', err);
		});
}
