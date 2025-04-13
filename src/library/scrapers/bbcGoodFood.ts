import * as cheerio from 'cheerio';
import type { RecipeResult } from '../../types/recipe';

export async function scrapeBBC(url: string): Promise<RecipeResult> {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Failed to fetch: ${res.status}`);
	}
	const html = await res.text();
	const $ = cheerio.load(html);

	const title = $('h1').text().trim() || 'Untitled Recipe';
	const ingredients: string[] = [];
	$('.recipe__ingredients ul li, .ingredients-list__item').each((i, el) => {
		ingredients.push($(el).text().trim());
	});

	const method: string[] = [];

	// Try common step containers first
	$(
		'.editor-content ol li, .method__item, .grouped-list__list-item, .method__list p, .instructions-section li, .method li'
	).each((i, el) => {
		const text = $(el).text().trim();
		if (text) method.push(text);
	});

	// Fallback: use paragraph tags under editor-content if nothing found
	if (method.length === 0) {
		$('.editor-content p').each((i, el) => {
			const text = $(el).text().trim();
			if (text.length > 30) {
				method.push(text);
			}
		});
	}

	return { title, ingredients, method, sourceUrl: url };
}
