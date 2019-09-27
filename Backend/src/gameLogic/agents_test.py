import unittest
from agents import AgentX86, Agentling
from environment import Environment, Envy

class TestAgents(unittest.TestCase):
	#
	# Test Type: Unit Test
	# What it is testing: Successfully creates 9 agentlings
	# Expected output: There should be 9 agentlings if AgentX86 built correctly on top of the environment
	# 
	def test_state_build_agentlings(self):
		# set up the big agent and environment
		environment = Environment(writeToDB=False)
		agentx86 = AgentX86(environment,1)
		self.assertEqual(len(agentx86.agentlings), 9)

	#
	# Test Type: Unit Test
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
	# Test Type: Unit Test
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
	# Test Type: Unit Test
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


	#
	# Test Type: Incremental Test
	# What it is testing: Updating the values for an agentling that does not have state histories to update
	# Expected output: The value list must not contain any values for the states when the state history is empty
	# 
	def test_update_state_history(self):
		environment = Environment(writeToDB=False)
		agentx86 = AgentX86(environment,1)
		value_list = agentx86.update()
		self.assertEqual(value_list[0], {})

	#
	# Test Type: Regression Test
	# What it is testing: If an empty state history is passed to get it's values from the server, an empty dictionary should be returned
	# Expected output: All 9 value dictionaries should be empty.
	# 
	def test_empty_value_dictionary(self):
		environment = Environment(writeToDB=False)
		agentx86 = AgentX86(environment,1)
		flag = True
		for a in agentx86.get_agentlings():
			value_dictionary = a.env.get_values(a.state_history)
			flag = flag and (value_dictionary == {})

		self.assertEqual(flag, True)

	#
	# Test Type: Incremental Test
	# What it is testing: If an agent makes a move, the environment should accurately reflect the move's result for the correct environments
	# Expected output: The mapping suggested number of updated environments should be the same number updated by the environment class
	# 
	def test_mapping_validity(self):
		environment = Environment(writeToDB=False)
		agentx86 = AgentX86(environment,1)
		big_to_tiny = agentx86.big_to_tiny

		for i in range(40):
			# recreate environment to reset update counts
			environment = Environment(writeToDB=False)
			agentx86 = AgentX86(environment,1)

			# update the environments assuming that the action big_to_tiny[i] had been taken
			agentx86.X_env.update_envys(agentx86.player, agentx86.big_to_tiny[i])

			# count of number of environments that should have updated
			count_true = len(big_to_tiny[i])

			# counter which will hold the number of updated environment states
			count_update = 0

			for e in environment.get_envys():
				if len([v for v in e.envy_state if v != 0]) == 1:
					count_update += 1

			if count_true != count_update:
				self.fail("Environments incorrectly updated, expected to update %d, but updated %d. big_to_tiny[%d]" % (count_true, count_update, i))

		# pass the test
		self.assertEqual(0,0)
		
if __name__ == '__main__':
    unittest.main()