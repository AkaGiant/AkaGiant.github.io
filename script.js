function filterTextures(tag) {
    const textures = document.querySelectorAll('.texture');
    const buttons = document.querySelectorAll('.filter-button');

    // If the "All" button is clicked
    if (tag === 'all') {
        buttons.forEach(button => {
            button.classList.remove('active'); // Remove active class from all buttons
        });
        textures.forEach(texture => texture.style.display = 'block'); // Show all textures
        buttons[0].classList.add('active'); // Highlight "All" button
        return; // Exit the function
    }

    // Toggle active state for the clicked button
    const clickedButton = [...buttons].find(button => button.textContent.toLowerCase() === tag.toLowerCase());
    if (clickedButton) {
        clickedButton.classList.toggle('active'); // Toggle active state

        // If the clicked button is active, remove "All" button highlight
        if (clickedButton.classList.contains('active')) {
            buttons[0].classList.remove('active'); // Remove highlight from "All" button
        } else {
            // If no other filters are active, re-highlight the "All" button
            const activeFilters = [...buttons].filter(button => button.classList.contains('active'));
            if (activeFilters.length === 0) {
                buttons[0].classList.add('active'); // Re-highlight "All" button if no filters are selected
            }
        }
    }

    // Get active filters
    const activeFilters = [...buttons]
        .filter(button => button.classList.contains('active'))
        .map(button => button.textContent.toLowerCase().trim()); // Trim spaces

    // Filter textures based on active filters
    textures.forEach(texture => {
        const tags = texture.getAttribute('data-tags').toLowerCase().split(',').map(t => t.trim()); // Trim spaces
        if (activeFilters.length === 0 || activeFilters.some(filter => tags.includes(filter))) {
            texture.style.display = 'block'; // Show texture if it matches any active filter
        } else {
            texture.style.display = 'none'; // Hide texture if it doesn't match
        }
    });
}

function openModal(imageSrc, title, description) {
    const modal = document.getElementById('myModal');
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden'); // Toggle the 'hidden' class
}
