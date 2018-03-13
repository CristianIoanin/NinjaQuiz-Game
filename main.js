const quiz = [
    { name: "Superman", realName: "Clark Kent"},
    { name: "Batman", realName: "Bruce Wayne" },
    { name: "Wonder Woman", realName: "Dianna Prince" },
    { name: "Spider-Man", realName: "Peter Parker" },
    { name: "Green Lantern", realName: "Hal Jordan" },
    { name: "Green Arrow", realName: "Oliver Queen" },
    { name: "The Flash", realName: "Barry Allen" },
    { name: "The Hulk", realName: "Bruce Banner" },
    { name: "Iron Man", realName: "Tony Stark" },
    { name: "The Punisher", realName: "Frank Castle" },
    { name: "Daredevil", realName: "Matt Murdoch" },
    { name: "Cyclops", realName: "Scott Summers" },
    { name: "Ghost Rider", realName: "Johnny Blaze" },
    { name: "Hawkeye", realName: "Clint Barton" },
    { name: "Aquaman", realName: "Arthur Curry" },
    { name: "Catwoman", realName: "Selina Kyle" },
    { name: "Beast", realName: "Hank McCoy" },
    { name: "Professor X", realName: "Charles Xavier" },
    { name: "Captain America", realName: "Steve Rogers" },
    { name: "Collossus", realName: "Piotr Rasputin" },
    { name: "Mr Fantastic", realName: "Reed Richards" },
    { name: "Invisible Girl", realName: "Sue Storm" },
    { name: "Iceman", realName: "Bobby Drake" },
    { name: "Martian Manhunter", realName: "J'onn J'onzz " },
    { name: "Two Face", realName: "Harvey Dent" },
    { name: "The Riddler", realName: "Edward Nigma" },
    { name: "Black Canary", realName: "Dinah Lance" },
    { name: "Killer Croc", realName: "Waylon Jones" },
    { name: "The Atom", realName: "Ray Palmer" },
    { name: "Animal Man", realName: "Buddy Baker" },
    { name: "Blue Beetle", realName: "Jaime Reyes" },
    { name: "Booster Gold", realName: "Michael Carter" },
    { name: "Captain Atom", realName: "Nate Adam" },
    { name: "Captain Marvel", realName: "Billy Batson" },
    { name: "The Creeper", realName: "Jack Ryder" },
    { name: "Deathstroke", realName: "Slade Wilson" },
    { name: "Storm", realName: "Ororo Munroe" },
    { name: "Magneto", realName: "Max Eisenhardt" },
    { name: "The Human Torch", realName: "Johnny Storm" },
    { name: "Deadpool", realName: "Wade Wilson" },
    { name: "Black Panther", realName: "T'Challa" },
    { name: "The Thing", realName: "Ben Grimm" },
    { name: "Wolverine", realName: "James Howlett" },
    { name: "Nightcrawler", realName: "Kurt Wagner" },
    { name: "Gambit", realName: "Remy Etienne LeBeau" },
    { name: "Spider-Woman", realName: "Jessica Drew" },
    { name: "Doctor Doom", realName: "Victor Von Doom" },
    { name: "Nightwing", realName: "Dick Grayson" },
    { name: "Supergirl", realName: "Lana Lang" },
    { name: "Scarecrow", realName: "Jonathan Crane" },
    { name: "The Penguin", realName: "Oswald Cobblepot" },
    { name: "Mister Miracle", realName: "Scott Free" },
    { name: "Hush", realName: "Tommy Elliot" },
    { name: "Huntress", realName: "Helena Bertinelli" },
    { name: "Hawkman", realName: "Carter Hall" },
    { name: "Hawkgirl", realName: "Shiera Hall" },
    { name: "Venom", realName: "Eddi Brock" },
    { name: "Rogue", realName: "Anna Marie" },
    { name: "Black Cat", realName: "Felicia Hardy" },
    { name: "White Queen", realName: "Emma Frost" }    
];

// const url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/questions.json';

// fetch(url)
//   .then(res => res.json())
//   .then(quiz => {
//     view.start.addEventListener('click', () => game.start(quiz.questions), false);
//     view.response.addEventListener('click', (event) => game.check(event), false);
// });

function random(a, b = 1) {
    //if only one argument is provided, we need to swap values of a and b
    if (b === 1) {
        [a, b] = [b, a];
    }
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = random(i) - 1;
        [array[i-1], array[j]] = [array[j], array[i-1]];
    }
}

//View Object
const view = {
    start: document.getElementById('start'),
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    response: document.querySelector('#response'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    timer: document.querySelector('#timer strong'),
    highScore: document.querySelector('#hiScore strong'),
    render(target, content, attributes) {
        for (const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    show(element) {
        element.style.display = 'block';
    },
    hide(element) {
        element.style.display = 'none';
    },
    setup() {
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score, game.score);
        this.render(this.result, '');
        this.render(this.info, '');
        this.render(this.highScore, game.hiScore());
    },
    teardown() {
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
        this.render(this.highScore, game.hiScore());
    },
    buttons(array) {
        return array.map( value => `<button>${value}</button>`).join('');
    }
};

const game = {
    start(quiz) {
        console.log('start() invoked');

        view.hide(view.start);
        this.secondsRemaining = 60;
        this.timer = setInterval(this.countdown, 1000);
        this.score = 0;
        this.questions = [...quiz];
        view.setup();
        this.ask();
    },
    countdown() {
        game.secondsRemaining--;
        view.render(view.timer, game.secondsRemaining);
        if(game.secondsRemaining <= 0) {
            game.gameOver();
        }
    },
    ask(name) {
        console.log('ask(name) invoked');

        if (this.questions.length > 2) {
            shuffle(this.questions);
            this.question = this.questions.pop();
            const options = [this.questions[0].realName, this.questions[1].realName, this.question.realName];
            shuffle(options);
            const question = `What is <strong>${this.question.name}</strong>'s real name?`;
            view.render(view.question, question);
            view.render(view.response, view.buttons(options));
        } else {
        this.gameOver();
        }
    },
    check(event) {
        console.log('check(event) invoked');

        const response = event.target.textContent;
        const answer = this.question.realName;

        if (response === answer) {
            view.render(view.result, 'Correct!', {'class': 'correct'});
            this.score++;
            view.render(view.score, this.score);
        } else {
            view.render(view.result, `Wrong! The correct answer was ${answer}.`, {'class': 'wrong'});
        }
        this.ask();
    },
    gameOver() {
        console.log('gameOver() invoked');
        
        view.render(view.info, `Game Over! You scored ${this.score} point${this.score !== 1 ? 's' : ''}.`);
        view.teardown();
        clearInterval(this.timer);
        view.show(view.start);
    },
    hiScore() {
        const hi = localStorage.getItem('highScore') || 0;
        if(this.score > hi || hi === 0) {
            localStorage.setItem('highScore', this.score);
            view.render(view.info, '** NEW HIGH SCORE! **');
        }
        return localStorage.getItem('highScore');
    }
};

// game.start(quiz);

view.start.addEventListener('click', () => game.start(quiz), false);

view.response.addEventListener('click', (event) => game.check(event), false);