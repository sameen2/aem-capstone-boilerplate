const createFormElement = (row) => {
	if (!row?.children || ![...row.children].length) {
		return null;
	}
	const [typeEl, idEl, placeholderEl] = [...row.children];
	const id = idEl.textContent;
	const type = typeEl.textContent;
	const placeholder = placeholderEl.innerHTML;
	switch (type) {
		case "text":
			const text = document.createElement("input");
			text.id = id;
			text.type = type;
			text.placeholder = placeholder;
			return text;
		case "checkbox":
			const span = document.createElement("span");
			const label = document.createElement("label");
			const checkbox = document.createElement("input");
			label.htmlFor = id;
			span.innerHTML = placeholder;
			checkbox.id = id;
			checkbox.checked = false;
			checkbox.type = "checkbox";
			label.appendChild(checkbox);
			label.appendChild(span);
			return label;
		default:
			return null;
	}
};

const onFormSubmit = (event) => {
	event.preventDefault();
	console.log("form submit :: ", event, event.target);
};

export default async function decorate(block) {
	const documentFragment = new DocumentFragment();
	const form = document.createElement("form");
	form.addEventListener("submit", onFormSubmit);
	documentFragment.appendChild(form);
	[...block.children].forEach((row) => {
		const div = document.createElement("div");
		div.className = "form-element";
		const rowElement = createFormElement(row);
		div.appendChild(rowElement);
		form.appendChild(div);
	});
	const submitButton = document.createElement("button");
	submitButton.type = "submit";
	submitButton.innerHTML = "Submit";
	form.appendChild(submitButton);
	block.innerHTML = "";
	block.appendChild(documentFragment);
}
