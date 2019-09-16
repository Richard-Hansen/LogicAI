import warnings

class AgentX86:
	# X_'variablename' indicates that the variable is present in both the AgentX86 class and the Agentling class. 
	# Indicates this variable is for the AgentX86 class.
	def __init__(self, X_board_weights, eps = 0.1, alpha = 0.5):
		self.X_board_weights = X_board_weights #4x4 list containg weights
		self.X_eps = eps #determines rate at which a random edge is chosed
		self.X_alpha = alpha #determines learning rate
		self.agentlings = self.__build_agentlings() #build agentlings on each section of the board

	# creates 9 agentlings on each of their corresponding sections of the game board
	def __build_agentlings(self):
		agentling_list = []
		for i in range(3):
			for j in range(3):
				board_weights = [self.X_board_weights[i][j],self.X_board_weights[i][j+1],self.X_board_weights[i+1][j],self.X_board_weights[i+1][j+1]]
				new_agentling = Agentling(board_weights, self.X_alpha)
				agentling_list.append(new_agentling)

		return agentling_list

	def X_take_action(self):
		#for every edge

		#get agent attached to edge

		#get edge average value across 

class Agentling:
	def __init__(self, env, board_weights, alpha):
		self.state_history = [] # all states this agent has participated in
		self.env = env # current environment
		self.board_weights = board_weights # 2x2 matrix
		self.alpha = alpha # learning rate for this agent

	def get_action(self):
		state = env.get_state() # get hash for state
		unfilled_edges = env.get_unfilled_edges() # get all edges that are available 
		
		for e in unfilled_edges:
			score = env.edge_value(e)


		

test_board = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]]

agentX86 = AgentX86(test_board)

for v in agentX86.agentlings:
	print(v.board_weights)