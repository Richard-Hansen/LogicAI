import unittest
from agents import AgentX86, Agentling
from environment import Environment, Envy
from game import Game
from io import StringIO
import sys

class TestGame(unittest.TestCase):
	#
	# Test Type: Incremental Test
	# What it is testing: Game play with no environment provided
	# Expected output: Game must not be able to proceed
	# 
	def test_play_game_without_environment(self):
		# set up the big agent and environment
		# ensure that if the environment is not provided, there is an exception
		self.assertRaises(Exception, AgentX86, None, 1)

	#
	# Test Type: Incremental Test
	# What it is testing: Pass only a single agent to the game constructor
	# Expected output: game must not work
	# 
	def test_create_game_with_one_player(self):
		environment = Environment(writeToDB=False)
		agentX86P1 = AgentX86(environment,1)
		self.assertRaises(Exception, Game, agentX86P1, None, 0)

	#
	# Test Type: Incremental Test
	# What it is testing: pass 0 agents to the game constructor
	# Expected output: Game must not be able to proceed
	# 
	def test_create_game_with_no_players(self):
		self.assertRaises(Exception, Game, None, None, 0)

	#
	# Test Type: Incremental Test
	# What it is testing: Successfully plays a game
	# Expected output: There should be a game that is played without a crash
	def test_play_single_game_2_agents(self):
		# set up the big agent and environment
		try:
			environment = Environment(writeToDB=False)
			agentX86P1 = AgentX86(environment,1)
			agentX86P2 = AgentX86(environment,2)
			game = Game(agentX86P1, agentX86P2, 0)
			game.play_game(update_after_game = True)
		except Exception:
			self.fail("Playing a game causes an exception")


	#
	# Test Type: Incremental Test
	# What it is testing: Full game play and state history after game play from both agents and environment
	# Expected output: State history values must not be repeated in agentlings
	# 
	def test_play_game_state_histories(self):
		# set up the big agent and environment
		environment = Environment(writeToDB=False)
		agentX86P1 = AgentX86(environment,1)
		agentX86P2 = AgentX86(environment,2)
		game = Game(agentX86P1, agentX86P2, 0)

		state_histories_p1 = game.play_game(update_after_game = False, get_state_histories_for_p1 = True)

		for state_history in state_histories_p1:
			self.assertEqual(len(state_history),len(set(state_history)))


	#
	# Test Type: Incremental Test
	# What it is testing: Game play with no player provided
	# Expected output: Game must not be able to proceed
	# 
	def test_play_game_without_player(self):
		# set up the big agent and environment
		# ensure that if the agent is not provided, there is an exception
		environment = Environment(writeToDB=False)
		self.assertRaises(Exception, AgentX86, environment, None)


	
	# Test Type: Unit Test
	# What it is testing: Game play without printing board
	# Expected output: Board should not be printed for every turn
	# 
	def test_play_game_without_board_display(self):
		capturedOutput = StringIO()          
		sys.stdout = capturedOutput

	    # set up the big agent and environment
		environment = Environment(writeToDB=False)
		agentX86P1 = AgentX86(environment,1)
		agentX86P2 = AgentX86(environment,2)
		game = Game(agentX86P1, agentX86P2, 0)
		game.play_game(update_after_game = False, get_state_histories_for_p1 = False, print_board = False)

		sys.stdout = sys.__stdout__
		if "|-----------------------|" in capturedOutput.getvalue():
			self.fail("Printed the board")


	#
	# Test Type: Unit Test
	# What it is testing: Alternating players in the game play for first moves
	# Expected output: The players are getting alternating while the game is getting played in the first moves
	# 
	def test_play_game_players(self):
		# set up the big agent and environment
		environment = Environment(writeToDB=False)
		agentX86P1 = AgentX86(environment,1)
		agentX86P2 = AgentX86(environment,2)
		game = Game(agentX86P1, agentX86P2, 0)

		game.play_game(update_after_game = False, get_state_histories_for_p1 = True, print_board=True, get_players=True)
		players = game.get_players()

		if players[0] == players[1]:
			self.fail("Not alternating in the initial moves")

	#
	# Test Type: Incremental Test
	# What it is testing: Game play with an invalid map num passed from the aelinker
	# Expected output: Environment creation must not be able to proceed
	# 
	def test_play_game_without_map(self):
		try:
			environment = Environment(writeToDB=False)
			agentX86P1 = AgentX86(environment,1)
			agentX86P2 = AgentX86(environment,2)
			game = Game(agentX86P1, agentX86P2, 0)
		except Exception as e: 
			self.assertEqual(str(e), "__init__() missing 1 required positional argument: 'environment_id'")


if __name__ == '__main__':
    unittest.main()
