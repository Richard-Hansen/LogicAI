from agents import AgentX86, Agentling
from environment import Environment, Envy


# set up the big agent and environment
# areas
a = [0.045625000000000006 0.07812499999999999 0.08125000000000002 0.11093750000000004 0.03875 0.08125000000000007 0.071875 0.03593750000000004 0.06124999999999997 0.08593749999999997 0.02656249999999999 0.046875000000000014 0.038750000000000014 0.090625 0.06562499999999999 0.04062500000000001]
areas = []
for i in range(0,4):
	areas.append(a[i],a[i+4],a[i+8],a[i+12])

# Environment
environment = Environment(areas)
environment.create_envy_states()

# Agent X86
agentX86 = AgentX86(environment)

def take_action(verticies):
	
	agentX86.X_take_action()

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
