import unittest
from AELinker import Linker

class TestLinker(unittest.TestCase):
	#
	# Test Type: Unit Test
	# What it is testing: Ensures that when areas are passed in the linker checks to make sure the correct number of areas passed
	# Expected output: Throws an error if areas has a length that isn't valid
	# 
	def test_areas_length(self):
		a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625]
		self.assertRaises(Exception, Linker, a)

	#
	# Test Type: Unit Test
	# What it is testing: Sum of areas must be 1
	# Expected output: Errors if the area sums isn't 1
	# 
	def test_areas_sum(self):
		# changed first area value so the sum is not 1.
		a = [0.055625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
		self.assertRaises(Exception, Linker, a)
	#
	# Test Type: Unit Test
	# What it is testing: Ensure that the areas provided are correctly translated
	# Expected output: Areas are translated upon creating a linker object
	# 
	def test_areas_translated(self):
		a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
		L = Linker(a)
		self.assertNotEqual(a,L.areas)

	#
	# Test Type: Unit Test
	# What it is testing: Ensure that the areas provided are strictly > 0
	# Expected output: any areas passed <= 0 should rais an exception
	# 
	def test_area_valid_inputs(self):
		a = [0,0.12375,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
		self.assertRaises(Exception, Linker, a)

	#
	# Test Type: Unit Test
	# What it is testing: Make sure that a valid number of epochs is passed in
	# Expected output: Errors if the number of epochs is < 1 or > 10000
	# 
	def test_valid_epochs(self):
		a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
		L = Linker(a)
		self.assertRaises(Exception, L.train, 0)

if __name__ == '__main__':
	unittest.main()
