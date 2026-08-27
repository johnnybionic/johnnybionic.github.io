// Load sidebar.html dynamically
fetch('/partials/sidebar.html')
	.then(response => response.text())
	.then(html => {
		document.getElementById('sidebar-content').innerHTML = html;
	})
	.catch(error => console.error('Error loading sidebar:', error));
