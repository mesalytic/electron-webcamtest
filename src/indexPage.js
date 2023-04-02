document.addEventListener('DOMContentLoaded', () => {
    var button = document.getElementById("test");
    
    button.addEventListener("click", () => {
        document.location.href = "./webcam.html"
    })
})