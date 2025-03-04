// Link the button to the fitness page
document.getElementById('btn').addEventListener('click', function() {
    window.location.href = "fitness.html";
})

// Preloader
function Preloader() {
    document.getElementById("preloader").style.display = "none";
}

setTimeout(Preloader, 2000);