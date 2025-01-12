document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const noticiaId = parseInt(urlParams.get('id'));
    const noticiaContenido = document.getElementById('noticia-contenido');

    // Cargar noticias desde JSON
    const response = await fetch('noticias.json');
    const data = await response.json();
    const noticias = data.noticias;

    // Obtener la noticia del array
    const noticia = noticias.find(n => n.id === noticiaId);

    if (noticia) {
        noticiaContenido.innerHTML = `
            <h1>${noticia.titulo}</h1>
            <p class="fecha">${noticia.fecha}</p>
            <img src="${noticia.imagen}" alt="${noticia.titulo}" class="noticia-imagen">
            <div class="noticia-texto">
                ${noticia.descripcion}
            </div>
        `;
    } else {
        noticiaContenido.innerHTML = '<h1>Noticia no encontrada</h1>';
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

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
});