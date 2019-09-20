import unittest
from environment import Envy

#
# Test Type: Verification Test
# What it is testing: Successfully enumerates all the states
# Expected output: I expect that all the states are enumerated without exceeding limits
# 
class TestEnvironment(unittest.TestCase):
	def test_state_enumeration(self):
		try:
			m = Envy(areas=[0.05, 0.45, 0.4, 0.1])
			m.create_state_hash_and_values(writeToDB = False)
			hash_table = m.get_hash_to_state_and_values()
		except Exception:
			self.fail("Creating hash_and_values raised exception when enumerating states")

	def test_value_calculation(self):
		m = Envy(areas=[0.05, 0.45, 0.4, 0.1])
		value = m.calculate_values([1,0,1,0,0,0,2,2,0,0,0,0,1,0,0,0])

		self.assertEqual(value, 0.525)

if __name__ == '__main__':
    unittest.main()