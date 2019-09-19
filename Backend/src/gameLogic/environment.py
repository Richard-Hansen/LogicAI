# creates the big environment 
class Environment:
	def __init__(self, areas=[0.25]*16):
		self.areas = areas
		self.envys = self.__create_envys()

	# creates the smaller environments based on the big environment provided
	def __create_envys(self):
		envys = []
		for i in range(9):
			mini_areas = self.areas[i:i+2]
			mini_areas += self.areas[i+4:i+6]
			envys.append(Envy(mini_areas))
		return envys

	# gets the smaller environment with the parts
	def get_envy(self, envy_index):
		return self.envys[envy_index]

	# creates the states for the environment
	def create_envy_states(self):
		for envy in envys:
			envy.create_state_hash_and_values()

	# update the smaller environment based on the agent's actions
	def update_envys(self, player, envy_tuples):
		for (envy_index, edge) in envy_tuples:
			self.envys[envy_index].update_state(player, edge)


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
		self.hash_to_values = None

		print(self.edges, areas)


	# rewards calculated when all the game board is filled up - for each player given the player
	def reward(self, player):
		# calcuate the value for each of the players
		if not self.ended():
			return 0

		# calculate the amount to give to each player
		return sum(squares_taken_areas_p1) if player == p1 else sum(squares_taken_areas_p2)		


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
	def get_hash(self, state_info = None):
		if state_info == None:
			(self.edges + self.squares)
		h = 0
		k = 0
		for i in range(len(state_info) - 1, -1, -1):
			# the first 12 numbers can either be 0, 1, or 2 - for the edges
			# last 4 numbers are to denote who has taken each edge
			h += (3 ** k) * state_info[i]
			k += 1
		return h


	# get the edges that are still available
	def get_unfilled_edges(self):
		unfilled_edges = []
		for i in len(edges):
			if edges[i] != 0:
				unfilled_edges.push(i)
		return unfilled_edges


	# update the state of the index
	def update_state(self, player, edge_chosen_index):
		self.edges[edge_chosen_index] = player


	# finds the value of the ternary
	def ternary(self, hash_code):
	    if hash_code == 0:
	        return 0
	    nums = []
	    while hash_code:
	        hash_code, remainder = divmod(hash_code, 3)
	        nums.append(remainder)
	    return nums


	# get the value of the state given the player and returns the values of the state corresponding to that hash
	def get_state_value(self, player, hash_key):
		if player == self.p1:
			state = self.hash_to_values[hash_key]
			return state
		else:
			# change the hash to ternary and then calculate the value for the other player
			state = self.ternary(hash_key)
			# get the hash key for the new value
			new_hash_key = self.get_hash([1 if i == 2 else 2 if i == 1 else 0 for i in state])
			print("OLD HASH", state, hash_key, new_hash_key)
			state = self.hash_to_values[new_hash_key]
			return state


	# calcuate the value for each the states
	def calculate_values(self, state_info):
		# player value functions
		value = 0

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

		for edges_needed_for_side_index in range(4):
			if edges_needed[edges_needed_for_side_index] == 4 or edges_needed[edges_needed_for_side_index] == 3:
				value += 0.5 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 2:
				value += 0.25 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 1:
				value += 0.9 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 0:
				if state_info[edges_needed_for_side_index + 12] == 0:
					value += self.areas[edges_needed_for_side_index]

		# print("VALUES", value)
		return value


	# gets the state value
	def state_value_for_choosing_edge(self, player, edge_to_consider_index):
		if self.edges[edge_to_consider_index] == 0:
			self.edges[edge_to_consider_index] = player

			value = self.hash_to_values[self.get_hash(self.edges)]

			self.edges[edge_to_consider_index] = 0

			return value

		raise Exception('Edge already chosen')


	# gets the current state based on the hash and the value stored
	def create_state_hash_and_values(self):
		self.hash_to_values = {}

		TERNARY = 3
		# Written in coordination with Richard 
		# please don't judge us, it had to be done for the sake of the project
		for a in range(TERNARY): # 0
			for b in range(TERNARY): # 1
				for c in range(TERNARY): # 2
					for d in range(TERNARY): # 3
						for e in range(TERNARY): # 4
							for f in range(TERNARY): # 5
								for g in range(TERNARY): # 6
									for h in range(TERNARY): # 7
										for i in range(TERNARY): # 8
											for j in range(TERNARY): # 9
												for k in range(TERNARY): # 10
													for l in range(TERNARY): # 11
														for m in range(TERNARY): # 12
															for n in range(TERNARY): # 13
																for o in range(TERNARY): # 14
																	for p in range(TERNARY): # 15
																		state_info = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p]

																		# if there is an empty edge, then the square cannot be owned
																		if (a == 0 or c == 0 or g == 0 or h == 0) and m != 0:
																			continue
																		if (b == 0 or d == 0 or h == 0 or i == 0) and n != 0:
																			continue
																		if (c == 0 or e == 0 or j == 0 or k == 0) and o != 0:
																			continue
																		if (d == 0 or f == 0 or k == 0 or l == 0) and p != 0:
																			continue

																		# if all edges are taken then the square must be owned
																		if (a != 0 and c != 0 and g != 0 and h != 0) and m == 0:
																			continue
																		if (b != 0 and d != 0 and h != 0 and i != 0) and n == 0:
																			continue
																		if (c != 0 and e != 0 and j != 0 and k != 0) and o == 0:
																			continue
																		if (d != 0 and f != 0 and k != 0 and l != 0) and p == 0:
																			continue


																		# the number of moves made by each player must be within a distance of 1 of eachother
																		# count_1 = 0
																		# count_2 = 0
																		# for v in state_info:
																		# 	if v == 1:
																		# 		count_1 += 1
																		# 	elif v == 2:
																		# 		count_2 += 1

																		# if abs(count_1 - count_2) > 1:
																		# 	continue

																		hash_key = self.get_hash(state_info)
																		value = self.calculate_values(state_info)
																		self.hash_to_values[hash_key] = value


		print(len(self.hash_to_values))

m = Envy(areas=[0.05, 0.45, 0.4, 0.1])
m.create_state_hash_and_values()

print("STATE", m.get_state_value(1, m.get_hash([0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0])))
