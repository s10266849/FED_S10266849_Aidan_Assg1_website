// For homepage 
// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle "Read More" content in the About Us section
document.getElementById('read-more-btn').addEventListener('click', function () {
    const shortAbout = document.getElementById('short-about');
    const fullAbout = document.getElementById('full-about');
    if (fullAbout.style.display === 'none') {
        fullAbout.style.display = 'block';
        shortAbout.style.display = 'none';
        this.textContent = 'Read Less';
    } else {
        fullAbout.style.display = 'none';
        shortAbout.style.display = 'block';
        this.textContent = 'Read More';
    }
});

// Shrink navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }
});

// Add hover effect to cards
document.querySelectorAll('.card, .new-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
});
// Smooth scrolling for navigation links
document.querySelectorAll('.navbar nav ul li a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// For Pre-Loved page
// Filter functionality for cars
const filterBtn = document.querySelector('.search-btn');
const brandFilter = document.getElementById('brand');
const priceFilter = document.getElementById('price');
const yearFilter = document.getElementById('year');
const searchInput = document.querySelector('.search-input');
const carCards = document.querySelectorAll('.pl-card');

filterBtn.addEventListener('click', () => {
    const selectedBrand = brandFilter.value.toLowerCase();
    const maxPrice = parseInt(priceFilter.value, 10);
    const selectedYear = yearFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    carCards.forEach(card => {
        const carBrand = card.querySelector('.car-name').textContent.toLowerCase();
        const carPrice = parseInt(card.querySelector('.price').textContent.replace(/[$,]/g, ''), 10);
        const carYear = card.querySelector('.pl-car-miles').textContent.split('Reg.')[1].trim();
        const cardDetails = card.querySelector('.pl-car-details').textContent.toLowerCase();

        const matchesBrand = selectedBrand === 'all' || carBrand.includes(selectedBrand);
        const matchesPrice = carPrice <= maxPrice;
        const matchesYear = selectedYear === 'all' || carYear === selectedYear;
        const matchesSearch = cardDetails.includes(searchTerm);

        if (matchesBrand && matchesPrice && matchesYear && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Dynamic "Load More" button
const loadMoreBtn = document.querySelector('.pl-load-more-btn');
let displayedCards = 4;

loadMoreBtn.addEventListener('click', () => {
    const hiddenCards = Array.from(carCards).slice(displayedCards, displayedCards + 4);
    hiddenCards.forEach(card => card.style.display = 'block');
    displayedCards += 4;

    if (displayedCards >= carCards.length) {
        loadMoreBtn.style.display = 'none';
    }
});

// Display selected price range
const priceRangeLabel = document.querySelector('.slider-container span:nth-child(2)');
priceFilter.addEventListener('input', () => {
    priceRangeLabel.textContent = `$${parseInt(priceFilter.value, 10).toLocaleString()}`;
});

// For Pre-Loved individual page
// Dynamic Navbar Highlight
document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                document
                    .querySelector(`.navbar ul li a[href*=${id}]`)
                    ?.classList.add("active");
            });
        }
    });
});

// Test Drive Form Validation
document.querySelector(".td-form-button").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.querySelector('input[placeholder="Name"]');
    const email = document.querySelector('input[placeholder="Email"]');
    const mobile = document.querySelector('input[placeholder="Mobile Number"]');
    const model = document.querySelector("#model\\ interest");

    let isValid = true;

    if (!name.value.trim()) {
        alert("Please enter your name.");
        isValid = false;
    }
    if (!email.value.includes("@")) {
        alert("Please enter a valid email address.");
        isValid = false;
    }
    if (!/^\d{8,10}$/.test(mobile.value.trim())) {
        alert("Please enter a valid mobile number.");
        isValid = false;
    }
    if (model.value === "") {
        alert("Please select a model.");
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        // Reset form after successful submission
        document.querySelectorAll(".td-form-input").forEach((input) => (input.value = ""));
        model.value = "";
    }
});

// Live Price Slider Display
const priceSlider = document.querySelector("#price");
const priceLabel = document.createElement("div");
priceLabel.style.position = "absolute";
priceLabel.style.top = "-30px";
priceSlider.parentElement.style.position = "relative";
priceSlider.parentElement.appendChild(priceLabel);

priceSlider.addEventListener("input", () => {
    priceLabel.textContent = `$${parseInt(priceSlider.value).toLocaleString()}`;
    priceLabel.style.left = `${((priceSlider.value - priceSlider.min) /
        (priceSlider.max - priceSlider.min)) *
        100}%`;
});

// Image Carousel
const pliCards = document.querySelector(".pli-card-container");
const cards = document.querySelectorAll(".pli-display-card");
let index = 0;

setInterval(() => {
    cards[index].classList.remove("active");
    index = (index + 1) % cards.length;
    cards[index].classList.add("active");
}, 3000);

// Load Similar Cars Dynamically
const cardContainer = document.querySelector(".card-container");
let loadMoreCount = 0;

window.addEventListener("scroll", () => {
    const bottomOfPage =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

    if (bottomOfPage && loadMoreCount < 3) {
        for (let i = 0; i < 3; i++) {
            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.innerHTML = `
                <img src="images/hpcaro.jpg" alt="Car Image">
                <h3 class="car-name">New Car Model ${Math.floor(
                    Math.random() * 100
                )}</h3>
                <p class="price">$${(Math.random() * 100000).toFixed(2)}</p>
                <p class="car-miles">${Math.floor(
                    Math.random() * 100000
                )}KM Reg.${2020 + Math.floor(Math.random() * 4)}</p>
                <p class="car-details">Automatic • Red • Petrol</p>`;
            cardContainer.appendChild(newCard);
        }
        loadMoreCount++;
    }
});
