// Template include system
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('[data-include]');
  
  elements.forEach(element => {
    const file = element.getAttribute('data-include');
    
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return response.text();
      })
      .then(data => {
        element.innerHTML = data;
      })
      .catch(error => {
        console.error('Include error:', error);
        element.innerHTML = `<p>Error loading ${file}</p>`;
      });
  });
});
