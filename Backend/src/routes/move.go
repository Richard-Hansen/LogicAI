/* define this file as part of the pacakge `routes` */
package routes

import (
	"fmt"
	"html"
	// "io/ioutil"
	http "net/http"
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
	// reqBody, _ := ioutil.ReadAll(r.Body)

	// fmt.Printf("%s is type %T\n", reqBody, reqBody)

	/* Forming a response */
	fmt.Fprintf(w, "Hello, you called %q", html.EscapeString(r.URL.Path))
}
