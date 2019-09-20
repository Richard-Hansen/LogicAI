import unittest
from environment import Envy
import time

class TestEnvironment(unittest.TestCase):
	#
	# Test Type: Verification Test
	# What it is testing: Successfully enumerates all the states
	# Expected output: I expect that all the states are enumerated without exceeding limits
	# 
	def test_state_enumeration(self):
		try:
			m = Envy(areas=[0.05, 0.45, 0.4, 0.1], writeToDB = False)
			m.create_state_hash_and_values()
			hash_table = m.get_hash_to_state_and_values()
		except Exception:
			self.fail("Creating hash_and_values raised exception when enumerating states")

	# #
	# # Test Type: Verification Test
	# # What it is testing: Finds the value of the state that has captured squares
	# # Expected output: I expect that value for state is calculated correctly
	# # 
	def test_value_calculation(self):
		m = Envy(areas=[0.05, 0.45, 0.4, 0.1])
		value = m.calculate_values([1,0,1,0,0,0,2,2,0,0,0,0,1,0,0,0])

		self.assertEqual(value, 0.525)

	#
	# Test Type: Verification Test
	# What it is testing: Successfully enumerates all the states
	# Expected output: I expect that all the states are enumerated without exceeding limits
	# 
	def test_state_enumeration_benchmark(self):
		m = Envy(areas=[0.05, 0.45, 0.4, 0.1], writeToDB = False)
		start_time = time.time()
		m.create_state_hash_and_values()
		total_time = time.time() - start_time
		self.assertTrue(total_time <= 60)


	#
	# Test Type: Verification Test
	# What it is testing: Correctness of hash value given state
	# Expected output: I expect that the hash avlue must be calculated correctly
	# 
	def test_hash_values(self):
		m = Envy(areas=[0.05, 0.45, 0.4, 0.1], writeToDB = False)
		state_info = [0] * 16
		state_info[0] = 2
		hash_code = m.get_hash(state_info)
		self.assertTrue(hash_code == 28697814)
		
if __name__ == '__main__':
    unittest.main()