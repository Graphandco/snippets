"use server";

import prisma from "@/lib/prisma";

export async function addCategory(formData) {
	const name = formData.get("name");
	const newCategory = await prisma.category.create({ data: { name } });
	return newCategory; // ✅ retourne la catégorie créée
}

export async function deleteCategory(formData) {
	const id = parseInt(formData.get("id"));
	const deletedCategory = await prisma.category.delete({ where: { id } });
	return deletedCategory; // ✅ retourne la catégorie supprimée
}
