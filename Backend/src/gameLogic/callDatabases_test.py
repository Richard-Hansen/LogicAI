import unittest
from callDatabases import get_hash_values_and_by_hash_codes, put_values, ternary
import time

class TestCallDatabases(unittest.TestCase):
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
			put_values(code_value_dictionary)
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

	
if __name__ == '__main__':
    unittest.main()