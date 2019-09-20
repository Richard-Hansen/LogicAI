/* define this file as part of the pacakge `routes` */
package routes

import (
	"C"
	"fmt"
	"html"
	"io/ioutil"
	http "net/http"
)
import (
	"database/sql"
	"encoding/json"
)

/*
AuthHandler takes a username and a userid and updates the user's name
*/
func AuthHandler(w http.ResponseWriter, r *http.Request) {
	/* Print to stdout */
	fmt.Println("Start AuthHandler")
	/* defer will run the line at the very end of the scope (i.e the function) */
	defer fmt.Println("End AuthHandler")
	/* Reading the body of the request, r */
	reqBody, _ := ioutil.ReadAll(r.Body)
	in := []byte(reqBody)
	var raw map[string]interface{}
	json.Unmarshal(in, &raw)
	db, err := sql.Open("mysql", "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic")
	defer db.Close()
	if err != nil {
		panic(err.Error())
	}
	stmt, serr := db.Prepare("INSERT user SET userid=?,username=? ON DUPLICATE KEY UPDATE username=?")
	if serr != nil {
		panic(serr.Error())
	}
	res, rerr := stmt.Exec(raw["user"], raw["username"], raw["username"])
	if rerr != nil {
		// panic(rerr.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Something bad happened!"))
		fmt.Fprintf(w, rerr.Error())
		return
	}
	fmt.Println(res)

	/* Forming a response */
	fmt.Fprintf(w, "Hello, you called %q, %s", html.EscapeString(r.URL.Path), &reqBody)
}
