import unittest
from agents import AgentX86, Agentling
from environment import Environment, Envy

class TestAgents(unittest.TestCase):
	#
	# Test Type: Verification Test
	# What it is testing: Successfully creates 9 agentlings
	# Expected output: There should be 9 agentlings if AgentX86 built correctly on top of the environment
	# 
	def test_state_build_agentlings(self):
		# set up the big agent and environment
		environment = Environment(writeToDB=False)
		agentx86 = AgentX86(environment,1)
		self.assertEqual(len(agentx86.agentlings), 9)

	#
	# Test Type: Verification Test
	# What it is testing: Successfully reseting state_history to an empty list
	# Expected output: state_history should have a length of 0
	# 
	def test_agentling_state_history(self):
		environment = Environment(writeToDB=False)
		agentx86 = AgentX86(environment,1)
		agentx86.agentlings[0].update_state_history()
		agentx86.agentlings[0].reset_state_history()
		self.assertEqual(0, len(agentx86.agentlings[0].state_history))


	#
	# Test Type: Boundary Test
	# What it is testing: Add numerous states to the agentling state history
	# Expected output: length of state history matches the insertion count
	# 
	def test_agentling_many_states(self):
		environment = Environment(writeToDB=False)
		agentx86 = AgentX86(environment,1)
		for i in range(100):
			agentx86.agentlings[0].update_state_history()
		self.assertEqual(100, len(agentx86.agentlings[0].state_history))

	#
	# Test Type: Verification Test
	# What it is testing: Verify that the agent can successfully take an action on the environment
	# Expected output: take_action successfully completes
	# 
	def test_take_action(self):
		try:
			environment = Environment(writeToDB=False)
			agentx86 = AgentX86(environment,1)
			agentx86.take_action()
		except Exception:
			self.fail("Taking an action caused the agent to create an exception")

	#
	# Test Type: Verification Test
	# What it is testing: Make multiple moves, and make sure the environment correctly reflects the moves
	# Expected output: number of unfilled edges in the environment after 2 moves should be reduced by 2
	# 
	def test_take_action_environment_update(self):
		environment = Environment(writeToDB=False)
		agentx86 = AgentX86(environment,1)
		curr_env_count = agentx86.X_env.get_environment().count(0)
		print(agentx86.take_action())
		print(agentx86.take_action())
		new_env_count = agentx86.X_env.get_environment().count(0)
		self.assertEqual(curr_env_count-2, new_env_count)


if __name__ == '__main__':
    unittest.main()