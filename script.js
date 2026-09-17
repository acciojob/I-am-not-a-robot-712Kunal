//your code here
const container = document.getElementById("image-container");
const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
const para = document.getElementById("para");

// Five unique images
const images = ["img1", "img2", "img3", "img4", "img5"];

// Randomly choose one image to duplicate
const duplicateIndex = Math.floor(Math.random() * images.length);

// Create six images
const imageList = [...images, images[duplicateIndex]];

// Shuffle the six images
imageList.sort(() => Math.random() - 0.5);

// Display images
imageList.forEach((imageClass, index) => {
    const img = document.createElement("img");

    img.classList.add(imageClass);
    img.dataset.index = index;

    img.addEventListener("click", () => {
        handleImageClick(img);
    });

    container.appendChild(img);
});

let selectedImages = [];

// Image click logic
function handleImageClick(img) {

    // Don't allow the same tile to be selected twice
    if (selectedImages.includes(img)) {
        return;
    }

    // Don't allow more than two selections
    if (selectedImages.length >= 2) {
        return;
    }

    selectedImages.push(img);

    img.classList.add("selected");

    // At least one image selected
    reset.style.display = "inline-block";

    // Exactly two images selected
    if (selectedImages.length === 2) {
        verify.style.display = "inline-block";
    }
}

// Reset
reset.addEventListener("click", () => {

    selectedImages.forEach((img) => {
        img.classList.remove("selected");
    });

    selectedImages = [];

    reset.style.display = "none";
    verify.style.display = "none";

    para.innerText = "";
});

// Verify
verify.addEventListener("click", () => {

    const firstImage = selectedImages[0];
    const secondImage = selectedImages[1];

    if (
        firstImage.classList.contains(
            secondImage.classList[0]
        )
    ) {
        para.innerText = "You are a human. Congratulations!";
    } else {
        para.innerText =
            "We can't verify you as a human. You selected the non-identical tiles.";
    }

    // Hide verify after clicking
    verify.style.display = "none";
});