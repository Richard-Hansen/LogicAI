class AgentX86:
	# X_'variablename' indicates that the variable is present in both the AgentX86 class and the Agentling class. 
	# Indicates this variable is for the AgentX86 class.
	def __init__(self, X_env, player, eps = 0.1, alpha = 0.5):
		self.X_env = X_env
		self.player = player # player id
		self.X_eps = eps # determines rate at which a random edge is chosed
		self.alpha = alpha # determines learning rate
		self.agentlings = self.__build_agentlings(self.X_env) # build agentlings on each section of the board

		#big board labels
		# * 0 *  1 *  2 *  3 *
		#20  21    22   23   24
		# * 4 *  5 *  6 *  7 *
		#25  26    27   28   29
		# * 8 *  9 * 10 * 11 *
		#30  31    32   33   34
		# * 12 * 13 * 14 * 15 *
		#35   36    37   38  39
		# * 16 * 17 * 18 * 19 *

		# tiny board labels
		# * 0 * 1 *
		# 6   7   8
		# * 2 * 3 *
		# 9  10   11
		# * 4 * 5 *

		#key represents the tiny environment associated with an agentling. The index of the list represents the 
		#label of the edge on the tiny board, and the integer at that index represents the corresponding edge label
		#of the big board
		self.tiny_to_big = {
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

		# k : [(a,e), (...)]. edge k in the big map corresponds to agentling 'a' on edge 'e'
		self.big_to_tiny = {
							0: [(0, 0)],
							1: [(0, 1), (1, 0)],
							2: [(1, 1), (2, 0)],
							3: [(2, 1)],
							4: [(0, 2), (3, 0)],
							5: [(0, 3), (1, 2), (3, 1), (4, 0)],
							6: [(1, 3), (2, 2), (4, 1), (5, 0)],
							7: [(2, 3), (5, 1)],
							8: [(0, 4), (3, 2), (6, 0)],
							9: [(0, 5), (1, 4), (3, 3), (4, 2), (6, 1), (7, 0)],
							10: [(1, 5), (2, 4), (4, 3), (5, 2), (7, 1), (8, 0)],
							11: [(2, 5), (5, 3), (8, 1)],
							12: [(3, 4), (6, 2)],
							13: [(3, 5), (4, 4), (6, 3), (7, 2)],
							14: [(4, 5), (5, 4), (7, 3), (8, 2)],
							15: [(5, 5), (8, 3)],
							16: [(6, 4)],
							17: [(6, 5), (7, 4)],
							18: [(7, 5), (8, 4)],
							19: [(8, 5)],
							20: [(0, 6)],
							21: [(0, 7), (1, 6)],
							22: [(0, 8), (1, 7), (2, 6)],
							23: [(1, 8), (2, 7)],
							24: [(2, 8)],
							25: [(0, 9), (3, 6)],
							26: [(0, 10), (1, 9), (3, 7), (4, 6)],
							27: [(0, 11), (1, 10), (2, 9), (3, 8), (4, 7), (5, 6)],
							28: [(1, 11), (2, 10), (4, 8), (5, 7)],
							29: [(2, 11), (5, 8)],
							30: [(3, 9), (6, 6)],
							31: [(3, 10), (4, 9), (6, 7), (7, 6)],
							32: [(3, 11), (4, 10), (5, 9), (6, 8), (7, 7), (8, 6)],
							33: [(4, 11), (5, 10), (7, 8), (8, 7)],
							34: [(5, 11), (8, 8)],
							35: [(6, 9)],
							36: [(6, 10), (7, 9)],
							37: [(6, 11), (7, 10), (8, 9)],
							38: [(7, 11), (8, 10)],
							39: [(8, 11)]
							}

	
	# creates 9 agentlings on each of their corresponding sections of the game board
	def __build_agentlings(self,X_env):
		if self.X_env == None:
			raise Exception()

		agentling_list = []
		for i in range(9):
			new_agentling = Agentling(self.player, self.X_env.get_envy(i), self.alpha)
			agentling_list.append(new_agentling)

		return agentling_list

	# return which edge to take for the agent's next move
	def take_action(self):
		big_board_sums = [0] * 40
		big_board_counts = [0] * 40

		# 'a' represents the agentling index
		for a in range(len(self.agentlings)):
			tiny_board_values = self.agentlings[a].get_action_list()
			#print("AGENTS: ", tiny_board_values)

			# 'j' represents the edge value index for the agentling
			for j in range(len(tiny_board_values)):

				# if the edge is not available to be chosen, skip this iteration
				if tiny_board_values[j] == -1:
					continue

				# find corresponding edge in big board
				big_board_label = self.tiny_to_big[a][j]

				# update the sum of the values and the count of the number of values contributing to the sum
				big_board_sums[big_board_label] += tiny_board_values[j]
				big_board_counts[big_board_label] += 1

		# find the max average value in the big board
		max_value = -1
		action = -1
		for k in range(40):

			# if there are no counts for the chosen edge, then the chosen edge cant be a valid option
			if big_board_counts[k] == 0:
				continue

			# calculate average value of taking edge k on the big board	
			temp_value = big_board_sums[k] / big_board_counts[k]

			# set max edge value, and the the corresponding edge choice
			if temp_value > max_value:
				max_value = temp_value
				action = k

		#return the mapping of the chosen big board edge in the form of the tiny board edge choices
		self.X_env.update_envys(self.player, self.big_to_tiny[action])

		#update the state history for each agentling who's state changed based on the above move
		for agent, edge in self.big_to_tiny[action]:
			self.agentlings[agent].update_state_history()

		return self.X_env.get_environment()


	# get the history associated with each of the states
	def get_state_histories(self):
		history_list = []
		for i in range(9):
			a = self.agentlings[i]

			history_list.append(a.state_history)

		return history_list

	# returns list of agentlings
	def get_agentlings(self):
		return self.agentlings


	# update the values of states for each agentling
	def update(self):
		# print("UPDATING")
		# dictionary of the updated values for a hash that need to be sent to the database
		value_list = []

		# for every agentling, we want to update it's values based off of the state history
		for i in range(9):

			# get current agentling
			a = self.agentlings[i]

			# create dictionary in the value list
			value_list.append({})

			if len(a.state_history) == 0:
				continue

			# get the reward for the final state (end of game state) of the game that was played
			reward = a.env.reward(a.player, a.state_history[len(a.state_history)-1])

			# get the current values for each hash code in the state_history list
			value_dictionary = a.env.get_values(a.state_history)

			# iterate over the reversed state history list, as we will update values through back propogation
			for prev in reversed(a.state_history):
				# calculate new value for prev state
				value = value_dictionary[prev] + a.alpha * (reward - value_dictionary[prev])

				# store value in dictionary
				value_list[i][prev] = value

			# reset the state_history of the agentling. This allows us to easily continue training
			a.reset_state_history()

		# list of dictionaries. Each index has a dictionary corresponding to the agentling at that idnex in self.agentlings.
		return value_list

#AgentX86 is made up of 9 agentlings. Each agentling will contribute it's value for all it's visible edges, depending on the current game state
class Agentling:
	def __init__(self, player, env, alpha):
		self.player = player # player id
		self.env = env # environment attached to an agent
		self.alpha = alpha # learning rate of the agent
		self.state_history = [] # all states this agent has participated in

	def get_action_list(self):
		unfilled_edges = self.env.get_unfilled_edges() # get all edges that are available 
		edge_values = [-1] * 12 #if an edge value is -1, that means that it is already taken, and not an option to choose again

		#fill list of edge values
		for e in unfilled_edges:
			edge_values[e] = 0

		return self.env.state_value_for_all_edges(self.player, edge_values)

	# appends state hash to end of state_history
	def update_state_history(self):
		# print("STATE HISTORY", self.state_history)
		self.state_history.append(self.env.get_hash())

	# reset state_history to an empty list
	def reset_state_history(self):
		# print("RESETTING")
		self.state_history = []
