document.addEventListener('DOMContentLoaded', async () => {
    // Initialize EmailJS
    emailjs.init("jhVpHTpB8n7q8kZd2");

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

    // Funcionalidad del menú
    const closeSidebarFunction = () => {
        sidebar.classList.remove('active');
    };

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', closeSidebarFunction);

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            closeSidebarFunction();
        }
    });

    // Prevenir que los clics dentro del sidebar cierren el menú
    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Manejar el envío del formulario de confesiones
    const confessionForm = document.getElementById('confession-form');
    const submitButton = confessionForm.querySelector('button[type="submit"]');

    confessionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        const confession = document.getElementById('confession').value;
        
        console.log('Iniciando envío de email...'); // Debug log
        console.log('Confesión:', confession); // Debug log
        
        try {
            const response = await emailjs.send(
                "service_z4gmzi8",
                "template_7i1wknu",
                {
                    message: confession,
                    to_email: "tu_correo@ejemplo.com", // Añade el correo destino si no está en la plantilla
                }
            );
            
            console.log('Email enviado exitosamente:', response); // Debug log
            alert('¡Confesión enviada exitosamente!');
            confessionForm.reset();
        } catch (error) {
            console.error('Error detallado:', error); // Debug log detallado
            alert('Hubo un error al enviar la confesión. Por favor, intenta nuevamente.');
        } finally {
            // Re-enable button and restore text
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        }
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
            newsGallery.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error loading news:', error);
    }
});
