/* define this file as part of the pacakge `routes` */
package routes

import (
	"C"
	"fmt"
	http "net/http"
)
import (
	"database/sql"
	"encoding/json"
)

type Game struct {
	GameID     int
	Score      int
	UserID     int
	Difficulty int
	Board      int
}

/*
ScoreHandler returns top 10 scores to the user, as well as the user's most recent score
*/
func ScoreHandler(w http.ResponseWriter, r *http.Request) {
	/* Print to stdout */
	fmt.Println("Start ScoreHandler")
	/* defer will run the line at the very end of the scope (i.e the function) */
	defer fmt.Println("End ScoreHandler")

	var games []*Game

	/* Reading the body of the request, r */

	db, err := sql.Open("mysql", "Richard:SteveIsTheBest@tcp(198.199.121.101:3306)/logic")
	defer db.Close()
	if err != nil {
		panic(err.Error())
	}
	sqlStatement := `SELECT * FROM game ORDER BY score LIMIT 10`
	rows, errs := db.Query(sqlStatement)
	defer rows.Close()
	for rows.Next() {
		g := new(Game)
		errs = rows.Scan(&g.GameID, &g.Score, &g.UserID, &g.Difficulty, &g.Board)
		if errs != nil {
			panic(err)
		}
		games = append(games, g)
	}

	if err := json.NewEncoder(w).Encode(games); err != nil {
		fmt.Println(err)
	}

	/* Forming a response */
	//fmt.Fprintf(w, "Hello, you called %q, %s", html.EscapeString(r.URL.Path), &reqBody)
}
