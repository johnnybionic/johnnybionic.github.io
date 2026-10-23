const latestCommitUrl = "https://api.github.com/repos/johnnybionic/johnnybionic.github.io/commits?per_page=1";
let latestCommitDate = null;

function renderLastUpdated() {
	const dateElement = document.getElementById("last-updated");
	if (!dateElement) return;

	if (!latestCommitDate) {
		dateElement.textContent = "Date unavailable";
		return;
	}

	const date = new Date(latestCommitDate);
	dateElement.dateTime = date.toISOString();
	dateElement.textContent = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(date);
}

window.updateLastUpdated = renderLastUpdated;

fetch(latestCommitUrl, {
	headers: { Accept: "application/vnd.github+json" }
})
	.then(response => {
		if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
		return response.json();
	})
	.then(commits => {
		latestCommitDate = commits[0]?.commit?.author?.date;
		renderLastUpdated();
	})
	.catch(error => {
		console.error("Unable to fetch the latest GitHub commit date:", error);
		renderLastUpdated();
	});
