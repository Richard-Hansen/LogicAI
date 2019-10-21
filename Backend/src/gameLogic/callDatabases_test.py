import unittest
from callDatabases import get_hash_values_and_by_hash_codes, put_values, ternary, fix_state_translated, build_update, check_num_maps
import time

class TestCallDatabases(unittest.TestCase):

	#
	# Test Type: Unit Test
	# What it is testing: Make sure that there is at least one model for the agent to use
	# Expected output: I expect that there is at least one unique model for hte agent
	# 
	def test_valid_maps(self):
		num_maps = check_num_maps()
		assert num_maps >= 1


	#
	# What it is testing: Invalid hash code not returning state
	# Expected output: I expect that the invalid hash code does not return a state corresponding to it
	# 
	def test_invalid_hash_code_conversion(self):
		hash_code = -1
		# ensure that the call is able to obtain all the information about the hash codes and returns the correct hash codes
			
		with self.assertRaises(ValueError) as context:
			ternary(hash_code)

	#
	# What it is testing: Able to retrieve hash code information from the database for given hash codes
	# Expected output: I expect that all the values associated with the hash code are retrieved from the database
	# 
	def test_multiple_hash_codes(self):
		hash_codes = ['0', '81']
		# ensure that the call is able to obtain all the information about the hash codes and returns the correct hash codes
		hash_codes_and_values = get_hash_values_and_by_hash_codes(hash_codes, 0, 0)
		self.assertEqual(len(hash_codes_and_values), 2)

	#
	# What it is testing: Successful return from obtaining hash codes when no hash codes are provided to obtain
	# Expected output: I expect that an empty dictionary is returned
	# 
	def test_no_hash_code(self):
		hash_codes = []
		# ensure that the call is able to obtain all the information about the hash codes and returns the correct hash codes
		hash_codes_and_values = get_hash_values_and_by_hash_codes(hash_codes, 0, 0)
		self.assertEqual(len(hash_codes_and_values), 0)


	# Test Type: Incremental Test
	# What it is testing: Update of the hash values for the respective hash values
	# Expected output: I expect the hash values to stay the same in the database when updating with the same hash values and codes again
	# 
	def test_put_existing_values(self):
		# obtain the values to be updated from the database
		hash_codes = ['0', '81']
		hash_codes_and_values = get_hash_values_and_by_hash_codes(hash_codes, 0, 0)
		code_value_dictionary = [{0: hash_codes_and_values[0], 81: hash_codes_and_values[1]}]
		self.assertEqual(len(hash_codes_and_values), 2)

		try:
			# send these values back to the database as they are already existing without failing on duplicate key
			put_values(code_value_dictionary, '0')
		except Exception as e:
			self.fail("Unable to work with already existing values in the database on insert")


	# Test Type: Regression Test
	# What it is testing: Update of the hash values for the respective hash values
	# Expected output: I expect the hash values to stay the same in the database when updating with the same hash values and codes again
	# 
	def test_ternary_with_hash_0(self):
		# obtain the value with the ternary
		hash_code = 0
		ternary_value = ternary(hash_code)
		self.assertEqual(type(ternary_value), list)

		self.assertEqual(type(ternary_value[0]), str)


	# Test Type: Unit Test
	# What it is testing: Padding of 0's for a state that has a state that is not 16 characters long
	# Expected Output: I expect that given a state that does not have 16 characters, it is created into one that has 16 characters
	#
	def test_fix_state(self):
		state_translated = [1,2,0,0,0,0]
		fixed_state_translated = fix_state_translated(state_translated)
		self.assertEqual(len(fixed_state_translated), 16)


	# Test Type: Unit Test
	# What it is testing: Padding of 0's for a state that has a state that is not 16 characters long
	# Expected Output: I expect that given a state that does not have 16 characters, it is created into one that has 16 characters
	#
	def test_quotes_state_translated(self):

		# obtain the values to be updated from the database
		hash_codes = ['0', '81']
		hash_codes_and_values = get_hash_values_and_by_hash_codes(hash_codes, 0, 0)
		code_value_dictionary = [{0: hash_codes_and_values[0], 81: hash_codes_and_values[1]}]
		update_statement_for_hash_and_value = build_update(code_value_dictionary, '0')

		if "'0000000000010000'" not in update_statement_for_hash_and_value:
			self.fail("Does not contain the quotes necessary for state")

if __name__ == '__main__':
    unittest.main()