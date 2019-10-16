from agents import AgentX86, Agentling
from environment import Environment, Envy
from game import Game

class Linker:
	def __init__(self, areas, translate_areas=True):
		if len(areas) != 16:
			raise Exception("Invalid areas length, should be a list of 16 values")

		if sum(areas) != 1.0:
			raise Exception("Areas must sum to 1")

		if not self.area_vals(areas):
			raise Exception("All area values must be greater than 0")

		self.areas = areas

		if translate_areas:
			self.areas = self.translate_areas()

	def area_vals(self, a):
		for v in a:
			if v <= 0:
				return False

		return True
	# translate the provided list of areas in the Linker to a list that can be used by an environment and game
	def translate_areas(self):
		new_areas = []
		for i in range(0,4):
			new_areas.append(self.areas[i])
			new_areas.append(self.areas[i+4])
			new_areas.append(self.areas[i+8])
			new_areas.append(self.areas[i+12])

		return new_areas

	# train agents based on the provided number of epochs
	def train(self, epochs, verbose=False, writeToDB=False):
		if epochs < 1 or epochs > 10000:
			raise Exception("Epochs should be between 1 and 10,000 inclusive.")
		for i in range(epochs):
			# Environment - creates the environment and creates all the states for the environment
			environment = Environment(self.areas, writeToDB=writeToDB)
			if verbose:
				print("Environment created")

			# Agent X86 - creates the agent for the environment
			agentX86P1 = AgentX86(environment,1)
			agentX86P2 = AgentX86(environment,2)

			game = Game(agentX86P1, agentX86P2)
			
			if verbose:
				print("Starting Game ", i)

			game.play_game(update_after_game = True, verbose = verbose, get_state_histories_for_p1=True)

		print("Training for %d epochs completed" % (epochs))


	# # # does the mapping from an edge to the vertices for all the edges
	# def map_edge_and_vertex(self):
	# 	vertex_pair_to_edge = {}
	# 	for edge in edge_to_verticies:
	# 		vertex_pair_to_edge[edge_to_verticies[edge]] = edge

	# 	return vertex_pair_to_edge

# # maps each of the edges to its pair of corresponding vertices
# edge_to_vertices = {
# 	0: (0, 5),
# 	1: (5, 10),
# 	2: (10, 15),
# 	3: (15, 20),
# 	4: (1, 6),
# 	5: (6, 11),
# 	6: (11, 16),
# 	7: (16, 21),
# 	8: (2, 7),
# 	9: (7, 12),
# 	10: (12, 17),
# 	11: (17, 22),
# 	12: (3, 8),
# 	13: (8, 13),
# 	14: (13, 18),
# 	15: (18, 23),
# 	16: (4, 9),
# 	17: (9, 14),
# 	18: (14, 19),
# 	19: (19, 24),
# 	20: (0, 1),
# 	21: (5, 6),
# 	22: (10, 11),
# 	23: (15, 16),
# 	24: (20, 21),
# 	25: (1, 2),
# 	26: (6, 7),
# 	27: (11, 12),
# 	28: (16, 17),
# 	29: (21, 22),
# 	30: (2, 3),
# 	31: (7, 8),
# 	32: (12, 13),
# 	33: (17, 18),
# 	34: (22, 23),
# 	35: (3, 4),
# 	36: (8, 9),
# 	37: (13, 14),
# 	38: (18, 19),
# 	39: (23, 24)
# }

# # maps each vertex pair to an edge
# vertex_pair_to_edge = {(0, 5): 0, (5, 10): 1, (10, 15): 2, (15, 20): 3, (1, 6): 4, (6, 11): 5, (11, 16): 6, (16, 21): 7, (2, 7): 8, (7, 12): 9, (12, 17): 10, (17, 22): 11, (3, 8): 12, (8, 13): 13, (13, 18): 14, (18, 23): 15, (4, 9): 16, (9, 14): 17, (14, 19): 18, (19, 24): 19, (0, 1): 20, (5, 6): 21, (10, 11): 22, (15, 16): 23, (20, 21): 24, (1, 2): 25, (6, 7): 26, (11, 12): 27, (16, 17): 28, (21, 22): 29, (2, 3): 30, (7, 8): 31, (12, 13): 32, (17, 18): 33, (22, 23): 34, (3, 4): 35, (8, 9): 36, (13, 14): 37, (18, 19): 38, (23, 24): 39}

# set up the big agent and environment
# a = [0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625]
a = [0.045625, 0.038750, 0.061250, 0.038750, 0.078125, 0.081250, 0.085937, 0.090625, 0.081250, 0.071875, 0.026562, 0.065625, 0.110938, 0.035938, 0.046875, 0.040625]
L = Linker(a)
L.train(1,verbose=True, writeToDB=True)


# have an agent with its agentlings connected to the environment
# when the game is getting played for the reinforcement learning agents, the agents will play against each other
# create the state hash and values for each of the states and map them to specific values

# WHEN PLAYING AGAINST ANOTHER AGENT
# each agent alternatively makes the moves
# each agent will have its own value functions for each of the states
# keep track of the state histories for each of the agents
# update the values for each of the agents based on the state histories

# WHEN PLAYING AGAINST HUMAN
# in the game play logic, when it is the player's turn, they can pick a move, which gets updated in the environment
# after the player's move, the AI makes the move, which gets updated in the environment