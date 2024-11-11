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

let currentSlide = 0;
let slideImages = [];

function openModal(images, title, description) {
    slideImages = images;
    currentSlide = 0;
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDescription").innerText = description;

    // Load the first image in the modal
    document.getElementById("modalImage").src = slideImages[currentSlide];
    document.getElementById("myModal").style.display = "flex";

    // Hide the footer when modal opens
    document.querySelector("footer").style.display = "none";

    // Update slide controls visibility and current image counter
    updateSlideControls();
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";

    // Show the footer again when modal closes
    document.querySelector("footer").style.display = "block";
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideImages.length;
    document.getElementById("modalImage").src = slideImages[currentSlide];
    updateSlideControls(); // Update image counter
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideImages.length) % slideImages.length;
    document.getElementById("modalImage").src = slideImages[currentSlide];
    updateSlideControls(); // Update image counter
}

function updateSlideControls() {
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const imageCounter = document.getElementById("imageCounter");

    // Show buttons if there are multiple images
    if (slideImages.length > 1) {
        nextButton.style.display = "block";
        prevButton.style.display = "block";
    } else {
        nextButton.style.display = "none"; // Hide if only one image
        prevButton.style.display = "none"; // Hide if only one image
    }

    // Update the image counter text
    imageCounter.innerText = `${currentSlide + 1} / ${slideImages.length}`; // Display current image number
}

// Close modal if clicking outside the modal content
const modal = document.getElementById("myModal");
const modalContentWrapper = document.querySelector(".modal-content-wrapper");
modal.addEventListener("click", (event) => {
    if (!modalContentWrapper.contains(event.target)) {
        closeModal();
    }
});
