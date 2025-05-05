"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCategory(formData) {
	const name = formData.get("name");
	await prisma.category.create({ data: { name } });
	revalidatePath("/categories");
}

export async function deleteCategory(formData) {
	const id = parseInt(formData.get("id"));
	await prisma.category.delete({ where: { id } });
	revalidatePath("/categories");
}
