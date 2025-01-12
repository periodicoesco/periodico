document.addEventListener('DOMContentLoaded', async () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const newsGallery = document.getElementById('news-gallery');

    // Cargar noticias desde JSON
    const response = await fetch('noticias.json');
    const data = await response.json();
    const noticias = data.noticias;

    // Theme Toggle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon();
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.className);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        icon.className = body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Cargar noticias
    noticias.forEach(noticia => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        galleryItem.innerHTML = `
            <a href="noticia.html?id=${noticia.id}">
                <img src="${noticia.imagen}" alt="${noticia.titulo}">
                <div class="caption">
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.fecha}</p>
                </div>
            </a>
        `;

        newsGallery.appendChild(galleryItem);
    });
});