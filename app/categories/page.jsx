"use client";

import { useState } from "react";
import { addCategory, deleteCategory } from "@/actions/categories";
import { addLanguage, deleteLanguage } from "@/actions/languages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrashIcon } from "lucide-react";
import { useSnippets } from "@/contexts/SnippetsContext";
import { toast } from "sonner";

export default function CategoriesLanguagesPage() {
	const { categories, setCategories, languages, setLanguages } =
		useSnippets();
	const [categoryInput, setCategoryInput] = useState("");
	const [languageInput, setLanguageInput] = useState("");

	const handleAddCategory = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", categoryInput);
		try {
			const newCategory = await addCategory(formData);
			setCategories((prev) => [...prev, newCategory]);
			setCategoryInput("");
			toast.success("Catégorie ajoutée !");
		} catch {
			toast.error("Erreur lors de l'ajout de la catégorie.");
		}
	};

	const handleDeleteCategory = async (id) => {
		const formData = new FormData();
		formData.append("id", id);
		try {
			const deletedCategory = await deleteCategory(formData);
			setCategories((prev) =>
				prev.filter((c) => c.id !== deletedCategory.id)
			);
			toast.success("Catégorie supprimée !");
		} catch {
			toast.error("Erreur lors de la suppression de la catégorie.");
		}
	};

	const handleAddLanguage = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", languageInput);
		try {
			const newLanguage = await addLanguage(formData);
			setLanguages((prev) => [...prev, newLanguage]);
			setLanguageInput("");
			toast.success("Langage ajouté !");
		} catch {
			toast.error("Erreur lors de l'ajout du langage.");
		}
	};

	const handleDeleteLanguage = async (id) => {
		const formData = new FormData();
		formData.append("id", id);
		try {
			const deletedLanguage = await deleteLanguage(formData);
			setLanguages((prev) =>
				prev.filter((l) => l.id !== deletedLanguage.id)
			);
			toast.success("Langage supprimé !");
		} catch {
			toast.error("Erreur lors de la suppression du langage.");
		}
	};

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
								<Button
									variant="destructive"
									size="sm"
									onClick={() => handleDeleteCategory(c.id)}
								>
									<TrashIcon size={16} />
								</Button>
							</li>
						))}
					</ul>

					<form
						onSubmit={handleAddCategory}
						className="mt-4 flex gap-2"
					>
						<Input
							name="name"
							placeholder="Nouvelle catégorie"
							required
							value={categoryInput}
							onChange={(e) => setCategoryInput(e.target.value)}
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
								<Button
									variant="destructive"
									size="sm"
									onClick={() => handleDeleteLanguage(l.id)}
								>
									<TrashIcon size={16} />
								</Button>
							</li>
						))}
					</ul>

					<form
						onSubmit={handleAddLanguage}
						className="mt-4 flex gap-2"
					>
						<Input
							name="name"
							placeholder="Nouveau langage"
							required
							value={languageInput}
							onChange={(e) => setLanguageInput(e.target.value)}
						/>
						<Button type="submit">Ajouter</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
