function paddle_ai(paddle, ball, config, matter, dis) {
    if (ball.velocity.x > dis * ball.velocity.x) {
        return true;
    }
    let x_dist = Math.abs(paddle.position.x - ball.position.x);
    let time_dist = x_dist / ball.velocity.x;
    let ball_finial_pos_y = (ball.position.y + (ball.velocity.y * time_dist));
    if (Math.abs((ball_finial_pos_y - (paddle.position.y + paddle.height / 2)))) {
        // do nothing
    } else if (ball_finial_pos_y > paddle.position.y + 50) {
        if (paddle.position.y < config.game_height - 100) {
            matter.Body.setPosition(paddle, { x: paddle.position.x, y: paddle.position.y + 7 });
        }
    } else if (ball_finial_pos_y < paddle.position.y - 50) {
        if (paddle.position.y > 100) {
            matter.Body.setPosition(paddle, { x: paddle.position.x, y: paddle.position.y - 7 });
        }
    } else {
        // do nothing
    }
}

exports.watch_update = function(paddle_one, paddle_two, ball, config, matter)
{
    paddle_ai(paddle_one, ball, config, matter, -1);
    paddle_ai(paddle_two, ball, config, matter, 1);
}