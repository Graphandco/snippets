import prisma from "../lib/prisma";
import SnippetsList from "../components/SnippetsList";

export default async function Page() {
	const snippets = await prisma.snippet.findMany({
		include: { category: true, language: true },
		orderBy: { createdAt: "desc" },
	});

	const categories = await prisma.category.findMany();
	const languages = await prisma.language.findMany();

	return (
		<div className="container mx-auto p-4 space-y-6">
			<h1 className="text-3xl font-bold">Gestion des Snippets</h1>

			<SnippetsList
				snippets={snippets}
				categories={categories}
				languages={languages}
			/>
		</div>
	);
}
