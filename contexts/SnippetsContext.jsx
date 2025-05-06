"use client";

import { createContext, useContext, useState } from "react";

// Créer le contexte
const SnippetsContext = createContext(null);

// Provider
export function SnippetsProvider({
	initialSnippets,
	initialCategories,
	initialLanguages,
	children,
}) {
	const [snippets, setSnippets] = useState(initialSnippets || []);
	const [categories, setCategories] = useState(initialCategories || []);
	const [languages, setLanguages] = useState(initialLanguages || []);

	return (
		<SnippetsContext.Provider
			value={{
				snippets,
				setSnippets,
				categories,
				setCategories,
				languages,
				setLanguages,
			}}
		>
			{children}
		</SnippetsContext.Provider>
	);
}

// Hook personnalisé pour utiliser le contexte
export function useSnippets() {
	const context = useContext(SnippetsContext);
	if (!context) {
		throw new Error("useSnippets must be used within a SnippetsProvider");
	}
	return context;
}
