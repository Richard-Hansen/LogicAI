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
	"database/sql"
)

/* Everything is going to be put into these two 2d int arrays. */
type SendScoreDataType struct {
	Time        int `json: "time"`
	ScorePlayer int `json: "scorePlayer"`
	ScoreAI     int `json: "scoreAI"`
	Difficulty  int `json: "difficulty"`
	MapName			int `json: "map"`
	UserID 			int `json: "userID"`
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
	if scoreData.Time < 60 {
		scoreData.Time = 60
	}

	var penalty float32 = (float32(scoreData.Difficulty)+1.0)/(4.0) * (60.0/float32(scoreData.Time))
	var totalScore float32 = float32(scoreData.ScorePlayer) * penalty
	db, err := sql.Open("mysql", "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic")
	defer db.Close()
	if err != nil {
		panic(err.Error())
	}
	stmt, serr := db.Prepare("INSERT game SET score=?,userid=?,difficult=?,board=?")
	if serr != nil {
		panic(serr.Error())
	}
	res, rerr := stmt.Exec(int(totalScore), scoreData.UserID, scoreData.Difficulty, scoreData.MapName)
	if rerr != nil {
		// panic(rerr.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Something bad happened!"))
		fmt.Fprintf(w, rerr.Error())
		return
	}
	/* Printing what we got! */
	fmt.Println(scoreData)
	fmt.Println(res)


	// db, err := sql.Open("mysql", "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic")
	// defer db.Close()
	// if err != nil {
	// 	panic(err.Error())
	// }
  //
	// sqlStatement := `SELECT s.gameid,s.score,s.userid,(select username from user where userid=s.userid) as ` + "`name`" + `,s.difficult,s.board FROM game s ORDER BY score DESC`

	fmt.Fprintf(w, "%s", "Hello")
}
