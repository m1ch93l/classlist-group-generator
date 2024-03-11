function generateGroups() {
	const namesInput = document.getElementById("namesInput").value;
	const groupCount = document.getElementById("groupCount").value;

	if (!namesInput.trim()) {
		alert("Please enter names.");
		return;
	}

	const names = namesInput
		.split("\n")
		.map((name) => name.trim())
		.filter(Boolean);

	if (names.length === 0) {
		alert("Please enter valid names.");
		return;
	}

	const shuffledNames = shuffleArray(names);
	const groups = distributeNames(shuffledNames, groupCount);

	displayGroups(groups);
}

function shuffleArray(array) {
	return array.sort(() => Math.random() - 0.5);
}

function distributeNames(names, groupCount) {
	const groups = Array.from({ length: groupCount }, () => []);

	for (let i = 0; i < names.length; i++) {
		groups[i % groupCount].push(names[i]);
	}

	return groups;
}

function displayGroups(groups) {
	const resultDiv = document.getElementById("result");
	resultDiv.innerHTML = "";

	groups.forEach((group, index) => {
		const groupCard = document.createElement("div");
		groupCard.classList.add("col-lg-4", "col-md-6", "mb-4");

		const cardBody = document.createElement("div");
		cardBody.classList.add("card", "h-100");

		const groupTitle = document.createElement("h5");
		groupTitle.classList.add("card-title");
		groupTitle.textContent = `Group ${index + 1}`;
		cardBody.appendChild(groupTitle);

		const cardList = document.createElement("ul");
		cardList.classList.add("list-group", "list-group-flush");

		group.forEach((member) => {
			const listItem = document.createElement("li");
			listItem.classList.add("list-group-item");
			listItem.textContent = member;
			cardList.appendChild(listItem);
		});

		cardBody.appendChild(cardList);
		groupCard.appendChild(cardBody);
		resultDiv.appendChild(groupCard);
	});
}
