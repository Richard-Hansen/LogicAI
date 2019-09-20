/* define this file as part of the pacakge `routes` */
package routes
//package main

import (
	"C"
	"encoding/json"
	"fmt"
	"html"
	"io/ioutil"
	http "net/http"
)

/* Everything is going to be put into these two 2d int arrays. */
type MoveDataType struct {
	EdgesSquare     [][]int      `json: "edgesSquare"`
	OwnerSquare     [][]int      `json: "ownerSquare"`
}

/**
 * Should be called when the play makes a move.
 */
func MoveHandler(w http.ResponseWriter, r *http.Request) {
	/* Print to stdout */
	fmt.Println("Start MoveHandler")
	/* defer will run the line at the very end of the scope (i.e the function) */
	defer fmt.Println("End MoveHandler")

	/* Making an empty struct object */
	mapData := MoveDataType{};

	//Reading the body of the request, r 
	reqBody, _ := ioutil.ReadAll(r.Body)

	/* Marshal data into a the struct from above */
	_ = json.Unmarshal(reqBody, &mapData)
	
	ftm.Println(TakeAction(mapData))

	/* Printing what we got! */
	fmt.Println(mapData)
	/* Forming a response */
	fmt.Fprintf(w, "Hello, you called %q, %s", html.EscapeString(r.URL.Path), &reqBody)

}

func TakeAction(mapData MoveDataType) [2]int {
	vertices_to_edges := map[[2]int]int {
		[2]int{0, 5}: 0,
		[2]int{5, 10}: 1,
		[2]int{10, 15}: 2,
		[2]int{15, 20}: 3,
		[2]int{1, 6}: 4,
		[2]int{6, 11}: 5,
		[2]int{11, 16}: 6,
		[2]int{16, 21}: 7,
		[2]int{2, 7}: 8,
		[2]int{7, 12}: 9,
		[2]int{12, 17}: 10,
		[2]int{17, 22}: 11,
		[2]int{3, 8}: 12,
		[2]int{8, 13}: 13,
		[2]int{13, 18}: 14,
		[2]int{18, 23}: 15,
		[2]int{4, 9}: 16,
		[2]int{9, 14}: 17,
		[2]int{14, 19}: 18,
		[2]int{19, 24}: 19,
		[2]int{0, 1}: 20,
		[2]int{5, 6}: 21,
		[2]int{10, 11}: 22,
		[2]int{15, 16}: 23,
		[2]int{20, 21}: 24,
		[2]int{1, 2}: 25,
		[2]int{6, 7}: 26,
		[2]int{11, 12}: 27,
		[2]int{16, 17}: 28,
		[2]int{21, 22}: 29,
		[2]int{2, 3}: 30,
		[2]int{7, 8}: 31,
		[2]int{12, 13}: 32,
		[2]int{17, 18}: 33,
		[2]int{22, 23}: 34,
		[2]int{3, 4}: 35,
		[2]int{8, 9}: 36,
		[2]int{13, 14}: 37,
		[2]int{18, 19}: 38,
		[2]int{23, 24}: 39
	}

	var big_board_edges [40]int
	edges := mapData[0]
	for i:=0; i < len(edges); i++ {
		ind = vertices_to_edges[[2]int{edges[i][0],edges[i][1]}]
		big_board_edges[ind] = edges[i][2]
	}

	var big_board_squares [16]int
	squares := mapData[1]
	for i:=0; i < len(squares); i++ {
		big_board_squares[squares[i][0]] = squares[i][1]
	}

	var tiny_envys [9][16]int
}


// hash the value for the state for the database
func HashCode(stateInfo [16]int) string {
	h = 0
	k = 0
	// reverse and change the info for the state
	for i:= len(stateInfo); i >= 0; i-- {
		h += (3 ** k) * state_info[i]
		k += 1
	}
	return fmt.Sprintf("%d", h)
}

// get the value of the hash from the database
func GetValue(stateInfo [16]int) int {
	hashCode = HashCode(stateInfo)

	// make the call to the database
	db, err := sql.Open("mysql", "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic")
	defer db.Close()

	if err != nil {
		panic(err.Error())
	}

	selectStatement := `SELECT Value FROM hashes WHERE HashCode = ` + hashCode + ";"
	ows, errs := db.Query(selectStatement)
	defer rows.Close()

	for rows.Next() {
		var i int
		errs = rows.Scan(&i)
		if errs != nil {
			panic(err)
		}
		return i
	}
}

// func main() {
// 	 vertices_to_edges := map[[2]int]int {
// 		[2]int{0, 5}: 0,
// 		[2]int{5, 10}: 1,
// 		[2]int{10, 15}: 2,
// 		[2]int{15, 20}: 3,
// 		[2]int{1, 6}: 4,
// 		[2]int{6, 11}: 5,
// 		[2]int{11, 16}: 6,
// 		[2]int{16, 21}: 7,
// 		[2]int{2, 7}: 8,
// 		[2]int{7, 12}: 9,
// 		[2]int{12, 17}: 10,
// 		[2]int{17, 22}: 11,
// 		[2]int{3, 8}: 12,
// 		[2]int{8, 13}: 13,
// 		[2]int{13, 18}: 14,
// 		[2]int{18, 23}: 15,
// 		[2]int{4, 9}: 16,
// 		[2]int{9, 14}: 17,
// 		[2]int{14, 19}: 18,
// 		[2]int{19, 24}: 19,
// 		[2]int{0, 1}: 20,
// 		[2]int{5, 6}: 21,
// 		[2]int{10, 11}: 22,
// 		[2]int{15, 16}: 23,
// 		[2]int{20, 21}: 24,
// 		[2]int{1, 2}: 25,
// 		[2]int{6, 7}: 26,
// 		[2]int{11, 12}: 27,
// 		[2]int{16, 17}: 28,
// 		[2]int{21, 22}: 29,
// 		[2]int{2, 3}: 30,
// 		[2]int{7, 8}: 31,
// 		[2]int{12, 13}: 32,
// 		[2]int{17, 18}: 33,
// 		[2]int{22, 23}: 34,
// 		[2]int{3, 4}: 35,
// 		[2]int{8, 9}: 36,
// 		[2]int{13, 14}: 37,
// 		[2]int{18, 19}: 38,
// 		[2]int{23, 24}: 39
// 		}

// 	fmt.Println(vertices_to_edges)
// }