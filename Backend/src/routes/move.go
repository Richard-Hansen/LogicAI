/* define this file as part of the pacakge `routes` */
package routes

// package main

import (
	"C"
	"database/sql"
	"encoding/json"
	"fmt"
	// "html"
	_ "github.com/go-sql-driver/mysql"
	"io/ioutil"
	"math"
	"math/rand"
	http "net/http"
)

/* Everything is going to be put into these two 2d int arrays. */
type MoveDataType struct {
	EdgesSquare [][]int `json: "edgesSquare"`
	OwnerSquare [][]int `json: "ownerSquare"`
}

var p1 int         //player id
var difficulty int //difficulty of game
var eps float64    //randomization factor related to difficulty

/**
 * Should be called when the play makes a move.
 */
func MoveHandler(w http.ResponseWriter, r *http.Request) {
	/* Print to stdout */
	fmt.Println("Start MoveHandler")
	/* defer will run the line at the very end of the scope (i.e the function) */
	defer fmt.Println("End MoveHandler")

	/* Making an empty struct object */
	mapData := MoveDataType{}

	//Reading the body of the request, r
	reqBody, _ := ioutil.ReadAll(r.Body)

	/* Marshal data into a the struct from above */
	_ = json.Unmarshal(reqBody, &mapData)

	// fmt.Println(TakeAction(mapData))

	/* Printing what we got! */
	fmt.Println(mapData)
	/* Forming a response */
	actionChosen := TakeAction(mapData)
	fmt.Fprintf(w, "%s", actionChosen)
}

func CheckAction(edgeChosen int) bool {
	if edgeChosen >= 0 && edgeChosen < 40 {
		return true
	}
	return false
}

func check_difficulty() int {
	if difficulty == 0 {
		difficulty = 1
	}
	return difficulty
}

func set_difficulty(diff int) {
	if diff > 0 && diff < 5 {
		difficulty = diff
	} else {
		difficulty = 1
	}

	eps = 1 - (0.2 * float64(difficulty))
}

func TakeAction(mapData MoveDataType) string {
	p1 = 1

	if difficulty == 0 {
		set_difficulty(1)
	}
	/*maps a pair a vertices to an edge on the 4x4 board.*/
	vertices_to_edges := map[[2]int]int{
		[2]int{0, 5}:   0,
		[2]int{5, 10}:  1,
		[2]int{10, 15}: 2,
		[2]int{15, 20}: 3,
		[2]int{1, 6}:   4,
		[2]int{6, 11}:  5,
		[2]int{11, 16}: 6,
		[2]int{16, 21}: 7,
		[2]int{2, 7}:   8,
		[2]int{7, 12}:  9,
		[2]int{12, 17}: 10,
		[2]int{17, 22}: 11,
		[2]int{3, 8}:   12,
		[2]int{8, 13}:  13,
		[2]int{13, 18}: 14,
		[2]int{18, 23}: 15,
		[2]int{4, 9}:   16,
		[2]int{9, 14}:  17,
		[2]int{14, 19}: 18,
		[2]int{19, 24}: 19,
		[2]int{0, 1}:   20,
		[2]int{5, 6}:   21,
		[2]int{10, 11}: 22,
		[2]int{15, 16}: 23,
		[2]int{20, 21}: 24,
		[2]int{1, 2}:   25,
		[2]int{6, 7}:   26,
		[2]int{11, 12}: 27,
		[2]int{16, 17}: 28,
		[2]int{21, 22}: 29,
		[2]int{2, 3}:   30,
		[2]int{7, 8}:   31,
		[2]int{12, 13}: 32,
		[2]int{17, 18}: 33,
		[2]int{22, 23}: 34,
		[2]int{3, 4}:   35,
		[2]int{8, 9}:   36,
		[2]int{13, 14}: 37,
		[2]int{18, 19}: 38,
		[2]int{23, 24}: 39,
	}

	/* maps all vertices into the big_board_edges array, the index in the array corresponds to which player owns the edge */
	var big_board_edges [40]int
	edges := mapData.EdgesSquare
	for i := 0; i < len(edges); i++ {
		ind := vertices_to_edges[[2]int{edges[i][0], edges[i][1]}]
		big_board_edges[ind] = edges[i][2]
	}

	/* maps all squares taken into the array big_board_squares, the index in the array corresponds to which palyer owns the square*/
	var big_board_squares [16]int
	squares := mapData.OwnerSquare
	for i := 0; i < len(squares); i++ {
		big_board_squares[squares[i][0]] = squares[i][1]
	}

	/* Maps edges from the big_board_edges to the [[a,e],..], where 'a' is the agentling and 'e' is the edge on the 2x2 for the agentling*/
	big_to_tiny_edges := map[int][][]int{
		0:  [][]int{{0, 0}},
		1:  [][]int{{0, 1}, {1, 0}},
		2:  [][]int{{1, 1}, {2, 0}},
		3:  [][]int{{2, 1}},
		4:  [][]int{{0, 2}, {3, 0}},
		5:  [][]int{{0, 3}, {1, 2}, {3, 1}, {4, 0}},
		6:  [][]int{{1, 3}, {2, 2}, {4, 1}, {5, 0}},
		7:  [][]int{{2, 3}, {5, 1}},
		8:  [][]int{{0, 4}, {3, 2}, {6, 0}},
		9:  [][]int{{0, 5}, {1, 4}, {3, 3}, {4, 2}, {6, 1}, {7, 0}},
		10: [][]int{{1, 5}, {2, 4}, {4, 3}, {5, 2}, {7, 1}, {8, 0}},
		11: [][]int{{2, 5}, {5, 3}, {8, 1}},
		12: [][]int{{3, 4}, {6, 2}},
		13: [][]int{{3, 5}, {4, 4}, {6, 3}, {7, 2}},
		14: [][]int{{4, 5}, {5, 4}, {7, 3}, {8, 2}},
		15: [][]int{{5, 5}, {8, 3}},
		16: [][]int{{6, 4}},
		17: [][]int{{6, 5}, {7, 4}},
		18: [][]int{{7, 5}, {8, 4}},
		19: [][]int{{8, 5}},
		20: [][]int{{0, 6}},
		21: [][]int{{0, 7}, {1, 6}},
		22: [][]int{{0, 8}, {1, 7}, {2, 6}},
		23: [][]int{{1, 8}, {2, 7}},
		24: [][]int{{2, 8}},
		25: [][]int{{0, 9}, {3, 6}},
		26: [][]int{{0, 10}, {1, 9}, {3, 7}, {4, 6}},
		27: [][]int{{0, 11}, {1, 10}, {2, 9}, {3, 8}, {4, 7}, {5, 6}},
		28: [][]int{{1, 11}, {2, 10}, {4, 8}, {5, 7}},
		29: [][]int{{2, 11}, {5, 8}},
		30: [][]int{{3, 9}, {6, 6}},
		31: [][]int{{3, 10}, {4, 9}, {6, 7}, {7, 6}},
		32: [][]int{{3, 11}, {4, 10}, {5, 9}, {6, 8}, {7, 7}, {8, 6}},
		33: [][]int{{4, 11}, {5, 10}, {7, 8}, {8, 7}},
		34: [][]int{{5, 11}, {8, 8}},
		35: [][]int{{6, 9}},
		36: [][]int{{6, 10}, {7, 9}},
		37: [][]int{{6, 11}, {7, 10}, {8, 9}},
		38: [][]int{{7, 11}, {8, 10}},
		39: [][]int{{8, 11}},
	}

	/* Calculate all 9 2x2 environments for the agentlings*/
	var tiny_envys [9][16]int
	for i := 0; i < 40; i++ {
		for j := 0; j < len(big_to_tiny_edges[i]); j++ {
			agentling := big_to_tiny_edges[i][j][0]
			agentling_edge := big_to_tiny_edges[i][j][1]
			tiny_envys[agentling][agentling_edge] = big_board_edges[i]
		}
	}

	/* Maps squares from the big_board_edges to the [[a,s],..], where 'a' is the agentling and 's' is the square on the 2x2 for the agentling*/
	big_to_tiny_squares := map[int][][]int{
		0:  [][]int{{0, 0}},
		1:  [][]int{{0, 2}, {3, 0}},
		2:  [][]int{{3, 2}, {6, 0}},
		3:  [][]int{{6, 2}},
		4:  [][]int{{0, 1}, {1, 0}},
		5:  [][]int{{0, 3}, {1, 2}, {3, 1}, {4, 0}},
		6:  [][]int{{3, 3}, {4, 2}, {6, 1}, {7, 0}},
		7:  [][]int{{6, 3}, {7, 2}},
		8:  [][]int{{1, 1}, {2, 0}},
		9:  [][]int{{1, 3}, {2, 2}, {4, 1}, {5, 0}},
		10: [][]int{{4, 3}, {5, 2}, {7, 1}, {8, 0}},
		11: [][]int{{7, 3}, {8, 2}},
		12: [][]int{{2, 1}},
		13: [][]int{{2, 3}, {5, 1}},
		14: [][]int{{5, 3}, {8, 1}},
		15: [][]int{{8, 3}},
	}

	/* Fills the tiny_envys array with the owner of each of the squares that are on the big board */
	for i := 0; i < 16; i++ {
		for j := 0; j < len(big_to_tiny_squares[i]); j++ {
			agentling := big_to_tiny_squares[i][j][0]
			agentling_square := big_to_tiny_squares[i][j][1]
			tiny_envys[agentling][12+agentling_square] = big_board_squares[i]
		}
	}
	ret := calc_action(tiny_envys, eps)
	rett := fmt.Sprintf("%d %d", ret[0], ret[1])
	_ = rett

	return rett
}

// hash the value for the state for the database
func HashCode(stateInfo [16]int) string {
	h := 0
	var k float64 //Needs to be float64.
	// reverse and change the info for the state
	for i := len(stateInfo) - 1; i >= 0; i-- {
		/**
		 * math.Pow returns a float64. Float 64's cannot be * to int's.
		 * So we can either cast the math.Pow to an int, or cast stateInfo to a float64
		 */
		h = h + (int(math.Pow(3, k)) * stateInfo[i])
		k += 1
	}
	return fmt.Sprintf("%d", int(h))
}

// get the value of the hash from the database
func GetValue(stateInfos [][]int, n int) []int {

	// has all the hash codes for the values that we need to find
	hashCodes := ""
	// has all the values for each of the hash codes from the database
	var values [12] int

	// gets the number for the number of rows
	for i := 0; i < 12; i++ {
		// gets the value for each of the arrays
		stateInfo := stateInfos[i]

		// continue when it is not a valid state info
		if stateInfo[0] == -1 {
			values[i] = -1
			continue
		}

		hashCode := HashCode(stateInfo)
		if i == 0 {
			hashCodes = hashCode
		} else {
			hashCodes = hashCodes + "," + hashCode
		} 
		values[i] = -2
	}

	// make the call to the database
	db, err := sql.Open("mysql", "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic")
	defer db.Close()

	// unable to open the database
	if err != nil {
		panic(err.Error())
	}

	selectStatement := `SELECT Value FROM hashes WHERE HashCode = ` + hashCodes + ';'
	rows, errs := db.Query(selectStatement)
	defer rows.Close()

	count := 0

	for rows.Next() {
		var i int
		errs = rows.Scan(&i)
		if errs != nil {
			panic(err)
		}
		while values[count] == -1 {
			count += 1
		}
		values[count] = i
		count += 1
	}
	
	return values

	// // make the call to the database
	// db, err := sql.Open("mysql", "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic")
	// defer db.Close()

	// if err != nil {
	// 	panic(err.Error())
	// }
	// selectStatement := `SELECT Value FROM hashes WHERE HashCode = ` + hashCode + " LIMIT 1;"
	// rows, errs := db.Query(selectStatement)
	// defer rows.Close()

	// for rows.Next() {
	// 	var i int
	// 	errs = rows.Scan(&i)
	// 	if errs != nil {
	// 		panic(err)
	// 	}
	// 	return i
	// }
	// return 0
}

func Get_action_list(curr_state [16]int) [12]int {
	var action_list [12]int

	for i := 0; i < 12; i++ {
		action_list[i] = -1
	}

	for i := 0; i < 12; i++ {
		if curr_state[i] == 0 {
			action_list[i] = get_edge_value_runner(curr_state, i)
		}
	}

	return action_list
}

func get_edge_value_runner(curr_state [16]int, edge int) int {
	//set array as if I had chosen the edge
	curr_state[edge] = p1

	top_left_square := [4]int{0, 2, 6, 7}
	top_right_square := [4]int{1, 3, 7, 8}
	bottom_left_square := [4]int{2, 4, 9, 10}
	bottom_right_square := [4]int{3, 5, 10, 11}

	if curr_state[0] != 0 && curr_state[2] != 0 && curr_state[6] != 0 && curr_state[7] != 0 && check_if_in_list(top_left_square, edge) {
		curr_state[12] = p1
	}

	if curr_state[1] != 0 && curr_state[3] != 0 && curr_state[7] != 0 && curr_state[8] != 0 && check_if_in_list(top_right_square, edge) {
		curr_state[13] = p1
	}

	if curr_state[2] != 0 && curr_state[4] != 0 && curr_state[9] != 0 && curr_state[10] != 0 && check_if_in_list(bottom_left_square, edge) {
		curr_state[14] = p1
	}

	if curr_state[3] != 0 && curr_state[5] != 0 && curr_state[10] != 0 && curr_state[11] != 0 && check_if_in_list(bottom_right_square, edge) {
		curr_state[15] = p1
	}
	return GetValue(curr_state)
}

func check_if_in_list(list [4]int, v int) bool {
	for i := 0; i < 4; i++ {
		if list[i] == v {
			return true
		}
	}
	return false
}

func calc_action(tiny_envys [9][16]int, eps float64) [2]int {
	var big_board_sums [40]int
	var big_board_counts [40]int

	tiny_to_big := map[int][]int{
		0: {0, 1, 4, 5, 8, 9, 20, 21, 22, 25, 26, 27},
		1: {1, 2, 5, 6, 9, 10, 21, 22, 23, 26, 27, 28},
		2: {2, 3, 6, 7, 10, 11, 22, 23, 24, 27, 28, 29},
		3: {4, 5, 8, 9, 12, 13, 25, 26, 27, 30, 31, 32},
		4: {5, 6, 9, 10, 13, 14, 26, 27, 28, 31, 32, 33},
		5: {6, 7, 10, 11, 14, 15, 27, 28, 29, 32, 33, 34},
		6: {8, 9, 12, 13, 16, 17, 30, 31, 32, 35, 36, 37},
		7: {9, 10, 13, 14, 17, 18, 31, 32, 33, 36, 37, 38},
		8: {10, 11, 14, 15, 18, 19, 32, 33, 34, 37, 38, 39},
	}

	// 'a' represents the agentling index
	for a := 0; a < 9; a++ {
		// contains all the values
		tiny_board_values := Get_action_list(tiny_envys[a])

		for j := 0; j < 12; j++ {
			// if edge not avaliable, skip
			if tiny_board_values[j] == -1 {
				continue
			}

			// 1 find corresponding edge in big board
			big_board_label := tiny_to_big[a][j]

			// update the sum of the values and the count of the number of values contributing to the sum
			big_board_sums[big_board_label] += tiny_board_values[j]
			big_board_counts[big_board_label] += 1
		}
	}

	// find the max average value in the big board
	max_value := -1
	action := -1
	for k := 0; k < 40; k++ {
		// if there are no counts for the chosen edge, then the chosen edge cant be a valid option
		if big_board_counts[k] == 0 {
			continue
		}

		// calculate average value of taking edge k on the big board
		temp_value := (big_board_sums[k] * 1.00) / big_board_counts[k]

		// set max edge value, and the the corresponding edge choice
		if temp_value > max_value {
			max_value = temp_value
			action = k
		}
	}

	big_to_vertex := map[int][2]int{
		0:  {0, 5},
		1:  {5, 10},
		2:  {10, 15},
		3:  {15, 20},
		4:  {1, 6},
		5:  {6, 11},
		6:  {11, 16},
		7:  {16, 21},
		8:  {2, 7},
		9:  {7, 12},
		10: {12, 17},
		11: {17, 22},
		12: {3, 8},
		13: {8, 13},
		14: {13, 18},
		15: {18, 23},
		16: {4, 9},
		17: {9, 14},
		18: {14, 19},
		19: {19, 24},
		20: {0, 1},
		21: {5, 6},
		22: {10, 11},
		23: {15, 16},
		24: {20, 21},
		25: {1, 2},
		26: {6, 7},
		27: {11, 12},
		28: {16, 17},
		29: {21, 22},
		30: {2, 3},
		31: {7, 8},
		32: {12, 13},
		33: {17, 18},
		34: {22, 23},
		35: {3, 4},
		36: {8, 9},
		37: {13, 14},
		38: {18, 19},
		39: {23, 24},
	}

	// take random action chance
	if rand.Float64() < eps {
		for {
			guess_ind := rand.Intn(40)
			if big_board_counts[guess_ind] != 0 {
				return big_to_vertex[guess_ind]
			}
		}
	}

	if CheckAction(action) == true {
		return big_to_vertex[action]
	}
	return [...]int{-1, -1}
}

// func main() {
// 	curr_state := [...]int{1,0,1,0,0,0,2,2,0,0,0,0,1,0,0,0}

// 	recieved_actions := Get_action_list(curr_state)

// 	fmt.Println(recieved_actions)
// }
