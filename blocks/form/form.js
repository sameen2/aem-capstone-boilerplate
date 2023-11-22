const onChangeListener = (event) => {
	event.target.classList.remove("error");
};

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
		case "email":
			const text = document.createElement("input");
			text.id = id;
			text.type = type;
			text.placeholder = placeholder;
			text.addEventListener("change", onChangeListener);
			return text;
		case "textarea":
			const textarea = document.createElement("textarea");
			textarea.id = id;
			textarea.placeholder = placeholder;
			textarea.addEventListener("change", onChangeListener);
			return textarea;
		case "dropdown":
			const dropdown = document.createElement("select");
			placeholder.split(",").forEach((label, index) => {
				const option = document.createElement("option");
				option.value = label;
				option.innerHTML = label;
				if (index === 0) {
					option.value = "";
				}
				dropdown.appendChild(option);
			});
			dropdown.id = id;
			dropdown.addEventListener("change", onChangeListener);
			return dropdown;
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
		case "dropdown":
			return null;
		default:
			return null;
	}
};

const onFormSubmit = (event) => {
	event.preventDefault();
	let error = false;
	const name = event.target.querySelector("#name");
	const email = event.target.querySelector("#emailid");
	const comments = event.target.querySelector("#comments");
	const experience = event.target.querySelector("#experience");
	if (!name.value || !name.value.trim()) {
		error = true;
		name.className = "error";
	}
	if (!email.value || !email.value.trim()) {
		error = true;
		email.className = "error";
	}
	if (!comments.value || !comments.value.trim()) {
		error = true;
		comments.className = "error";
	}
	if (!experience.value) {
		error = true;
		experience.className = "error";
	}
	if (!error) {
		const payload = {
			name: name.value.trim(),
			emailId: email.value.trim(),
			experience: experience.value,
			comments: comments.value.trim(),
		};
		console.log("payload :: ", payload);
		fetch("/email-form", {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
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
