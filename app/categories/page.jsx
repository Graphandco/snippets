import prisma from "@/lib/prisma";
import { addCategory, deleteCategory } from "@/actions/categories";
import { addLanguage, deleteLanguage } from "@/actions/languages";

export default async function Page() {
	const categories = await prisma.category.findMany();
	const languages = await prisma.language.findMany();

	return (
		<div>
			<h1>Catégories</h1>
			<ul>
				{categories.map((c) => (
					<li key={c.id}>
						{c.name}
						<form action={deleteCategory}>
							<input type="hidden" name="id" value={c.id} />
							<button type="submit">Supprimer</button>
						</form>
					</li>
				))}
			</ul>
			<form action={addCategory}>
				<input name="name" placeholder="Nouvelle catégorie" required />
				<button type="submit">Ajouter</button>
			</form>

			<h1>Langages</h1>
			<ul>
				{languages.map((l) => (
					<li key={l.id}>
						{l.name}
						<form action={deleteLanguage}>
							<input type="hidden" name="id" value={l.id} />
							<button type="submit">Supprimer</button>
						</form>
					</li>
				))}
			</ul>
			<form action={addLanguage}>
				<input name="name" placeholder="Nouveau langage" required />
				<button type="submit">Ajouter</button>
			</form>
		</div>
	);
}
