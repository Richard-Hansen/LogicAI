import numpy as np

# environment for the 2x2 board
class Envy:
	def __init__(self, areas=[0.25]*4):

		# edge representation value for each player
		self.p1 = -1
		self.p2 = 1

		# ended for the entire game
		self.ended = False

		# areas of the squares taken by p1 and p2
		self.squares_taken_areas_p1 = []
		self.squares_taken_areas_p2 = []

		# number of states is equal to (3**12) because each edge can be taken by p1, p2, or none - we also need to include for which squares the edge was taken to be the last edge
		# if taken by p1 or p2 - will need to also include what its bordering 
		self.num_states = (3**16)

		# the number of the edges - just will be representing each of them
		#  _ _
		# |_|_|
		# |_|_|
		# horizontal lines are from 0 - 5, vertical lines are from 6 - 11
		# when a player makes a move, the value will be placed in this array
		self.edges = [0] * 12

		self.squares = [0] * 4

		# edges for each of the squares
		self.top_left_square = [0, 2, 6, 8]
		self.top_right_square = [1, 3, 8, 10]
		self.bottom_left_square = [2, 4, 7, 9]
		self.bottom_right_square = [3, 5, 9, 11]
		self.all_squares_edges = [self.top_left_square, self.top_right_square, self.bottom_left_square, self.bottom_right_square]

		# 1d array that says the weightage of each of the squares - numbered from topleft to bottom right
		self.areas = areas

		print(self.edges, areas)


	# rewards calculated when all the game board is filled up - for each player given the player
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
	def tiny_board_filled(self):
		self.ended = (0 not in self.edges)
		return self.ended


	# tiny board over - determines whether the game is over
	def tiny_board_over(self, during_game = False):
		if during_game:
			# during the game can determine whether the game is over by looking at the number of squares that have been completed
			if len(self.squares_taken_areas_p1) + len(self.squares_taken_areas_p2) == 4:
				# means that the game is over
				self.ended = True
				return True
			return False
		else:
			# during other situtations, want to calculate whether the game is in a done state - for training
			# can check whether the game is over by seeing if all the edges have weights
			return self.tiny_board_filled()


	# gets the current state after it has been hashed into an integer
	def get_state(self, state_info):
		h = 0
		
		for i in len(state_info):
			# the first 12 numbers can either be 0, 1, or 2 - for the edges
			h += (3 ** i) * state_info[i]
		return h


	# get the edges that are still available
	def get_unfilled_edges(self):
		unfilled_edges = []
		for i in len(edges):
			if edges[i] != 0:
				unfilled_edges.push(i)
		return unfilled_edges


	# update the state of the index
	def update_state(self, edge_chosen_index, player):
		self.edges[edge_chosen_index] = player


# gets the current state based on the hash and the value stored
def get_state_hash_and_values(env, i=0, j=0, player):
	# will have a tuple of the state, the winner, and the ended
	results = []

	for v in ()


m = Envy()