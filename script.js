// window.onload -> Indique que le script est exécuté au chargement de la page

// <canvas> en html permet de dessiner

window.onload = function()
{
    var canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "1px solid";

    // appendChild permet d'accrocher un tag au body
    // En ce qui nous concerne, il s'agit du tag <canvas>
    document.body.appendChild(canvas);

    // Pour dessiner dans le canvas, on va avoir besoin de ce que l'on appelle le contexte
    // On va dessiner en 2D
    var context = canvas.getContext('2d');

    // On choisit la couleur avec laquelle on va dessinner avec l'attribut de ce contexte: fillStyle
    context.fillStyle = "#ff0000";

    // Avec fillRect qui prend 4 arguments a, b, c, d
    // a et b représentent le nombre de pixels d'écart avec les limites du canvas
    // c la largeur du dessin et d la hauteur du dessin
    context.fillRect(30, 30, 100, 50);
}