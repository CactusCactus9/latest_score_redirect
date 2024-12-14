import React, { useEffect, useRef } from 'react';
import "./Tournament.css"
import AdversariesBar from './AdversariesBar';
import { useNavigate } from 'react-router-dom';

const Adversaries = () => {
    const canvasRef = useRef(null);
    
    const ballRef = useRef({x: 0, y: 0, radius: 15, color: "white", speed: 9, velocityX: 9, velocityY: 9});
    const netRef = useRef({x: 0, y: 0, w: 6, h: 12});
    const rightPlayerRef = useRef({x: 0, y: 0, w: 20, h: 120, color: "#E84172", score: 0});
    const leftPlayerRef = useRef({x: 0, y: 0, w: 20, h: 120, color: "#D8FD62", score: 0});
    const lPaddleMoveRef = useRef({up: false, down: false});
    const rPaddleMoveRef = useRef({up: false, down: false});
    const isGameRunning = useRef(true);

    const navigate = useNavigate();

        useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 1000;
        canvas.height = 700;

        const lPaddleMove = lPaddleMoveRef.current;
        const rPaddleMove = rPaddleMoveRef.current;
    
        const ball = ballRef.current;
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        
        const bot = rightPlayerRef.current;
        bot.x = canvas.width - bot.w;
        bot.y = canvas.height - bot.h;

        const playerL = leftPlayerRef.current;
        const playerR = rightPlayerRef.current;

        const net = netRef.current;
        net.x = canvas.width/2 - net.w/2;
        
        const renderGame = () => {
            const ctx = canvas.getContext("2d");
            //clear the canvas area before rendering
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // draw table
            ctx.fillStyle = "#636987";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //draw the net
            ctx.fillStyle = "#D9D9D9";
            for (let i = 0; i < canvas.height; i += 20){
                ctx.fillRect(net.x, net.y + i, net.w, net.h);
            }

            //draw ball
            ctx.beginPath();
            ctx.fillStyle = ball.color;
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();

            //draw player's paddle
            ctx.fillStyle = playerL.color;
            ctx.fillRect(playerL.x, playerL.y, playerL.w, playerL.h);
            
            //draw bot's paddle
            ctx.fillStyle = playerR.color;
            ctx.fillRect(playerR.x, playerR.y, playerR.w, playerR.h);

            //the score
            ctx.fillStyle = "white";
            ctx.font = "60px rationale";
            ctx.fillText(playerL.score, canvas.width/4, canvas.height/5);
            ctx.fillText(playerR.score, canvas.width/4 * 3, canvas.height/5);
        }
        const checkCollision = (paddle, ball) => {
            paddle.top = paddle.y;
            paddle.bottom = paddle.y + paddle.h;
            paddle.right = paddle.x + paddle.w;
            paddle.left = paddle.x;

            ball.top = ball.y - ball.radius;
            ball.bottom = ball.y + ball.radius;
            ball.right = ball.x + ball.radius;
            ball.left = ball.x - ball.radius;
  
            return (ball.left <= paddle.right && ball.top <= paddle.bottom && ball.bottom >= paddle.top && ball.right >= paddle.left)
        }
        const setBall = () => {
            ball.x = canvas.width/2;
            ball.y = canvas.height/2;
            ball.velocityX = -ball.velocityX;
            ball.speed = 9;
        }
        const updateGame = () => {
            ball.x += ball.velocityX;
            ball.y += ball.velocityY;
            
            //check collision with top and bottom walls
            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
                ball.velocityY *= -1;
            
            const paddle = ((ball.x > canvas.width/2) ? playerR : playerL);//know if the ball hit r or l to check for collision after
            if (checkCollision(paddle, ball)){
                let angleRad = (ball.y - paddle.y === 0) ? 0 : ( ball.velocityY > 0) ? Math.PI/4 : -Math.PI/4;//move the ball to the opposite direction from which it come

                const direction = (ball.x < canvas.width/2) ? 1 : -1;

                ball.velocityX = (Math.cos(angleRad) * ball.speed) * direction;
                ball.velocityY = Math.sin(angleRad) * ball.speed;
                ball.speed += 0.1;
            }
            if (ball.x - ball.radius <= 0){
                playerR.score++;
                setBall();
            }
            else if (ball.x + ball.radius >= canvas.width){
                playerL.score++;
                setBall();
            }
            if (playerL.score === 3 || playerR.score === 3)
                isGameRunning.current = false;
        }
        
        const game = () => {
            renderGame();
            updateGame();
            if (isGameRunning.current === false){
                setTimeout(() => {
                    setBall();
                }, 2000);
                navigate(`/game/Local/SingleGame/SoloPractice/Score`);}
        }
            const handleKeyDown = (event) => {
                if (event.key === 'ArrowDown')
                    rPaddleMove.down = true;
                if (event.key === 'ArrowUp')
                    rPaddleMove.up = true;
                if (event.key === 's' || event.key === 'S')
                    lPaddleMove.down = true;
                if (event.key === 'w' || event.key === 'W')
                    lPaddleMove.up = true;

            };
            const handleKeyUp = (event) => {
                if (event.key === 'ArrowDown')
                    rPaddleMove.down = false;
                if (event.key === 'ArrowUp')
                    rPaddleMove.up = false;
                if (event.key === 's' || event.key === 'S')
                    lPaddleMove.down = false;
                if (event.key === 'w' || event.key === 'W')
                    lPaddleMove.up = false;
            };
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);

            const movePaddle = (event) => {
                if (rPaddleMove.up){
                    playerR.y = Math.max(0, playerR.y - 10);
                }
                if (rPaddleMove.down){
                    playerR.y = Math.min(canvasRef.current.height - playerR.h, playerR.y + 10);
                }
                if (lPaddleMove.up){
                    playerL.y = Math.max(0, playerL.y - 10);
                }
                if (lPaddleMove.down){
                    playerL.y = Math.min(canvasRef.current.height - playerL.h, leftPlayerRef.current.y + 10);
                }
            }
            const gameInterval = setInterval(game, 1000 / 60);
            const keyPressInterval = setInterval(movePaddle, 1000 / 60);
            return () => {
                clearInterval(gameInterval);
                clearInterval(keyPressInterval);
            };
        });
    return (
      <div className='game_container'>
          <AdversariesBar className="adversariesBar"></AdversariesBar>
          <canvas ref={canvasRef}></canvas>
      </div>
    )
}

export default Adversaries