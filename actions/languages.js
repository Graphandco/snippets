"use server";

import prisma from "@/lib/prisma";

export async function addLanguage(formData) {
	const name = formData.get("name");

	if (!name) {
		throw new Error("Le nom du langage est requis.");
	}

	const newLanguage = await prisma.language.create({ data: { name } });
	return newLanguage; // ✅ retourne le langage créé
}

export async function deleteLanguage(formData) {
	const id = parseInt(formData.get("id"));

	if (isNaN(id)) {
		throw new Error("ID invalide.");
	}

	const deletedLanguage = await prisma.language.delete({ where: { id } });
	return deletedLanguage; // ✅ retourne le langage supprimé
}
