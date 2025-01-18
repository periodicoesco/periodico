document.addEventListener('DOMContentLoaded', async () => {
    // Inicializa EmailJS
    emailjs.init("service_plom6lt");

    // Elementos DOM
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const newsGallery = document.getElementById('news-gallery');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');

    // Theme Toggle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon();
    }

    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.className);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Funcionalidad del menú
    const closeSidebarFunction = () => {
        sidebar?.classList.remove('active');
    };

    menuToggle?.addEventListener('click', (e) => {
        e.preventDefault(); // Previene comportamiento por defecto
        e.stopPropagation(); // Evita propagación del evento
        sidebar?.classList.add('active'); // Abre el menú lateral
    });

    closeSidebar?.addEventListener('click', (e) => {
        e.preventDefault();
        closeSidebarFunction(); // Cierra el menú lateral
    });

    document.addEventListener('click', (e) => {
        if (sidebar && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            closeSidebarFunction(); // Cierra el menú si haces clic fuera
        }
    });

    sidebar?.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita el cierre al hacer clic dentro del menú
    });

    // Cargar noticias
    try {
        const response = await fetch('noticias.json');
        const data = await response.json();
        const noticias = data.noticias;

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
            newsGallery?.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error loading news:', error);
    }
});

// Función para enviar correo
function sendEmail(event) {
    event.preventDefault(); // Evita recargar la página

    const form = document.getElementById("confession-form");

    emailjs.sendForm("service_plom6lt", "template_7i1wknu", form)
        .then(
            (response) => {
                alert("Confesión enviada con éxito!");
                form.reset(); // Limpia el formulario
            },
            (error) => {
                console.error("Error al enviar la confesión:", error);
                alert("Hubo un problema al enviar tu confesión.");
            }
        );
}
