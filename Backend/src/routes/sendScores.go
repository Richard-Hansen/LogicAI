/* define this file as part of the pacakge `routes` */
package routes

import (
	"C"
	// "database/sql"
	"encoding/json"
	"fmt"
	// "html"
	// _ "github.com/go-sql-driver/mysql"
	"io/ioutil"
	// "math"
	// "math/rand"
	http "net/http"
)

/* Everything is going to be put into these two 2d int arrays. */
type SendScoreDataType struct {
	Time        int `json: "time"`
	ScorePlayer int `json: "scorePlayer"`
	ScoreAI     int `json: "scoreAI"`
}

/**
 * Should be called when the play makes a move.
 */
func SendScoreHandler(w http.ResponseWriter, r *http.Request) {
	// connectionString = "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic" // connection string to the db
	/* Print to stdout */
	fmt.Println("Start MoveHandler")
	/* defer will run the line at the very end of the scope (i.e the function) */
	defer fmt.Println("End MoveHandler")

	/* Making an empty struct object */
	scoreData := SendScoreDataType{}
	reqBody, _ := ioutil.ReadAll(r.Body)

	/* Marshal data into a the struct from above */
	_ = json.Unmarshal(reqBody, &scoreData)

	/* Printing what we got! */
	fmt.Println(scoreData)


	db, err := sql.Open("mysql", "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic")
	defer db.Close()
	if err != nil {
		panic(err.Error())
	}

	sqlStatement := `SELECT s.gameid,s.score,s.userid,(select username from user where userid=s.userid) as ` + "`name`" + `,s.difficult,s.board FROM game s ORDER BY score DESC`

	fmt.Fprintf(w, "%s", "Hello")
}
