import prisma from "@/lib/prisma";
import { addCategory, deleteCategory } from "@/actions/categories";
import { addLanguage, deleteLanguage } from "@/actions/languages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrashIcon } from "lucide-react";

export default async function Page() {
	const categories = await prisma.category.findMany();
	const languages = await prisma.language.findMany();

	return (
		<div className="max-w-3xl mx-auto p-6 space-y-8">
			{/* Catégories */}
			<Card>
				<CardHeader>
					<CardTitle>Catégories</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						{categories.map((c) => (
							<li
								key={c.id}
								className="flex items-center justify-between border rounded-lg px-3 py-2 bg-black"
							>
								<span>{c.name}</span>
								<form action={deleteCategory}>
									<input
										type="hidden"
										name="id"
										value={c.id}
									/>
									<Button variant="destructive" size="sm">
										<TrashIcon size={16} />
									</Button>
								</form>
							</li>
						))}
					</ul>

					<form action={addCategory} className="mt-4 flex gap-2">
						<Input
							name="name"
							placeholder="Nouvelle catégorie"
							required
						/>
						<Button type="submit">Ajouter</Button>
					</form>
				</CardContent>
			</Card>

			{/* Langages */}
			<Card>
				<CardHeader>
					<CardTitle>Langages</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						{languages.map((l) => (
							<li
								key={l.id}
								className="flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900"
							>
								<span>{l.name}</span>
								<form action={deleteLanguage}>
									<input
										type="hidden"
										name="id"
										value={l.id}
									/>
									<Button variant="destructive" size="sm">
										<TrashIcon size={16} />
									</Button>
								</form>
							</li>
						))}
					</ul>

					<form action={addLanguage} className="mt-4 flex gap-2">
						<Input
							name="name"
							placeholder="Nouveau langage"
							required
						/>
						<Button type="submit">Ajouter</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
