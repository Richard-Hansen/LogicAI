package MySQL

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

/* Build our database connection here */
func BuildConnection() {
	db, err := sql.Open("mysql", "SteveISTheBestUsername:MyVerySecurePassword@tcp(127.0.0.1:3306)/test")
	defer db.Close()
	if err != nil {
		panic(err.Error())
	}
}
