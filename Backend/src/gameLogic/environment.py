from callDatabases import set_hash_value, get_hash_value_and_state_by_hash_code, get_hash_values_and_by_hash_codes

# creates the big environment 
class Environment:
	def __init__(self, environment_id, areas=[0.25]*16, writeToDB=True):
		if environment_id == None:
			raise Exception("Unacceptable environment id provided")

		self.areas = areas
		self.environment_id = environment_id 
		self.writeToDB = writeToDB
		self.envys = self.__create_envys()
		self.big_board = [0] * 40
		
		self.tiny_to_big_edges = {
							0:[0,1,4,5,8,9,20,21,22,25,26,27],
							1:[1,2,5,6,9,10,21,22,23,26,27,28],
							2:[2,3,6,7,10,11,22,23,24,27,28,29],
							3:[4,5,8,9,12,13,25,26,27,30,31,32],
							4:[5,6,9,10,13,14,26,27,28,31,32,33],
							5:[6,7,10,11,14,15,27,28,29,32,33,34],
							6:[8,9,12,13,16,17,30,31,32,35,36,37],
							7:[9,10,13,14,17,18,31,32,33,36,37,38],
							8:[10,11,14,15,18,19,32,33,34,37,38,39],
							}

	# creates the smaller environments based on the big environment provided
	def __create_envys(self):
		envys = []
		for i in range(9):
			shift = int(i / 3)
			mini_areas = self.areas[i+shift:i+2+shift]
			mini_areas += self.areas[i+4+shift:i+6+shift]
			envys.append(Envy(mini_areas, self.environment_id, i, self.writeToDB))
		return envys

	# get the envys
	def get_envys(self):
		return self.envys

	# gets the smaller environment with the parts
	def get_envy(self, envy_index):
		return self.envys[envy_index]

	# creates the states for the environment
	def create_envy_states(self):
		for envy in self.envys:
			envy.create_state_hash_and_values()

	# update the smaller environment based on the agent's actions
	def update_envys(self, player, envy_tuples):
		#set the edge in the big board to the chosen player
		tiny_env = envy_tuples[0][0]
		tiny_edge = envy_tuples[0][1]
		self.big_board[self.tiny_to_big_edges[tiny_env][tiny_edge]] = player

		for (envy_index, edge) in envy_tuples:
			#print("UPDATING ENVYS\n\n\n\n\n", envy_index, edge)
			self.envys[envy_index].update_state(player, edge)

	# gets the current environment
	def get_environment(self):
		return self.big_board 


# environment for the 2x2 board
class Envy:
	def __init__(self, areas=[0.25]*4, environment_id=0, envy_id=0, writeToDB=True):

		# edge representation value for each player
		self.p1 = 1
		self.p2 = 2

		# stores teh environment and the envy id for use in the database
		self.envy_id = envy_id
		self.environment_id	= environment_id

		# writing again to the db
		self.writeToDB = writeToDB

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
		self.envy_state = [0] * 16

		# edges for each of the squares
		self.top_left_square = [0, 2, 6, 7]
		self.top_right_square = [1, 3, 7, 8]
		self.bottom_left_square = [2, 4, 9, 10]
		self.bottom_right_square = [3, 5, 10, 11]
		self.all_squares_edges = [self.top_left_square, self.top_right_square, self.bottom_left_square, self.bottom_right_square]

		# 1d array that says the weightage of each of the squares - numbered from topleft to bottom right
		self.areas = areas

		# contains the dictionary of the state and the results obtained from that environment for each player and the value that they would have
		self.hash_to_values_and_state = None

		#print(self.edges, areas)


	# get all the values with the database
	def get_values(self, state_history):
		hash_codes_and_values = {}

		# make the db call to get all the values for the ones in the hash
		if len(state_history) == 1:
                        #print(1)
			# single value in the list
			hash_values = get_hash_value_and_state_by_hash_code(state_history[0], self.environment_id, self.envy_id)
		else:
                        #print(2)
			# has more of the hash codes so need to put all into one call
			hash_values = get_hash_values_and_by_hash_codes(state_history, self.environment_id, self.envy_id)
		
		value_index = 0
		for s in state_history:
                        #print(s, value_index, len(hash_values))
			hash_codes_and_values[s] = hash_values[value_index]
			#print(hash_codes_and_values[s])
			value_index += 1

		print("After the values")
		return hash_codes_and_values


	# put all the values into the database it recieves - gets an array of dictionaries - where each dictionary is with the hash values to be updated
	def put_values(self, all_values_to_update):
		# gets all the values that need to be updated
		for i in len(all_values_to_update.keys()):
			# dictionary of the values that need to be updated
			put_hash_values_and_state(values_to_update[i], self.environment, i)


	# rewards calculated when all the game board is filled up - for each player given the player
	def reward(self, player, state_info):
		state_translated = self.ternary(state_info)

		if len(state_translated) < 16:
			state_translated = ([0] * (16 - len(state_translated))) + state_translated

		rew = self.calculate_values(state_translated)
		return rew if player == self.p1 else (1 - rew)

		# # calcuate the value for each of the players
		# if not self.ended():
		# 	return 0

		# # calculate the amount to give to each player
		# return sum(squares_taken_areas_p1) if player == p1 else sum(squares_taken_areas_p2)		


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
		# there is no state info so just get it from the current state
		if state_info == None:
			state_info = self.envy_state

		h = 0
		k = 0
		for i in range(len(state_info) - 1, -1, -1):
			# the first 12 numbers can either be 0, 1, or 2 - for the edges
			# last 4 numbers are to denote who has taken each square - 0, 1, or 2 
			h += (3 ** k) * state_info[i]
			k += 1

		return h


	# get the edges that are still available
	def get_unfilled_edges(self):
		unfilled_edges = []
		for i in range(12):
			if self.envy_state[i] == 0:
				unfilled_edges.append(i)
		return unfilled_edges


	# update the state of the index
	def update_state(self, player, edge_chosen_index):
		self.envy_state[edge_chosen_index] = player

		#print(self.envy_state[0] != 0 and self.envy_state[2] != 0 and self.envy_state[6] != 0 and self.envy_state[7] != 0 and edge_chosen_index in self.top_left_square)
		# top left
		if self.envy_state[0] != 0 and self.envy_state[2] != 0 and self.envy_state[6] != 0 and self.envy_state[7] != 0 and edge_chosen_index in self.top_left_square:
			self.envy_state[12] = player
		# top right
		if self.envy_state[1] != 0 and self.envy_state[3] != 0 and self.envy_state[7] != 0 and self.envy_state[8] != 0 and edge_chosen_index in self.top_right_square:
			self.envy_state[13] = player
		# bottom left
		if self.envy_state[2] != 0 and self.envy_state[4] != 0 and self.envy_state[9] != 0 and self.envy_state[10] != 0 and edge_chosen_index in self.bottom_left_square:
			self.envy_state[14] = player
		# bottom right
		if self.envy_state[3] != 0 and self.envy_state[5] != 0 and self.envy_state[10] != 0 and self.envy_state[11] != 0 and edge_chosen_index in self.bottom_right_square:
			self.envy_state[15] = player

		#print("UPDATED STATE", self.envy_state)

	# finds the value of the ternary
	def ternary(self, hash_code):
		if hash_code == 0:
			return 0
		nums = []
		while hash_code:
			hash_code, remainder = divmod(hash_code, 3)
			nums.insert(0, remainder)
		return nums


	# get the value of the state given the player and returns the values of the state corresponding to that hash
	def get_state_value(self, player, hash_key):
		# if the player is p1, then we can use the hash that we already have
		(value, state) = get_hash_value_and_state_by_hash_code(hash_key, self.environment_id, self.envy_id)
		if player == self.p1:
			return value
		else:
			# if doing the conversion from scratch
			# state_translated = self.ternary(hash_key)
			# state_translated.reverse()
			# if len(state_translated) < 16:
			# 	state_translated = ([0] * (16 - len(state_translated))) + state_translated

			# change the hash to ternary and then calculate the value for the other player
			new_hash_key = self.get_hash([1 if i == 2 else 2 if i == 1 else 0 for i in state])
			# look at calcluating the value for player 2
			(new_value, new_state) = get_hash_value_and_state_by_hash_code(new_hash_key, self.environment_id, self.envy_id)
			return new_value


	# get the hash to values and functions
	def get_hash_to_state_and_values(self):
		return self.hash_to_values_and_state


	# calcuate the value for each the states
	def calculate_values(self, state_info):
		# print("STATE INFO", state_info)
		# calclulate the use of the values with player 1's values
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

		# print("EDGES NEEDED", edges_needed)

		for edges_needed_for_side_index in range(4):
			if edges_needed[edges_needed_for_side_index] == 4 or edges_needed[edges_needed_for_side_index] == 3:
				value += 0.4 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 2:
				value += 0.8 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 1:
				value += 0.2 * self.areas[edges_needed_for_side_index]
			elif edges_needed[edges_needed_for_side_index] == 0:
				if state_info[edges_needed_for_side_index + 12] == self.p1:
					value += self.areas[edges_needed_for_side_index]

		# print("VALUES", value)
		return value

	# gets the state value
	def state_value_for_choosing_edge(self, player, edge_to_consider_index):
		if self.envy_state[edge_to_consider_index] == 0:
			self.envy_state[edge_to_consider_index] = player

			#print("Edges to get value for: ", self.edges)
			# squares that have been changed
			updated_squares = self.envy_state[12:16]
			changed_squares = [0] * 4

			# top left
			if self.envy_state[0] != 0 and self.envy_state[2] != 0 and self.envy_state[6] != 0 and self.envy_state[7] != 0 and edge_to_consider_index in self.top_left_square:
				#self.edges[12] = player
				updated_squares[0] = player
				changed_squares[0] = player
			# top right
			if self.envy_state[1] != 0 and self.envy_state[3] != 0 and self.envy_state[7] != 0 and self.envy_state[8] != 0 and edge_to_consider_index in self.top_right_square:
				#self.edges[13] = player
				updated_squares[1] = player
				changed_squares[1] = player
			# bottom left
			if self.envy_state[2] != 0 and self.envy_state[4] != 0 and self.envy_state[9] != 0 and self.envy_state[10] != 0 and edge_to_consider_index in self.bottom_left_square:
				#self.edges[14] = player
				updated_squares[2] = player
				changed_squares[2] = player
			# bottom right
			if self.envy_state[3] != 0 and self.envy_state[5] != 0 and self.envy_state[10] != 0 and self.envy_state[11] != 0 and edge_to_consider_index in self.bottom_right_square:
				#self.edges[15] = player
				updated_squares[3] = player
				changed_squares[3] = player

			(value, state) = get_hash_value_and_state_by_hash_code(self.get_hash(self.envy_state[:12] + updated_squares), self.environment_id, self.envy_id)

			self.envy_state[edge_to_consider_index] = 0

			for i in range(len(changed_squares)):
				if changed_squares[i] == player:
					self.envy_state[12 + i] = 0

			return value

		raise Exception('Edge already chosen')

	# gets the state value
	def state_value_for_all_edges(self, player, edges_to_consider):
		values_to_pass = []
		values_to_return = []
		#print("THE EDGE TO CONSIDER", edges_to_consider, self.envy_state)

		for i in range(12):
			edge_to_consider_value = edges_to_consider[i] 

			# 0 means the edge is available to be taken
			if edge_to_consider_value == 0:
				self.envy_state[i] = player


				#print("Edges to get value for: ", self.edges)
				# squares that have been changed
				updated_squares = self.envy_state[12:16]
				changed_squares = [0] * 4

				# top left
				if self.envy_state[0] != 0 and self.envy_state[2] != 0 and self.envy_state[6] != 0 and self.envy_state[7] != 0 and i in self.top_left_square:
					#self.edges[12] = player
					updated_squares[0] = player
					changed_squares[0] = player
				# top right
				if self.envy_state[1] != 0 and self.envy_state[3] != 0 and self.envy_state[7] != 0 and self.envy_state[8] != 0 and i in self.top_right_square:
					#self.edges[13] = player
					updated_squares[1] = player
					changed_squares[1] = player
				# bottom left
				if self.envy_state[2] != 0 and self.envy_state[4] != 0 and self.envy_state[9] != 0 and self.envy_state[10] != 0 and i in self.bottom_left_square:
					#self.edges[14] = player
					updated_squares[2] = player
					changed_squares[2] = player
				# bottom right
				if self.envy_state[3] != 0 and self.envy_state[5] != 0 and self.envy_state[10] != 0 and self.envy_state[11] != 0 and i in self.bottom_right_square:
					#self.edges[15] = player
					updated_squares[3] = player
					changed_squares[3] = player

				values_to_pass.append(self.get_hash(self.envy_state[:12] + updated_squares))

				# 0 indicates that this value should be replaced with an actually state value
				values_to_return.append(0)

				# reset state after calculating has value
				self.envy_state[i] = 0

				# reset the square value if necessary
				for j in range(len(changed_squares)):
					if changed_squares[j] == player:
						self.envy_state[12 + j] = 0
			else:
				# -1 indicates that this value should not be replaced with an actual value
				values_to_return.append(-1)

		hash_code_list = get_hash_values_and_by_hash_codes(values_to_pass, self.environment_id, self.envy_id)

		for hv in hash_code_list:
			for k in range(12):
				if values_to_return[k] == 0:
					values_to_return[k] = hv
					break

		return values_to_return


		raise Exception('Edge already chosen')

	# gets the current state based on the hash and the value stored
	def create_state_hash_and_values(self, see_first_states = False):
		print("HERHEHEHEHE\n\n\n\n\n\n")
		self.hash_to_values_and_state = {}
		count = 0

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

																		# get the hash for the key
																		hash_key = self.get_hash(state_info)

																		# calculate the value for the state
																		value = self.calculate_values(state_info)

																		# save the hash code, value, and the state information
																		self.hash_to_values_and_state[hash_key] = (value, state_info)

																		# if there are enough hash to values and states, then can place in the database
																		if len(self.hash_to_values_and_state) == 900:
																			if see_first_states == True:
																				return self.hash_to_values_and_state
																			if self.writeToDB == True:
																				print(count)
																				count += 1
																				# hash_to_values_and_state is ready to be put in the database and then clear the local dictionary - local caching mechanism
																				set_hash_value(self.hash_to_values_and_state, self.environment_id, self.envy_id)
																				self.hash_to_values_and_state = {}

		# at the end of the loop when the states have all been already generated - need to say that it needs to have the different values in the db
		if len(self.hash_to_values_and_state) > 0 and self.writeToDB == True:
			set_hash_value(self.hash_to_values_and_state, self.environment_id, self.envy_id)
			self.hash_to_values_and_state = {}

# m = Envy(areas=[0.05, 0.45, 0.4, 0.1], writeToDB = False)
# (state_val) = m.ternary(29513241)
# print(m.get_hash([0, 0, 0, 0, 2, 1, 2, 0, 1, 2, 1, 1, 1, 0, 0, 2]))
# print("VALES", state_val)
# #m.create_state_hash_and_values()

# print("STATE P1", m.get_state_value(1, m.get_hash([0, 0, 0, 0, 2, 1, 2, 0, 1, 2, 1, 1, 1, 0, 0, 2]))) 
# print("STATEE 1!!", m.calculate_values([0, 0, 0, 0, 2, 1, 2, 0, 1, 2, 1, 1, 1, 0, 0, 2]))
# print("STATEE 2!!", m.calculate_values([2, 0,  1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 2, 0, 0, 0]))

# print("STATE P2", m.get_state_value(2, m.get_hash([1,0,2,1,1,1,2,1,1,1,1,1,1,0,1,1]))) 
