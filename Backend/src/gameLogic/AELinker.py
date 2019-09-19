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

# have an agent with its agentlings connected to the environment
# when the game is getting played
