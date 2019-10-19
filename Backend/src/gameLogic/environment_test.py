import unittest
from environment import Envy
import time

class TestEnvironment(unittest.TestCase):
	#
	# Test Type: Unit Test
	# What it is testing: Successfully enumerates all the states
	# Expected output: I expect that all the states are enumerated without exceeding limits

	#
	# Test Type: Unit Test
	# What it is testing: Enumeration does not contain invalid state
	# Expected output: I expect that the invalid state with a square and no edges filled is not there
	def test_state_enumeration_state_valid(self):
		m = Envy(environment_id=0, areas=[0.05, 0.45, 0.4, 0.1], writeToDB = False)
		states = m.create_state_hash_and_values(see_first_states = True) 
		if 1 in states:
			self.fail("Creating hash_and_values raised exception when looking at valid states")

	#
	# Test Type: Unit Test
	# What it is testing: Finds the value of the state that has captured squares
	# Expected output: I expect that value for state is calculated correctly
	
	def test_value_calculation(self):
		m = Envy(environment_id=0, areas=[0.05, 0.45, 0.4, 0.1])
		value = m.calculate_values([1,0,1,0,0,0,2,2,0,0,0,0,1,0,0,0])

		self.assertEqual(value, 0.525)

	#
	# Test Type: Unit Test
	# What it is testing: Successfully enumerates all the states
	# Expected output: I expect that all the states are enumerated without exceeding limits
	# 
	def test_state_enumeration_benchmark(self):
		m = Envy(environment_id=0, areas=[0.05, 0.45, 0.4, 0.1], writeToDB = False)
		start_time = time.time()
		m.create_state_hash_and_values()
		total_time = time.time() - start_time
		self.assertTrue(total_time <= 60)


	#
	# Test Type: Unit Test
	# What it is testing: Correctness of hash value given state
	# Expected output: I expect that the hash avlue must be calculated correctly
	# 
	def test_hash_values(self):
		m = Envy(environment_id=0, areas=[0.05, 0.45, 0.4, 0.1], writeToDB = False)
		state_info = [0] * 16
		state_info[0] = 2
		hash_code = m.get_hash(state_info)
		self.assertTrue(hash_code == 28697814)


	#
	# Test Type: Regression Test
	# What it is testing: Ensures that the edges and squares are all one object instead of multiple objects
	# Expected output: I expect that there is one consolidated squares and edges object for state instead of the existing edges and squares separately
	# 
	def test_value_calculation(self):
		m = Envy(environment_id=0, areas=[0.05, 0.45, 0.4, 0.1])
		self.assertEqual(m.envy_state, [0] * 16)



	#
	# Test Type: Regression Test
	# What it is testing: Ability to change on the db when there is only state history to be updated
	# Expected output: I expect that the db call does not error out when there is a state history of length 1
	# 
	def test_value_with_one_state_history(self):
		m = Envy(environment_id=0, areas=[0.05, 0.45, 0.4, 0.1])
		state_history = [81]
		try:
			m.get_values(state_history)
		except Exception as e:
			self.fail("Unsuccessful in testing values of an envy with just one state history")




		
if __name__ == '__main__':
    unittest.main()