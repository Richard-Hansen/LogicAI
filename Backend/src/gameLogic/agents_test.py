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

	# def test_agentling_state_history(self):
	# 	for a in self.agentx86.agentlings:
	# 		a.state_history.append


if __name__ == '__main__':
    unittest.main()