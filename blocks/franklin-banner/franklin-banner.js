export default function decorate(block) {
	let object = {};
	[...block?.children]?.forEach((topChild) => {
		if (topChild?.children?.length === 2) {
			const [type, content] = [...topChild.children];
			const typeTextContent = type.textContent;
			switch (typeTextContent) {
				case "title":
					object[typeTextContent] = document.createElement("p");
					object[typeTextContent].className = "image-title";
					object[typeTextContent].innerHTML = content.innerHTML;
					break;
				case "image":
					object[typeTextContent] = content.querySelector("picture");
					break;
				default:
			}
		}
	});
	if (Object.keys(object).length) {
		block.innerHTML = "";
		block.appendChild(object.image);
		block.appendChild(object.title);
	}
}
