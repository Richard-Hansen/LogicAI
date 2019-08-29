/* This is a test route, should never be used in production */

/* define this file as part of the pacakge `routes` */
package routes

import (
	"fmt"
	http "net/http"
	"strings"
)

/**
 * Notice the name of the function is uppercase, this means we are exporting
 * `FooHandler` to anyone that imports the routes package.
 */
func FooHandler(w http.ResponseWriter, r *http.Request) {
	/* Print to stdout */
	fmt.Println("Start FooHandler")
	/* defer will run the line at the very end of the scope (i.e the function) */
	defer fmt.Println("End FooHandler")
	/* The short way to define varibles, message will take the type of whatever rvalue is  */
	message := r.URL.Path
	message = strings.TrimPrefix(message, "/")
	message = "Hello " + message
	w.Write([]byte(message))

	/* How to call functions with more then one return type */
	sum, prod := learnMultiple(3, 6)
	fmt.Println("sum:", sum, "prod:", prod)

	/* Go also can do imaginary numbers! (dont see why we need this though) */
	_ = 3 + 4i

	/* Other datatypes */
	var _ uint = 7
	var _ float32 = 22. / 7
  var _ string = "Hello"

  /* Arrays */
  var _ [4]int
  _ = [...]int{3, 1, 5, 10, 100}

  /* `malloc` for go */
  _ = make([]int, 4)

  /* How to append arrays to eachother */
  s := []int{1, 2, 3}
  s = append(s, 4, 5, 6)
  fmt.Println(s)

  /* Multiple definitions */
  _, _, _, _ = 1,2,3,"what"

  /* If statments */
  if 5 < 6 {
    fmt.Println("Stuff")
  }
  /* Branches, like asm */
  goto love
love:

  /* For loops */
  for i := 1;  i<=5; i++ {
          fmt.Printf("Welcome %d times\n",i)
  }
}

/* Lower case function, this will not be exported */
func learnMultiple(x, y int) (sum, prod int) {
	return x + y, x * y
}
