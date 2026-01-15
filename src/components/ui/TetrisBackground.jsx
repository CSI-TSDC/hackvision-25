'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const tetrominos = [
    {
        // box
        colors: ['rgb(59,84,165)', 'rgb(118,137,196)', 'rgb(79,111,182)'],
        data: [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
    },
    {
        // stick
        colors: ['rgb(214,30,60)', 'rgb(241,108,107)', 'rgb(236,42,75)'],
        data: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
        ],
    },
    {
        // z
        colors: ['rgb(88,178,71)', 'rgb(150,204,110)', 'rgb(115,191,68)'],
        data: [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0],
        ],
    },
    {
        // T
        colors: ['rgb(62,170,212)', 'rgb(120,205,244)', 'rgb(54,192,240)'],
        data: [
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
        ],
    },
    {
        // s
        colors: ['rgb(236,94,36)', 'rgb(234,154,84)', 'rgb(228,126,37)'],
        data: [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
        ],
    },
    {
        // backwards L
        colors: ['rgb(220,159,39)', 'rgb(246,197,100)', 'rgb(242,181,42)'],
        data: [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
    },
    {
        // L
        colors: ['rgb(158,35,126)', 'rgb(193,111,173)', 'rgb(179,63,151)'],
        data: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
    },
];

/**
 * TetrisBackground - A React component that renders falling Tetris pieces
 * 
 * @param {number} speed - Base speed of falling pieces (ms between moves, lower = faster). Default: 80
 * @param {number} maxPieces - Maximum number of pieces that can fall at once. Default: 3
 * @param {number} unitSize - Size of each tetris block in pixels (desktop). Default: 35
 * @param {number} mobileUnitSize - Size of each tetris block in pixels (mobile). Default: 25
 * @param {string} className - Additional CSS classes for the container
 */
export default function TetrisBackground({
    speed = 80,
    maxPieces = 3,
    unitSize = 35,
    mobileUnitSize = 25,
    className = ''
}) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const gameStateRef = useRef(null);
    const [currentUnitSize, setCurrentUnitSize] = useState(unitSize);

    const initGame = useCallback((canvas, blockSize) => {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const boardWidth = Math.floor(width / blockSize);
        const boardHeight = Math.floor(height / blockSize);

        // Initialize empty board
        const board = [];
        for (let x = 0; x <= boardWidth; x++) {
            board[x] = [];
            for (let y = 0; y <= boardHeight; y++) {
                board[x][y] = {
                    data: 0,
                    colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
                };
            }
        }

        // Active falling pieces
        const pieces = [];

        // Create a new tetromino
        const createPiece = () => {
            const pieceNum = Math.floor(Math.random() * tetrominos.length);
            return {
                data: tetrominos[pieceNum].data,
                colors: tetrominos[pieceNum].colors,
                x: Math.floor(Math.random() * (boardWidth - 4)),
                y: -4,
                lastMove: Date.now(),
                speed: speed + Math.random() * 50,
            };
        };

        // Check if piece can move
        const checkMovement = (piece, newX, newY) => {
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    if (piece.data[x][y] === 1) {
                        const boardX = piece.x + x + newX;
                        const boardY = piece.y + y + newY;

                        // Check bounds
                        if (boardX >= boardWidth || boardX < 0) return false;
                        if (boardY > boardHeight) return false;

                        // Check collision with existing blocks
                        if (boardY >= 0 && board[boardX] && board[boardX][boardY] && board[boardX][boardY].data === 1) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };

        // Add piece to board permanently
        const fillBoard = (piece) => {
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    if (piece.data[x][y] === 1) {
                        const boardX = piece.x + x;
                        const boardY = piece.y + y;
                        if (boardX >= 0 && boardX <= boardWidth && boardY >= 0 && boardY <= boardHeight) {
                            if (board[boardX]) {
                                board[boardX][boardY] = {
                                    data: 1,
                                    colors: piece.colors,
                                };
                            }
                        }
                    }
                }
            }
        };

        // Check if board is full (top row has blocks)
        const isBoardFull = () => {
            for (let x = 0; x <= boardWidth; x++) {
                if (board[x] && board[x][0] && board[x][0].data === 1) {
                    return true;
                }
            }
            return false;
        };

        // Render everything
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Render board (settled pieces)
            for (let x = 0; x <= boardWidth; x++) {
                for (let y = 0; y <= boardHeight; y++) {
                    if (board[x] && board[x][y] && board[x][y].data !== 0) {
                        const bX = x * blockSize;
                        const bY = y * blockSize;

                        ctx.fillStyle = board[x][y].colors[0];
                        ctx.fillRect(bX, bY, blockSize, blockSize);

                        ctx.fillStyle = board[x][y].colors[1];
                        ctx.fillRect(bX + 2, bY + 2, blockSize - 4, blockSize - 4);

                        ctx.fillStyle = board[x][y].colors[2];
                        ctx.fillRect(bX + 4, bY + 4, blockSize - 8, blockSize - 8);
                    }
                }
            }

            // Render active falling pieces
            for (const piece of pieces) {
                for (let x = 0; x < 4; x++) {
                    for (let y = 0; y < 4; y++) {
                        if (piece.data[x][y] === 1) {
                            const xPos = (piece.x + x) * blockSize;
                            const yPos = (piece.y + y) * blockSize;

                            if (yPos > -blockSize) {
                                ctx.fillStyle = piece.colors[0];
                                ctx.fillRect(xPos, yPos, blockSize, blockSize);

                                ctx.fillStyle = piece.colors[1];
                                ctx.fillRect(xPos + 2, yPos + 2, blockSize - 4, blockSize - 4);

                                ctx.fillStyle = piece.colors[2];
                                ctx.fillRect(xPos + 4, yPos + 4, blockSize - 8, blockSize - 8);
                            }
                        }
                    }
                }
            }
        };

        // Update game state
        const update = () => {
            const boardFull = isBoardFull();

            // Add new pieces if not full and below max
            if (!boardFull && pieces.length < maxPieces) {
                if (Math.random() < 0.02) { // Random spawn rate
                    pieces.push(createPiece());
                }
            }

            // Update each piece
            for (let i = pieces.length - 1; i >= 0; i--) {
                const piece = pieces[i];

                if (Date.now() > piece.lastMove) {
                    piece.lastMove = Date.now() + piece.speed;

                    if (checkMovement(piece, 0, 1)) {
                        piece.y++;
                    } else {
                        // Piece has landed
                        fillBoard(piece);
                        pieces.splice(i, 1);
                    }
                }
            }

            render();
            animationRef.current = requestAnimationFrame(update);
        };

        // Start with a few pieces
        for (let i = 0; i < Math.min(maxPieces, 2); i++) {
            const piece = createPiece();
            piece.y = -4 - (i * 6); // Stagger initial positions
            pieces.push(piece);
        }

        return { update, board, pieces };
    }, [speed, maxPieces]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size to match parent
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;

                // Determine unit size based on screen width
                const isMobile = window.innerWidth < 768;
                const blockSize = isMobile ? mobileUnitSize : unitSize;
                setCurrentUnitSize(blockSize);

                // Reinitialize game on resize
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
                gameStateRef.current = initGame(canvas, blockSize);
                gameStateRef.current.update();
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initGame]);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ background: 'transparent' }}
            />
        </div>
    );
}
