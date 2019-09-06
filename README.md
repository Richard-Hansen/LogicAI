# LogicAI

In the world of game-playing, there are a myriad of approaches that could be taken in order to play the game, either with other players or with an agent based on artificial intelligence. These agents are able to play against any number of different players, all with different strategies and approaches, and yet, the agent is able to play a competitive match. Our goal for this project is to develop an artificial intelligence agent to play a fractured line-matching game. The goal of the game is to enclose a shape by selecting the edges of the shape on the board, with the player and AI alternating turns, and winning points when completing a shape. This will provide players with a challenging competition against a well-trained AI, that they are free to access whenever they want to. This gives players the ability to improve their competitive and problem-solving skills through an interactive challenge game. The uniqueness lies in the creation of an agent that will be playing with various levels of difficulty in the game. 

## Project Objectives
1. Build a game interface that will allow users to choose actions to take on the game board by selecting edges of a shape
2. Create and train an AI agent that will be able to choose moves to take on the game board based on reinforcement learning
3. Allow a human player to play against an AI agent and show the moves of both the human player and the AI on the game board
4. Provide an interface to the player to view and reset the game state
5. Create a scoring mechanism that will indicate players’ results and winning players
6. Create automated tests to ensure the functionality of creating the game board and playing the game works as expected by using Mocha, Go Test, and Python unittest

## How to Run
* Download GoLang from https://golang.org
* To view all packages GoLang offers -> https://golang.org/pkg/
* cd to the root directory
* Set up your environment, please reference envsetup.sh comments
   * Run `. envsetup.sh`
* run `go run Fractal-AI.go`
   * You can also run `go build Fractal-AI.go`
   * and then './Fractal-AI'
* Open a browser and go to `localhost:8080/`

## Helpful Tips
* Run `go fmt file.go` to automatically format your files
