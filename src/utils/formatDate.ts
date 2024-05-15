export const formatDate = (string: string) => {
	const date = new Date(string);
  const month = date.toLocaleDateString("en-US", {
    month: "short",
  })
	const year = date.toLocaleDateString("en-US", {
		year: "numeric",
	})
	return `${year} ${month}`;
};