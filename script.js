// window.onload -> Indique que le script est exécuté au chargement de la page

// <canvas> en html permet de dessiner

window.onload = function()
{
    //Pour que nos variables soient accessibles par les fonctions (portée des variables), on les déclare au pralable
    var canvas;
    var context;

    // En augmentant le delay, le mouvement est saccadé, alors qu'en le diminuant, on gagne en fluidité
    var delay = 100;
    var xCoord = 0;
    var yCoord = 0;

    // On a déclaré des fonctions, mais pour lancer le script, il faut bien faire appel à ces fonctions, d'où l'appel de init() suivant
    init();

    function init()
    {
        canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px solid";
    
        // appendChild permet d'accrocher un tag au body
        // En ce qui nous concerne, il s'agit du tag <canvas>
        document.body.appendChild(canvas); 
        
        // Pour dessiner dans le canvas, on va avoir besoin de ce que l'on appelle le contexte
        // On va dessiner en 2D
        context = canvas.getContext('2d');

        // Après l'initialisation, on fait appel à la méthode refreshCanvas
        refreshCanvas();
    }

    // Pour créer du mouvement, on va utiliser la fontion suivante
    function refreshCanvas()
    {
        // Pour ne pas que notre canvas réapparaisse au même endroit, on agit sur ses coordonnées
        xCoord += 2;
        yCoord += 2;

        // Pour ne pas avoir de duplication du canvas, mais un déplacement de ce dernier, on va l'effacer pour qu'il réapparaisse plus loin
        context.clearRect(0, 0, canvas.width, canvas.height)

        // On choisit la couleur avec laquelle on va dessinner avec l'attribut de ce contexte: fillStyle
        context.fillStyle = "#ff0000";
    
        // Avec fillRect qui prend 4 arguments a, b, c, d
        // a et b représentent le nombre de pixels d'écart avec les limites du canvas
        // c la largeur du dessin et d la hauteur du dessin
        // Toutefois, pour modifier les coordonnées x et y de notre rectangle qui seront variables, on redéfinit les 2 permiers arguments
        context.fillRect(xCoord, yCoord, 100, 50);

        // Avec le refreshCanvas, on obtient bien un dessin de notre canvas, mais le rectangle reste immobile. On va donc utiliser la fonction setTimeout() qui permet d'exécuter une fonction à chaque fois qu'un certain délai est expiré
        setTimeout(refreshCanvas, delay);
    }


}