let reviewCount = localStorage.getItem("reviewCount");

if (!reviewCount) {
  reviewCount = 0;
}

reviewCount++;

localStorage.setItem("reviewCount", reviewCount);

document.getElementById("counter").textContent =
  `Total Reviews Submitted: ${reviewCount}`;