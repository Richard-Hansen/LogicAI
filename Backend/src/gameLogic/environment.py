import numpy as np

class MiniBoard:
	def __init__(self, areas=[0.25]*4):

		# edge representation value for each player
		self.p1 = -1
		self.p2 = 1

		# ended for the entire game
		self.ended = False

		# areas of the squares taken by p1 and p2
		self.squares_taken_areas_p1 = []
		self.squares_taken_areas_p2 = []

		# number of states is equal to (4**8) * (5**4) because each edge can be taken by p1, p2, or none - we also need to include for which squares the edge was taken to be the last edge
		# if taken by p1 or p2 - will need to also include what its bordering 
		self.num_states = (4**8) * (5**4)

		# the number of the edges - just will be representing each of them
		#  _ _
		# |_|_|
		# |_|_|
		# horizontal lines are from 0 - 5, vertical lines are from 6 - 11
		# when a player makes a move, the value will be placed in this array
		self.board = [0] * 12

		# edges for each of the squares
		self.top_left_square = [0, 2, 6, 8]
		self.top_right_square = [1, 3, 8, 10]
		self.bottom_left_square = [2, 4, 7, 9]
		self.bottom_right_square = [3, 5, 9, 11]
		self.all_squares_edges = [self.top_left_square, self.top_right_square, self.bottom_left_square, self.bottom_right_square]

		# 1d array that says the weightage of each of the squares - numbered from topleft to bottom right
		self.areas = areas

		print(self.board, areas)


	# rewards calculated all the game board is filled up
	def reward(self, player):
		# calcuate the value for each of the players
		if not self.ended():
			return 0

		# calculate the amount to give to each player
		return sum(squares_taken_areas_p1) if player == p1 else sum(squares_taken_areas_p2)
		

	# determines if a square has been filled and appends the area of that square to the list of squares captured 
	def square_filled(self, current_player, edge_filled):
		filled = False

		for i in len(self.all_squares_edges):
			if edge_filled in self.all_squares_edges[i]:
				self.squares_taken_areas.append(self.areas[i])
				filled = True

		return filled


	# determines if mini board is filled completely
	def mini_board_filled(self):
		self.ended = (0 not in self.board)
		return self.ended


m = MiniBoard()