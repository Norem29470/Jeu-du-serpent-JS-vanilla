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
    var delay = 200;

    // Pour créer notre serpent, on l'initialise dans une variable
    //var snakee;
    var snakee;

    var canvas;

    //  Pour dessiner notre pomme, on l'initialise dans une variable
    var applee;

    //Le serpent ne doit pas entrer en contact avec lui même
    var widthInBlocks = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;

    var score;

    // On a déclaré des fonctions, mais pour lancer le script, il faut bien faire appel à ces fonctions, d'où l'appel de init() suivant
    init();

    function init()
    {
        canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd"
    
        // appendChild permet d'accrocher un tag au body
        // En ce qui nous concerne, il s'agit du tag <canvas>
        document.body.appendChild(canvas); 
        
        // Pour dessiner dans le canvas, on va avoir besoin de ce que l'on appelle le contexte
        // On va dessiner en 2D
        context = canvas.getContext('2d');

        // Ici, on va définir les blocs reliés sur la grille qui composent le corps du serpent [[x1, y1], [x2,y2], etc...]
        snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");

        // Définition de la position de la pomme
        applee = new Apple([10, 10]);

        score = 0;

        
        // Après l'initialisation, on fait appel à la méthode refreshCanvas
        refreshCanvas();
    }

    // Pour créer du mouvement, on va utiliser la fontion suivante
    function refreshCanvas()
    {
        console.log('Canvas refreshed');

        // On fait appel à la méthode move() pour donner du mouvement au serpent
        snakee.move();

        if(snakee.checkCollision())
        {
            gameOver();
        }
        else
        {
            if(snakee.eatApple(applee)) {

                score++;
                snakee.ateApple = true;

                do{
                    applee.setNewPosition()
                } while (applee.isOnSnake(snakee))
            }

            // Pour ne pas avoir de duplication du canvas, mais un déplacement de ce dernier, on va l'effacer pour qu'il réapparaisse plus loin
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            // On déplace la méthode pour modifier l'ordre d'affichage des éléments, afin que le score ne cache pas le serpent et la pomme
            drawScore();

            // A chaque refresh, on veut redessiner notre serpent, on fait donc
            snakee.draw();

            // A chaque refresh, on redessine notre pomme
            applee.draw();

            // Avec le refreshCanvas, on obtient bien un dessin de notre canvas, mais le rectangle reste immobile. On va donc utiliser la fonction setTimeout() qui permet d'exécuter une fonction à chaque fois qu'un certain délai est expiré
            setTimeout(refreshCanvas, delay);
        }

        
    }

    function gameOver()
    {
        context.save();

        context.font = "bold 70px sans-serif";
        context.fillStyle = "#000";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.strokeStyle = "white";
        context.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        context.strokeText("Game Over", centreX, centreY - 180)
        context.fillText("Game Over", centreX, centreY - 180);
        context.font = "bold 30px sans-serif";
        context.strokeText("Appuyez sur la barre Espace pour rejouer", centreX, centreY - 120);
        context.fillText("Appuyez sur la barre Espace pour rejouer", centreX, centreY - 120);

        context.restore();
    }

    function restart()
    {
        // Position et direction initiale du serpent
        snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");

        // Définition de la position de la pomme
        applee = new Apple([10, 10]);

        score = 0;

        // Après l'initialisation, on fait appel à la méthode refreshCanvas
        refreshCanvas();
    }

    function drawScore()
    {
        context.save();
        context.font = "bold 200px sans-serif";
        context.fillStyle = "gray";
        context.textAlign = "center";
        context.textBaseline = "middle";
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        context.fillText(score.toString(), centreX, centreY);
        context.restore();
    }

    // On crée ensuite l'équivalent d'une fonction construct qu'on appellera snake().
    // Cette fonction attend un paramètre qui représente le corps de notre serpent

    function drawBlock(context, position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        context.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
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

        this.move = function()
        {
            var nextPosition = this.body[0].slice();
            
            switch(this.direction) 
            {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                default:
                    throw("Invalid direction");
            }
            // next position = [x1+1,y1]
            this.body.unshift(nextPosition);

            if(!this.ateApple) {

            // pop() permet d'effacer le dernier élément d'un array
            this.body.pop();

            } else {
                this.ateApple = false;
            }

        }

        this.setDirection = function(newDirection)
        {
            var allowedDirections;
            switch (this.direction) {

                case "left":
                case "right":
                allowedDirections = ["up", "down"];
                    break;
                case "up":
                case "down":
                allowedDirections = ["left", "right"];
                    break;
                default:
                    throw("Invalid direction");

            }

            if(allowedDirections.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }
        };

        this.checkCollision = function()
        {
            var wallCollision = false;
            var snakeCollision = false;

            // Dans tous les cas, c'est la tête du serpent qui entrée en collision avec le bord du canvas ou son corps entraînera la fin de la partie, d'où:
            var head = this.body[0];
            var rest = this.body.slice(1);

            // On définit l'emplacement de la tête du serpent
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;

            // Pour définir si le serpent est sorti du canvas
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;

            //Pour vérifier les collisions en abscisses
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;

            //Idem pour les ordonnées
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            //Si je ne suis ni entre les murs verticaux et horizontaux
            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
            {
                wallCollision = true;
            }

            //Le serpent s'est-il mordu la queue ?
            for(var i = 0; i < rest.length; i++)
            {
                if(snakeX === rest[i][0] && snakeY === rest[i][1])
                {
                    snakeCollision = true;
                }
            }

            // Si il n'y a eu aucune collision, le return donnera false et false
            return wallCollision || snakeCollision;

        }

        this.eatApple  = function(appleToEat)
        {
            var head = this.body[0];
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
                return true;
            } else {
                return false;
            }
        }
    }

    function Apple(position)
    {
        this.position = position;

        // Méthode pour dessiner notre pomme
        this.draw = function()
        {

            // context.save() sauvegarde les anciennes informations du Canvas
            context.save();
            context.fillStyle = "green";

            // On va créer un rond, ce qui implique l'appel à une méthode différente du serpent avec beginPath()
            context.beginPath();
            var radius = blockSize/2;

            // On ne veut pas avoir les coordonnées d'un bloc, mais du centre de la pomme
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;

            // Context.arc() permet de donner une forme arrondie à la pomme
            context.arc(x, y, radius, 0, Math.PI*2, true);
            context.fill();

            // Context.restore() redéfinit la place de la pomme
            context.restore();
        };

        this.setNewPosition = function()
        {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        }

        this.isOnSnake = function(snakeToCheck)
        {
            var isOnSnake = false;

            for(var i = 0; i < snakeToCheck.body.lenght; i++) {
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }

            return isOnSnake;
        }
    }

    document.onkeydown = (event) =>
    {
        //event.preventDefault();

        var key = event.keyCode;
        var newDirection;

        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            case 32:
                restart();
                return;
            default:
                return;
        }

        snakee.setDirection(newDirection);
       
    }

}