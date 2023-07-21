// Get the toggle button and more link
const toggleButton = document.getElementById('toggleButton');
const moreLink = document.getElementById('moreLink');

// Add click event listener to the toggle button
toggleButton.addEventListener('click', (event) => {
    console.log("Clicked");
    // Prevent the event propagation to the parent element (more link)
    event.stopPropagation();

    // Toggle the class "active" on the dropdown menu
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('active');
});

// Add click event listener to the more link
moreLink.addEventListener('click', (event) => {
    // Prevent the default click behavior
    event.preventDefault();

    // You can add additional actions if needed
});

document.addEventListener('DOMContentLoaded', () => {
    // Get the toggle button and more link
    const toggleButton = document.getElementById('toggleButton');
    const moreLink = document.getElementById('moreLink');
    const sideNav = document.querySelector('.side-nav');

    // Add click event listener to the toggle button
    toggleButton.addEventListener('click', () => {
        // Toggle the active class on the side navigation menu
        sideNav.classList.toggle('active');
    });

    // Add click event listener to the more link
    moreLink.addEventListener('click', (event) => {
        // Prevent the default click behavior
        event.preventDefault();

        // You can add additional actions if needed
    });

    // Add click event listener to the document to close the side navigation on outside click
    document.addEventListener('click', (event) => {
        if (!sideNav.contains(event.target) && !toggleButton.contains(event.target)) {
            sideNav.classList.remove('active');
        }
    });
});





async function downloadVideo() {

    var videoUrl = document.querySelector("input");
    if (videoUrl.value) {
        document.querySelector(".error").innerHTML = "Downloading 😀..."
        document.querySelector(".error").style.color = "white"
        try {

            const response = await fetch("https://yt-download-rwph.onrender.com/download", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: videoUrl.value, quality: 'highestvideo' })
            });

            if (response.ok) {
                document.querySelector(".error").innerHTML = "Be Patient 😁 <br> <p style="font-size: 10px">Download time depends on length of video</p>"
                document.querySelector(".error").style.color = "white"
                videoUrl.value = ""
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = "yt-downloader.mp4";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Failed to generate the download file');
            }
        } catch (error) {
            console.error('Error occurred during the download request:', error);
        }
    }
    else {
        document.querySelector(".error").innerText = "Something went wrong"
    }
}


