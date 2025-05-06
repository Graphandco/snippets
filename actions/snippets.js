"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addSnippet(formData) {
	const title = formData.get("title");
	const content = formData.get("content");
	const description = formData.get("description");
	const categoryId = parseInt(formData.get("categoryId"));
	const languageId = parseInt(formData.get("languageId"));

	const snippet = await prisma.snippet.create({
		data: { title, content, description, categoryId, languageId },
		include: { category: true, language: true },
	});

	return snippet;
}

export async function deleteSnippet(formData) {
	const id = parseInt(formData.get("id"));
	const deletedSnippet = await prisma.snippet.delete({
		where: { id },
	});

	return deletedSnippet;
}

export async function toggleFavorite(formData) {
	const id = parseInt(formData.get("id"));

	const snippet = await prisma.snippet.findUnique({
		where: { id },
		select: { isFavorite: true },
	});

	if (!snippet) {
		throw new Error("Snippet not found");
	}

	const updatedSnippet = await prisma.snippet.update({
		where: { id },
		data: { isFavorite: !snippet.isFavorite },
		include: { category: true, language: true },
	});

	return updatedSnippet;
}
