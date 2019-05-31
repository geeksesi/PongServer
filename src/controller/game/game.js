const Matter = require('matter-js');
const objects = require('./objects');
class Game {

    constructor() {
        this.matter = Matter;
        this.objects = objects;
        this.engine = this.matter.Engine.create();
        this.runner = this.matter.Runner.create({
            delta: 1000 / 60,
            isFixed: false,
            enabled: true
        });
        this.render = this.matter.Render.create({
            element: document.body,
            engine: engine
        });

        this.config = {
            // game
            game_width: 700,
            game_height: 450,
            border = 30,

            // default position

            ball: {
                x: this.config.game_width / 2 - this.config.ball_size,
                y: this.config.game_height / 2,
                settings: {
                    inertia: 0,
                    friction: 0,
                    frictionStatic: 0,
                    frictionAir: 0,
                    restitution: 1.05,
                    label: "ball"
                },
                size: 20
            },

            paddle_one: {
                x: this.config.border,
                y: this.config.game_height / 2,
                settings: {
                    isStatic: true,
                    label: "paddle_one"
                },
                width: 20,
                height: 100,
            },

            paddle_two: {
                x: this.config.game_width - this.config.border,
                y: this.config.game_height / 2,
                settings: {
                    isStatic: true,
                    label: "paddle_two"
                },
                width: 20,
                height: 100,
            },

            top_wall: {
                x: this.config.game_width / 2,
                x: this.config.border,
                settings: {
                    isStatic: true,
                    label: "top_wall"
                },
                width: this.config.game_width,
                height: this.config.border,
            },

            bottom_wall: {
                x: this.config.game_width / 2,
                x: this.config.game_height - this.config.border,
                settings: {
                    isStatic: true,
                    label: "bottom_wall"
                },
                width: this.config.game_width,
                height: this.config.border,
            },

        };

        this.ball = this.matter.Bodies.circle(
            this.config.ball.x,
            this.config.ball.y,
            this.config.ball.size,
            ...this.config.ball.settings,
        );

        this.paddle_one = this.matter.Bodies.rectangle(
            this.config.paddle_one.x,
            this.config.paddle_one.y,
            this.config.paddle_one.width,
            this.config.paddle_one.height,
            ...this.config.paddle_one.settings,
        );

        this.paddle_two = this.matter.Bodies.rectangle(
            this.config.paddle_two.x,
            this.config.paddle_two.y,
            this.config.paddle_two.width,
            this.config.paddle_two.height,
            ...this.config.paddle_two.settings,
        );

        this.top_wall = this.matter.Bodies.rectangle(
            this.config.top_wall.x,
            this.config.top_wall.y,
            this.config.top_wall.width,
            this.config.top_wall.height,
            ...this.config.top_wall.settings,
        );

        this.bottom_wall = this.matter.Bodies.rectangle(
            this.config.bottom_wall.x,
            this.config.bottom_wall.y,
            this.config.bottom_wall.width,
            this.config.bottom_wall.height,
            ...this.config.bottom_wall.settings,
        );

        this.matter.World.add(this.engine.world, [
            this.ball,
            this.paddle_one,
            this.paddle_two,
            this.top_wall,
            this.bottom_wall
        ]);

        this.engine.world.gravity.y = 0;

        this.score = {
            player_one: 0,
            player_two: 0,
        }
    }

    play_game(type) {
        setInterval(function() {
            this.matter.Engine.update(engine, 1000 / 60);
        }, 1000 / 60);
        this.ball_visible = false;
        this.update();
        if(type === "watch")
        {
            this.objects.watch_update(this.paddle_one ,this.paddle_two, this.ball, this.config, this.matter)
        }
    }

    update() {
        this.check_goal();

        // in higher ball speed matter can't process ball collid and ball will be fail.
        if((ball.position.y > GAME_HEIGHT + 200) || (ball.position.y < -200))
        {
            reset_ball(cb => {console.log("pooof matter.js" + ball.position.y + " WTF "+ GAME_HEIGHT + 200)});
        }
    }

    check_goal() {
        if (this.ball.position.x > this.config.game_width - this.config.border && !this.ball_visible) {
            reset_ball(() => {
                this.score.playerOne++;
                console.log(this.score);
            });
        } else if (this.ball.position.x < this.config.border && !this.ball_visible) {
            reset_ball(() => {
                this.score.playerTwo++;
                console.log(this.score);
            });
        }
    }

    reset_ball() {
        this.ball_visible = false;
        setTimeout(() => {
            this.matter.Body.setPosition(this.paddle_one, {
                x: this.config.paddle_one.x,
                y: this.config.paddle_one.y,
            });
            this.matter.Body.setPosition(this.paddle_two, {
                x: this.config.paddle_two.x,
                y: this.config.paddle_two.y,
            });

            this.matter.Body.setVelocity(this.ball, {
                x: 0,
                y: 0
            });
            this.ball_visible = true;
            this.matter.Body.setPosition(this.ball, {
                x: this.config.ball.x,
                y: this.config.ball.y,
            });
            setTimeout(() => {
                this.matter.Body.setVelocity(this.ball, {
                    x: ((Math.random() > 0.5) ? 1 : -1) * Math.floor((Math.random() * 7) + 6),
                    y: ((Math.random() > 0.5) ? 1 : -1) * Math.floor((Math.random() * 7) + 6)
                });
            }, 500);
        }, 500)
    }

}


module.exports = {
    Game
};