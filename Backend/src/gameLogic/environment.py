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
		self.top_left_square = [0, 2, 6, 7]
		self.top_right_square = [1, 3, 7, 8]
		self.bottom_left_square = [2, 4, 9, 10]
		self.bottom_right_square = [3, 5, 10, 11]
		self.all_squares_edges = [self.top_left_square, self.top_right_square, self.bottom_left_square, self.bottom_right_square]

		# 1d array that says the weightage of each of the squares - numbered from topleft to bottom right
		self.areas = areas

		# contains the dictionary of the state and the results obtained from that environment for each player and the value that they would have
		results_p1 = []
		results_p2 = []

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
			# last 4 numbers are to denote who has taken each edge
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
	def get_state_hash_and_values(self, state_info):
		# player value functions
		p1_value = 0
		p2_value = 0

		# number of edges to complete a square
		# edges_needed_top_left, edges_needed_top_right, edges_needed_bottom_left, edges_needed_bottom_right 
		edges_needed = [4,4,4,4]
		
		for i in range(4):
			if state_info[self.top_left_square[i]] > 0:
				edges_needed[0] -= 1
			if state_info[self.top_right_square[i]] > 0:
				edges_needed[1] -= 1
			if state_info[self.bottom_left_square[i]] > 0:
				edges_needed[2] -= 1
			if state_info[self.bottom_right_square[i]] > 0:
				edges_needed[3] -= 1

		# total edges remaining
		edges_remaining = sum(edges_needed)

		# player who can player next
		next_player = self.p1 if edges_remaining % 2 == 0 else self.p2

		for edges_needed_for_side_index in range(4):
			if edges_needed[edges_needed_for_side_index] == 4 or edges_needed[edges_needed_for_side_index] == 3:
				# same value to both
				if next_player == self.p1:
					p1_value += 0.5 * self.areas[edges_needed_for_side_index]
				else:
					p2_value += 0.5 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 2:
				if next_player == self.p1:
					p1_value += 0.25 * self.areas[edges_needed_for_side_index]
				else:
					p2_value += 0.75 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 1:
				# can get that point
				if next_player == self.p1:
					p1_value += 0.9 * self.areas[edges_needed_for_side_index]
				else:
					p2_value += 0.1 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 0:
				if state_info[12] == 0:
					p1_value += self.areas[edges_needed_for_side_index]
				else:
					p2_value += self.areas[edges_needed_for_side_index]

		print("P VALUES", p1_value, p2_value)
   
		# else:
		# 	# to get all the possible states
		# 	self.get_state_hash_and_values(state_info.append(0), indicies_left - 1)
		# 	self.get_state_hash_and_values(state_info.append(1), indicies_left - 1, areas)
		# 	if indicies_left != 4:
		# 		self.get_state_hash_and_values(state_info.append(2), indicies_left - 1, areas)


m = Envy()
m.get_state_hash_and_values([2,2,2,2,2,2,1,2,1,2,1,0,0,0,0,0])
