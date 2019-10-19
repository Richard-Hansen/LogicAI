import unittest
from AELinker import Linker, create_AI
from callDatabases import check_map

class TestLinker(unittest.TestCase):
	#
	# Test Type: Unit Test
	# What it is testing: Ensures that when areas are passed in the linker checks to make sure the correct number of areas passed
	# Expected output: Throws an error if areas has a length that isn't valid
	# 
	# def test_areas_length(self):
	# 	a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625]
	# 	self.assertRaises(Exception, Linker, a)

	# #
	# # Test Type: Unit Test
	# # What it is testing: Sum of areas must be 1
	# # Expected output: Errors if the area sums isn't 1
	# # 
	# def test_areas_sum(self):
	# 	# changed first area value so the sum is not 1.
	# 	a = [0.055625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
	# 	self.assertRaises(Exception, Linker, a)
	# #
	# # Test Type: Unit Test
	# # What it is testing: Ensure that the areas provided are correctly translated
	# # Expected output: Areas are translated upon creating a linker object
	# # 
	# def test_areas_translated(self):
	# 	a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
	# 	L = Linker(a)
	# 	self.assertNotEqual(a,L.areas)

	# #
	# # Test Type: Unit Test
	# # What it is testing: Ensure that the areas provided are strictly > 0
	# # Expected output: any areas passed <= 0 should rais an exception
	# # 
	# def test_area_valid_inputs(self):
	# 	a = [0,0.12375,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
	# 	self.assertRaises(Exception, Linker, a)

	# #
	# # Test Type: Unit Test
	# # What it is testing: Make sure that a valid number of epochs is passed in
	# # Expected output: Errors if the number of epochs is < 1 or > 10000
	# # 
	# def test_valid_epochs(self):
	# 	a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
	# 	L = Linker(a)
	# 	self.assertRaises(Exception, L.train, 0)


	# #
	# # Test Type: Regression Test
	# # What it is testing: Make sure that a the map number training on is valid
	# # Expected output: Errors if the number of epochs is < 0
	# # 
	# def test_valid_maps(self):
	# 	a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
	# 	with self.assertRaises(Exception) as context:
	# 		create_AI(a, -1)
	# 	self.assertTrue("All the maps looked at must have a map num greater than or equal to 0" in str(context.exception))


	# #
	# # Test Type: Incremental Test
	# # What it is testing: Make sure that the map to be created has not already been there from a db call from the existing call in the create
	# # Expected output: I expect the map to not crash on creation
	# # 
	# def test_valid_maps(self):
	# 	a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
		
	# 	# check to be there from the map of 0
	# 	map_id_to_check = 0
	# 	exists = check_map(map_id_to_check)

	# 	# the exists must equal true because 0 is already there
	# 	self.assertEqual(exists, True)

	# 	# tell the AI that the value already exists and the creation must be successful
	# 	self.assertEqual(create_AI(a, 0, exists), True)


	#
	# Test Type: Regression Test
	# What it is testing: Make sure that the areas are not always transposed
	# Expected output: I expect the transposition to not be translated when it does not need to
	# 
	def test_transpose_function(self):
		a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
		L = Linker(a, translate_areas = False, map_num = 5)
		self.assertEqual(L.areas, a)
		


if __name__ == '__main__':
	unittest.main()
