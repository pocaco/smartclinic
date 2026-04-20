const exploreServices = document.getElementById("exploreServices");


exploreServices.addEventListener("click", () => {
    console.log("E");
    window.location.replace("services.html")
})


// FeedBack Section ---------------------------------------
let selectedRating = 0;

// ⭐ STAR CLICK
const stars = document.querySelectorAll("#ratingStars i");
const ratingInput = document.getElementById("feedRating");
const ratingText = document.getElementById("ratingText");

stars.forEach(star => {
    star.addEventListener("click", function () {
        selectedRating = this.getAttribute("data-value");
        ratingInput.value = selectedRating;

        // Reset semua star
        stars.forEach(s => {
            s.classList.remove("fa-solid");
            s.classList.add("fa-regular");
        });

        // Highlight star ikut rating
        for (let i = 0; i < selectedRating; i++) {
            stars[i].classList.remove("fa-regular");
            stars[i].classList.add("fa-solid");
        }

        ratingText.textContent = "Rating: " + selectedRating + " ⭐";
        document.getElementById("ratingError").textContent = "";
    });
});

// 📝 FORM SUBMIT
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("feedName").value;
    const message = document.getElementById("feedMessage").value;
    const rating = document.getElementById("feedRating").value;
    const error = document.getElementById("ratingError");

    // Validate rating
    if (rating == 0) {
        error.textContent = "Please select a rating!";
        return;
    }

    // Create stars HTML
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        } else {
            starsHTML += '<i class="fa-regular fa-star"></i>';
        }
    }

    // Current time
    const now = "Just now";

    // Create review card
    const reviewHTML = `
        <div class="review-card mb-3 p-3">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <strong>${name}</strong>
                    <div class="text-warning small">
                        ${starsHTML}
                    </div>
                </div>
                <small class="text-muted">${now}</small>
            </div>
            <p class="mb-0 mt-2 small text-muted">"${message}"</p>
        </div>
    `;

    // Append to top
    const container = document.getElementById("reviewsContainer");
    container.insertAdjacentHTML("afterbegin", reviewHTML);

    // Reset form
    this.reset();
    ratingInput.value = 0;
    selectedRating = 0;

    stars.forEach(s => {
        s.classList.remove("fa-solid");
        s.classList.add("fa-regular");
    });

    ratingText.textContent = "Click a star to rate";
});