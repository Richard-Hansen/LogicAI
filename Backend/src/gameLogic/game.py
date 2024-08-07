from callDatabases import put_values

class Game:
	def __init__(self, p1, p2, mapNum):
		if p1 == None or p2 == None:
			raise Exception("Invalid players passed, 1 or more are none")
		self.p1 = p1 # AgentX86/human object
		self.p2 = p2 # AgentX86/human object
		self.current_player = p2 # initialize current player to p2, so the first loop of play_game() sets p1 to the current player
		self.game_board = [0] * 40 # 4x4 game board is made up of 40 edges
		self.players = []
		self.mapNum = mapNum

	def play_game(self, update_after_game=False, get_state_histories_for_p1=False, print_board=False, verbose=False, get_players=False):
		#while game is not over
		if verbose:
			print("Playing game")

		while not self.game_ended():

			if verbose or print_board:
				self.print_board(self.current_player.X_env.big_board)

			# set current player
			if self.current_player is self.p1:
				self.current_player = self.p2
			else:
				self.current_player = self.p1

			if get_players == True:
				self.players.append(self.current_player)

			# current player takes an action
			self.game_board = self.current_player.take_action()
			#self.print_board(self.current_player.X_env.big_board)

		#if update_after_game flag is set to True, update agent weights after each game ends
		if update_after_game:
			# print("Updating agents")
			put_values(self.p1.update(),self.mapNum)
			put_values(self.p2.update(),self.mapNum)

		if get_state_histories_for_p1:
			return self.p1.get_state_histories()

	def get_players(self):
		return self.players
	
	#returns True if game has ended
	def game_ended(self):
		return 0 not in self.game_board

	def print_board(self, big_env):
		print("|-----------------------|")
		for i in range(4):
			c = 4*i
			v = 5*i
			print("  %d  %d  %d  %d  " % (big_env[c],big_env[c+1],big_env[c+2],big_env[c+3]))
			print("%d  %d  %d  %d  %d" % (big_env[v+20],big_env[v+21],big_env[v+22],big_env[v+23],big_env[v+24]))
		print("  %d  %d  %d  %d  " % (big_env[16],big_env[17],big_env[18],big_env[19]))
		print("|-----------------------|")
			


