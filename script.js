const exploreServices = document.getElementById("exploreServices");


if (exploreServices) {
    exploreServices.addEventListener("click", () => {
        window.location.replace("services.html")
    })
}



// FeedBack Section ---------------------------------------
$(document).ready(function () {
    let selectedRating = 0;
    const $stars = $("#ratingStars i");
    const $ratingInput = $("#feedRating");
    const $ratingText = $("#ratingText");
    const $ratingStarText = $("#ratingStarText");

    // ⭐ STAR CLICK
    $stars.on("click", function () {
        selectedRating = $(this).data("value"); // Using data-value attribute
        $ratingInput.val(selectedRating);

        // Reset all stars and highlight up to selection
        $stars.each(function (index) {
            if (index < selectedRating) {
                $(this).removeClass("fa-regular").addClass("fa-solid");
            } else {
                $(this).removeClass("fa-solid").addClass("fa-regular");
            }
        });

        $ratingStarText.text("Rating: " + selectedRating + " ⭐");
    });

    // 📝 FORM SUBMIT
    $("#feedbackForm").on("submit", function (e) {
        e.preventDefault();

        const name = $("#feedName").val();
        const message = $("#feedMessage").val();
        const rating = $ratingInput.val();
        const $error = $("#ratingError");

        // Validate rating
        if (rating == 0) {
            $error.text("Please select a rating!");
            return;
        } else {
            $error.text(""); // Clear error if valid
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

        // Create review card
        const reviewHTML = `
            <div class="review-card mb-3 p-3 border rounded shadow-sm bg-white">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <strong>${name}</strong>
                        <div class="text-warning small">
                            ${starsHTML}
                        </div>
                    </div>
                    <small class="text-muted">Just now</small>
                </div>
                <p class="mb-0 mt-2 small text-muted">"${message}"</p>
            </div>
        `;

        // Append to top
        $("#reviewsContainer").prepend(reviewHTML);

        // Reset form
        this.reset();
        $ratingInput.val(0);
        selectedRating = 0;

        $stars.removeClass("fa-solid").addClass("fa-regular");
        $ratingStarText.text("");
        $ratingText.text("Click a star to rate");
    });
});