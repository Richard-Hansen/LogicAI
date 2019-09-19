package routes

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
  http "net/http"
  // "os"
	// "math"
	// "strconv"
	// "strings"
)

type MapData struct {
	MapName     string      `json: "MapName"`
	Size        string      `json: "size"`
	Sizename    string      `json: "sizeName"`
	Vertices    [][]float64 `json: "vertices"`
	Connections string      `json: "connections"`
	Squares     string      `json: "squares"`
}

func SquareData(w http.ResponseWriter, r *http.Request) {
  fmt.Println("SquareData start")
  defer fmt.Println("SquareData end")
  /* Reading the body of the request, r */
	reqBody, _ := ioutil.ReadAll(r.Body)

	/* Marshal data into a map */
	var mapData map[string]interface{}
	json.Unmarshal(reqBody, &mapData)

	/* Open map json file */
  file, _ := ioutil.ReadFile("gameBoards/" + mapData["map"].(string) + ".json")
	_ = file

  data := MapData{}

  _ = json.Unmarshal([]byte(file), &data);

	/* Forming a response */
	fmt.Fprintf(w, "%s", data.Squares)
}