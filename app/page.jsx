import prisma from "../lib/prisma";
import SnippetsList from "../components/SnippetsList";

export default async function Page() {
	const snippets = await prisma.snippet.findMany({
		include: { category: true, language: true },
		orderBy: { createdAt: "asc" },
	});

	const categories = await prisma.category.findMany();
	const languages = await prisma.language.findMany();

	return (
		<div className="wrapper mt-8">
			<SnippetsList
				snippets={snippets}
				categories={categories}
				languages={languages}
			/>
		</div>
	);
}
