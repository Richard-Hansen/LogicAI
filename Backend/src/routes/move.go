/* define this file as part of the pacakge `routes` */
package routes

import (
	"fmt"
	"html"
	"io/ioutil"
	http "net/http"
	"C"
	"encoding/json"
)

/**
 * Should be called when the play makes a move.
 */
func MoveHandler(w http.ResponseWriter, r *http.Request) {
	/* Print to stdout */
	fmt.Println("Start MoveHandler")
	/* defer will run the line at the very end of the scope (i.e the function) */
	defer fmt.Println("End MoveHandler")

	/* Reading the body of the request, r */
	reqBody, _ := ioutil.ReadAll(r.Body)

	/* Marshal data into a map */
	var moveData map[string]interface{}
	json.Unmarshal(reqBody, &moveData)

	/* Forming a response */
	fmt.Fprintf(w, "Hello, you called %q, %s", html.EscapeString(r.URL.Path), &reqBody)
}
