// actions/languages.js
"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

// Action pour ajouter un langage
export async function addLanguage(formData) {
	const name = formData.get("name");

	if (!name) {
		throw new Error("Le nom du langage est requis.");
	}

	await prisma.language.create({
		data: { name },
	});

	revalidatePath("/categories"); // Revalider la page des catégories après ajout
}

// Action pour supprimer un langage
export async function deleteLanguage(formData) {
	const id = parseInt(formData.get("id"));

	if (isNaN(id)) {
		throw new Error("ID invalide.");
	}

	await prisma.language.delete({
		where: { id },
	});

	revalidatePath("/categories"); // Revalider la page des catégories après suppression
}
