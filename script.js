document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll(".nav-menu a");

    links.forEach(link => {
        link.addEventListener("click", function() {
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });
});