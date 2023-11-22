export default async function decorate(block) {
	let apiResponse = {};
	const url = block.children?.[0].children?.[0]?.innerHTML || null;
	if (url) {
		try {
			const xls = await fetch(url);
			const parsedxls = await xls.json();
			if (parsedxls?.data) {
				const keys = ["id", "imageUrl", "name", "title", "description"];
				const fragment = new DocumentFragment();
				parsedxls.data.forEach((row) => {
					const div = document.createElement("div");
					div.className = "item";
					keys.forEach((key) => {
						const p = document.createElement("p");
						p.className = key;
						p.innerHTML = row[key];
						div.appendChild(p);
					});
					fragment.appendChild(div);
				});
				block.innerHTML = "";
				block.appendChild(fragment);
			}
		} catch {}
	}
}
