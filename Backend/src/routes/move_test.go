package routes

import (
	// "bytes"
	// "encoding/json"
	// httptest "net/http/httptest"
	// "database/sql"
	"testing"
)

type MoveData struct {
	X1 int
	Y1 int
	X2 int
	Y2 int
}

/**
* Test Type: Verfication Test
* What is it testing: Sends a move request from (1,1) to (1,2)
* Expected output: I expect a "valid" response, no error.
 */
// func TestPOSTMove(t *testing.T) {
// 	t.Run("Post To Foo", func(t *testing.T) {
// 		moveData := &MoveData{
// 			X1: 1,
// 			Y1: 1,
// 			X2: 1,
// 			Y2: 2,
// 		}
// 		jsonMoveData, _ := json.Marshal(moveData)

// 		request, _ := http.NewRequest("POST", "/move", bytes.NewBuffer(jsonMoveData))

// 		response := httptest.NewRecorder()

// 		MoveHandler(response, request)

// 		got := response.Body.String()
// 		want := "Hello, you called \"/move\", &{\"X1\":1,\"Y1\":1,\"X2\":1,\"Y2\":2}"

// 		if got != want {
// 			t.Errorf("got %q, want %q", got, want)
// 		}
// 	})
// }

/**
 * Test Type: Verification Test
 * What it is testing: Agent line selection
 * Expected output: I expect back a line choice to a space on the game board
 */
// func TestValidEdge(t *testing.T) {
// 	TakeAction()
// }

/**
 * Test Type: Equivalence Test
 # 87
 * What it is testing: Get all possible edges on board
 * Expected output: I expect the values for all the edges on the board
 */
func TestAllPossibleEdges(t *testing.T) {
	curr_state := [...]int{1, 1, 1, 2, 2, 0, 2, 2, 1, 2, 1, 0, 1, 0, 0, 0}

	recieved_actions := get_action_list(curr_state, 1)
	possible_edges := 0
	var edges_chosen [2]int

	for i := 0; i < 12; i++ {
		if recieved_actions[i] != -1 {
			edges_chosen[possible_edges] = i
			possible_edges += 1
		}
	}

	if possible_edges != 2 || edges_chosen[0] != 5 || edges_chosen[1] != 11 {
		t.Errorf("Recieved %d edges and possible edges, Expected 2", possible_edges)
	}
}

/**
 * Test Type: Boundary Test
 * 88
 * What it is testing: Does not send back the current edge as a possibility
 * Expected output: I expect the agent to send back another edge (not the current edge) back
 */
func TestExistingEdges(t *testing.T) {
	curr_state := [...]int{1, 1, 1, 2, 2, 0, 2, 2, 1, 2, 1, 0, 1, 0, 0, 0}

	recieved_actions := get_action_list(curr_state, 1)

	found_existing := false
	for i := 0; i < 12; i++ {
		if curr_state[i] > 0 && recieved_actions[i] != -1 {
			found_existing = true
		}
	}

	if found_existing == true {
		t.Errorf("Recieved the existing edge as a move, Expected new edge as move")
	}
}

/**
 * Test Type: Boundary Test
 * 89
 * What it is testing: Does not send back an inexistant edge
 * Expected output: I expect the agent to not send back an edge that does not exist
 */
func TestNonExistantEdges(t *testing.T) {
	edge_chosen := 41

	allowed_edge := CheckAction(edge_chosen)

	if allowed_edge == true {
		t.Errorf("Recieved the nonexisting edge as a move, Expected existing as move")
	}
}

// /**
//  * Test Type: Verification Test
//  * What it is testing: Sends that an edge is valid if it is valid edge
//  * Expected output: I expect the agent to send back the edge if it does exist
//  */
// func TestExistsEdge(t *testing.T) {
// 	edge_chosen := 5

// 	edge_exists := CheckAction(edge_chosen)

// 	if edge_exists == false {
// 		t.Errorf("Recieved that edge does not exist on board, Expected edge exists")
// 	}
// }

/**
 * Test Type: Verification Test
 * What it is testing: Check that difficulty changes the randomization factor eps
 * Expected output: I expect the agent to use a different eps for a different difficulty
 */
func TestAgentDifficulty(t *testing.T) {

	set_difficulty(1)
	d1 := check_difficulty()

	set_difficulty(2)
	d2 := check_difficulty()

	if d1 == d2 {
		t.Errorf("Difficulty not changing difficulty")
	}
}

/**
 * Test Type: Verification Test
 * What it is testing: Check that difficulty changes are kept
 * Expected output: I expect to only be using the most recent set difficulty
 */
func TestAgentCurrentDifficulty(t *testing.T) {

	set_difficulty(1)
	if check_difficulty() != 1 {
		t.Errorf("Difficulty not updating to 1")
	}

	set_difficulty(2)
	if check_difficulty() != 2 {
		t.Errorf("Difficulty not updating to 2")
	}

	set_difficulty(3)
	if check_difficulty() != 3 {
		t.Errorf("Difficulty not updating to 3")
	}

	set_difficulty(4)
	if check_difficulty() != 4 {
		t.Errorf("Difficulty not updating to 4")
	}
}

/**
 * Test Type: Verification Test
 * What it is testing: Check that difficulty cannot be set to an invalid input
 * Expected output: I expect the difficulty to be 1 if an invalid input is sent
 */
func TestValidDifficulty(t *testing.T) {

	set_difficulty(-10)
	d1 := check_difficulty()

	set_difficulty(10)
	d2 := check_difficulty()

	if d1 != 1 && d2 != 1 {
		t.Errorf("Difficulty incorrectly handling invalid inputs")
	}
}

/**
 * Test Type: Verification Test
 * What it is testing: Check that difficulty is 1 if not set previously set
 * Expected output: I expect the difficulty to be 1 set_difficulty is not called
 */
func TestNoDifficultySet(t *testing.T) {

	d1 := check_difficulty()

	if d1 != 1 {
		t.Errorf("Difficulty incorrectly handling invalid inputs")
	}
}
