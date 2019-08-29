/**
 * Go does not use classes, instead they use packages. Packages will group
 * all our code together. `package main` is a special package that will form
 * a executable when compiled
 */
package main

/**
 * Here is how you import different packages in Go. You CANNOT import something
 * and not use it, this will cause a compile time error. "fmt" stands for format,
 * this is going to be your basic printf, println and simlar.
 */
import (
	"fmt"
	http "net/http"
	"routes"
	"strconv"
)

/**
 * If you define a variable with a lowercase first letter, the variable is private.
 * If you define a variable with a uppercase first letter, the varaible is global.
 */
var port int = 8080

/**
 * As usual, main is going to be where your program starts. Only `package main`
 * can contain a main. This should be very familiar
 */
func main() {
	/* How to print to stdout */
	fmt.Printf("Main starting\n")
	/* This is how you call functions in Go */
	serve()
}

func serve() {
	/* This is how you create routes. Once localhost:8080/foo gets call http will route the
	   request to the `routes.FooHandler` */
	http.HandleFunc("/foo", routes.FooHandler)

	/* @TODO */
	http.HandleFunc("/move", routes.MoveHandler)

	/* Default route, should send to game (i.e index.html) */
	http.Handle("/", http.FileServer(http.Dir("./Fractal-AI-Game/game/")))

	/* Adding a `:` to the port number. */
	portSyntex := ":" + strconv.Itoa(port)
	fmt.Printf("Server running on %s\n", portSyntex)
	
	/* `_` is a throwaway varible, it means I don't care about the response of
		 `http.ListenAndServe`. */
	_ = http.ListenAndServe(portSyntex, nil)
}
