import unittest
from agents import AgentX86, Agentling
from environment import Environment, Envy
from game import Game

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
		self.assertRaises(Exception, Game, agentX86P1, None)

	#
	# Test Type: Incremental Test
	# What it is testing: pass 0 agents to the game constructor
	# Expected output: Game must not be able to proceed
	# 
	def test_create_game_with_no_players(self):
		self.assertRaises(Exception, Game, None, None)

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
			game = Game(agentX86P1, agentX86P2)
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
		game = Game(agentX86P1, agentX86P2)

		state_histories_p1 = game.play_game(update_after_game = False, get_state_histories_for_p1 = True)

		for state_history in state_histories_p1:
			self.assertEqual(len(state_history),len(set(state_history)))


if __name__ == '__main__':
    unittest.main()
