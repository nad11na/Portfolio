//nav
document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector("nav");
    let pageTitle = document.querySelector(".nav-page-title");
    let underline = document.querySelector(".underline");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
            pageTitle.classList.add("hidden-title");
            underline.classList.add("hidden-underline");
        } else {
            navbar.classList.remove("shrink");
            pageTitle.classList.remove("hidden-title");
            underline.classList.remove("hidden-underline");
        }
    });
});



// animation left-right
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        threshold: 0.1,
    };

    function handleIntersection(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    document.querySelectorAll(".upper-text, .lower-text, .lower-text1").forEach((el) => {
        observer.observe(el);
    });
});


//slideshow about me
document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "/static/images/hobby1.jpg",
        "/static/images/hobby.jpg" 
    ];
    let currentIndex = 0;

    const slideshowImage = document.getElementById("slideshow");
    const nextArrow = document.getElementById("next-arrow");

    nextArrow.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % images.length;
        slideshowImage.src = images[currentIndex];
    });
});


//video
function togglePlayPause(videoId) {
    const video = document.getElementById(videoId);
    const playButton = video.parentElement.querySelector('.play-button');
    const playPauseBtn = video.parentElement.querySelector('.play-pause-btn');

    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
        playPauseBtn.textContent = '⏸';
    } else {
        video.pause();
        playButton.style.display = 'block';
        playPauseBtn.textContent = '⏯';
    }
}

function toggleMute(videoId) {
    const video = document.getElementById(videoId);
    const muteBtn = video.parentElement.querySelector('.mute-btn');
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔊' : '🔇';
}

function setVolume(videoId, volume) {
    const video = document.getElementById(videoId);
    video.volume = volume;
}

function seekVideo(videoId, value) {
    const video = document.getElementById(videoId);
    const time = (value / 100) * video.duration;
    video.currentTime = time;
}

function toggleFullscreen(videoId) {
    const video = document.getElementById(videoId);

    if (!document.fullscreenElement) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Apply styles when fullscreen mode is activated
document.addEventListener("fullscreenchange", applyFullscreenStyles);
document.addEventListener("webkitfullscreenchange", applyFullscreenStyles);
document.addEventListener("mozfullscreenchange", applyFullscreenStyles);
document.addEventListener("MSFullscreenChange", applyFullscreenStyles);

function applyFullscreenStyles() {
    console.log("Fullscreen change detected"); // Debugging line
    const video = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

    if (video) {
        console.log("Video is in fullscreen mode:", video); // Debugging line
        // Apply styles to video when in fullscreen
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "contain";

        // Show controls in fullscreen
        const videoBox = video.closest(".video-box");
        if (videoBox) {
            const videoControls = videoBox.querySelector(".video-controls");
            videoControls.style.opacity = "1";
            videoControls.style.position = "absolute";
            videoControls.style.bottom = "10px";
            videoControls.style.width = "95%";
            videoControls.style.left = "50%";
            videoControls.style.transform = "translateX(-50%)";
            videoControls.style.background = "rgba(0, 0, 0, 0.7)";
            videoControls.style.padding = "10px";
            videoControls.style.borderRadius = "10px";
        }
    } else {
        console.log("Exited fullscreen mode"); // Debugging line
        // Reset styles when exiting fullscreen
        document.querySelectorAll(".custom-video").forEach(video => {
            video.style.width = "";
            video.style.height = "";
            video.style.objectFit = "";
        });

        document.querySelectorAll(".video-controls").forEach(controls => {
            controls.style.opacity = "0"; // Hide controls when exiting fullscreen
        });
    }
}

document.querySelectorAll('.custom-video').forEach(video => {
    const progressBar = video.closest('.video-box').querySelector('.progress-bar');
    const videoControls = video.closest('.video-box').querySelector('.video-controls');

    // Click anywhere on video to toggle play/pause
    video.addEventListener('click', function () {
        console.log('Video clicked'); // Debugging line
        togglePlayPause(this.id);
    });

    // Stop event propagation for controls to prevent video click from triggering
    videoControls.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    video.addEventListener('loadedmetadata', () => {
        progressBar.value = 0; // Reset progress bar at start
    });

    video.addEventListener('timeupdate', () => {
        if (!isNaN(video.duration) && video.duration > 0) {
            const value = (video.currentTime / video.duration) * 100;
            progressBar.value = value;
        }
    });

    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * video.duration;
        video.currentTime = time;
    });
});

//certification
document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;

    function showSlides() {
        const slides = document.querySelectorAll(".slides img");
        const dots = document.querySelectorAll(".dot");

        // Hide all slides
        slides.forEach((slide) => {
            slide.style.display = "none";
        });

        // Remove active class from all dots
        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        // Ensure slideIndex is within bounds
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;

        // Show the current slide
        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add("active");
    }

    // Handle slide navigation
    function moveSlide(step) {
        slideIndex += step;
        showSlides();
    }

    function currentSlide(index) {
        slideIndex = index - 1;  // -1 because your dots are 1-based index
        showSlides();
    }

    // Call showSlides initially to display the first slide
    showSlides();

    // Bind the moveSlide function to the buttons
    document.querySelector(".prev").addEventListener("click", function() {
        moveSlide(-1);
    });

    document.querySelector(".next").addEventListener("click", function() {
        moveSlide(1);
    });

    // Bind the dots to navigate to specific slides
    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.addEventListener("click", function () {
            currentSlide(index + 1);  // +1 because dots are 1-based index
        });
    });
});



//animation work
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
    };

    function handleIntersection(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe each .experience-text element
    document.querySelectorAll(".experience-text").forEach((el) => {
        observer.observe(el);
    });
});


//project
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".project-description p, .text-block");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
});






//jorney
window.addEventListener("load", function() {
    // Create an intersection observer to detect when the section is in view
    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Check if the element is in view
            if (entry.isIntersecting) {
                var content = entry.target;
                content.style.opacity = 1; // Trigger the fade-in effect
                observer.unobserve(content); // Stop observing once it's in view
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is in view

    // Start observing the content
    var content = document.querySelector(".experience-summary-content");
    observer.observe(content);
});

//toggle mobile
function toggleMenu() {
    let navLinks = document.querySelector('.nav-links');
    let mainContent = document.querySelector('.main-content'); // Adjust based on your page structure

    navLinks.classList.toggle('active');

    // Push content down when menu is open
    if (navLinks.classList.contains('active')) {
        mainContent.classList.add('nav-expanded');
    } else {
        mainContent.classList.remove('nav-expanded');
    }
}


//tvii_sad
let slideIndex = 1;

document.addEventListener("DOMContentLoaded", function () {
    // Initialize slide index
    showSlides(slideIndex);

    // Function to change slides
    window.moveSlide = function(n) {
        showSlides(slideIndex += n);
    };

    // Function to show a specific slide
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };

    // Function to display the slide based on the current slide index
    function showSlides(n) {
        let slides = document.getElementsByClassName("slides1")[0]?.getElementsByTagName("img");
        let dots = document.getElementsByClassName("dot");

        if (!slides) {
            console.error('Slides container not found');
            return;
        }

        // Wrap around if the index is out of bounds
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Remove the active class from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Display the current slide and mark the active dot
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
});
