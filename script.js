// window.onload -> Indique que le script est exécuté au chargement de la page

// <canvas> en html permet de dessiner

window.onload = function()
{
    //Pour que nos variables soient accessibles par les fonctions (portée des variables), on les déclare au pralable
    var context;

    // On déplace quelques variables pour modifier leur appel en paramètres
    //En px
    var canvasWidth = 900;
    var canvasHeight = 600;

    // Puis on définit la taille d'un bloc standard en px égalemment
    var blockSize = 30;

    // En augmentant le delay, le mouvement est saccadé, alors qu'en le diminuant, on gagne en fluidité
    var delay = 1000;

    // Pour créer notre serpent, on l'initialise dans une variable
    //var snake;
    var snake;

    // On a déclaré des fonctions, mais pour lancer le script, il faut bien faire appel à ces fonctions, d'où l'appel de init() suivant
    init();

    function init()
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
    
        // appendChild permet d'accrocher un tag au body
        // En ce qui nous concerne, il s'agit du tag <canvas>
        document.body.appendChild(canvas); 
        
        // Pour dessiner dans le canvas, on va avoir besoin de ce que l'on appelle le contexte
        // On va dessiner en 2D
        context = canvas.getContext('2d');

        // Ici, on va définir les blocs reliés sur la grille qui composent le corps du serpent [[x1, y1], [x2,y2], etc...]
        snake = new Snake( [[6,4], [5,4], [4,4]] );

        // Après l'initialisation, on fait appel à la méthode refreshCanvas
        refreshCanvas();
    }

    // Pour créer du mouvement, on va utiliser la fontion suivante
    function refreshCanvas()
    {
        console.log('Canvas refreshed');

        // Pour ne pas avoir de duplication du canvas, mais un déplacement de ce dernier, on va l'effacer pour qu'il réapparaisse plus loin
        context.clearRect(0, 0, canvasWidth, canvasHeight)

        // A chaque refresh, on veut redessiner notre serpent, on fait donc
        snake.draw();

        // Avec le refreshCanvas, on obtient bien un dessin de notre canvas, mais le rectangle reste immobile. On va donc utiliser la fonction setTimeout() qui permet d'exécuter une fonction à chaque fois qu'un certain délai est expiré
        setTimeout(refreshCanvas, delay);
    }

    // On crée ensuite l'équivalent d'une fonction construct qu'on appellera snake().
    // Cette fonction attend un paramètre qui représente le corps de notre serpent

    function drawBlock(context, position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        context.fillRect(x, y, blockSize, blockSize)

    }

    function Snake(body)
    {
        this.body = body;
        this.draw = function()
        {
            context.save();
            context.fillStyle = "#ff0000";

            // Pour dessiner le corps de notre serpent, on va utiliser une boucle
            for(var i = 0; i < this.body.length; i++) 
            {
                drawBlock(context, this.body[i]);
            }

            //Il est important pour le jeu de pouvoir relancer une partie, on va donc restaurer le contexte
            context.restore();
        }
        this.advance = function()
        {
            var nextPosition = this.body[o].slice();
            nextPosition[0] += 1;
            this.body.unshift(nextPosition);
            this.body.pop()
        }
    }


}