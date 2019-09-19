/* define this file as part of the pacakge `routes` */
package routes

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

	/* Reading the body of the request, r */
	reqBody, _ := ioutil.ReadAll(r.Body)

	/* Marshal data into a the struct from above */
	_ = json.Unmarshal(reqBody, &mapData)
	
	/* Printing what we got! */
	fmt.Println(mapData)
	/* Forming a response */
	fmt.Fprintf(w, "Hello, you called %q, %s", html.EscapeString(r.URL.Path), &reqBody)
}
