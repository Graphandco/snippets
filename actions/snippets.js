"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function addSnippet(formData) {
	const title = formData.get("title");
	const content = formData.get("content");
	const description = formData.get("description");
	const categoryId = parseInt(formData.get("categoryId"));
	const languageId = parseInt(formData.get("languageId"));

	await prisma.snippet.create({
		data: { title, content, description, categoryId, languageId },
	});

	revalidatePath("/");
}

export async function deleteSnippet(formData) {
	const id = parseInt(formData.get("id"));
	await prisma.snippet.delete({
		where: { id },
	});

	revalidatePath("/");
}
