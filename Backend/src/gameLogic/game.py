class Game:
	def __init__(self, p1, p2):
		self.p1 = p1 # AgentX86/human object
		self.p2 = p2 # AgentX86/human object
		self.current_player = p2 # initialize current player to p2, so the first loop of play_game() sets p1 to the current player
		self.game_board = [0] * 40 # 4x4 game board is made up of 40 edges

	def play_game(self, update_after_game=False):
		#while game is not over
		while not self.game_ended():

			# set current player
			if self.current_player is self.p1:
				self.current_player = self.p2
			else:
				self.current_player = self.p1

			# current player takes an action
			self.game_board = self.current_player.take_action()
			print("Completed turn for player: ", self.current_player)

		#if update_after_game flag is set to True, update agent weights after each game ends
		if update_after_game:
			print("Updating agents")
			self.p1.update()
			self.p2.update()

	#returns True if game has ended
	def game_ended(self):
		return 0 not in self.game_board

