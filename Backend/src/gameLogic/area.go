package gameLogic

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	// "os"
	// http "net/http"
	"strings"
	"strconv"
)

type MapData struct {
	MapName  		string `json: "MapName"`
	Size     		string `json: "size"`
	Sizename 		string `json: "sizeName"`
	Vertices 		[][]float64  `json: "vertices"`
	Connections string `json: "connections"`
	Squares     string `json: "squares"`
}

type Vertex struct {
	x float64
	y float64
}

func FindArea(mapName string) [16]float64 {
	file, _ := ioutil.ReadFile("../../gameBoards/" + mapName + ".json")

	data := MapData{}

	_ = json.Unmarshal([]byte(file), &data)

	splitSquares := strings.Split(data.Squares, " ")

	for i := 0; i < len(splitSquares); i+=4 {
		splitVertices := strings.Split(splitSquares[i], ",")

		indexInt, _ := strconv.ParseInt(splitVertices[0], 10, 64)
		v1 := Vertex{data.Vertices[indexInt][0], data.Vertices[indexInt][1]}

		indexInt, _ = strconv.ParseInt(splitVertices[1], 10, 64)
		v2 := Vertex{data.Vertices[indexInt][0], data.Vertices[indexInt][1]}

		indexInt, _ = strconv.ParseInt(splitVertices[2], 10, 64)
		v3 := Vertex{data.Vertices[indexInt][0], data.Vertices[indexInt][1]}

		indexInt, _ = strconv.ParseInt(splitVertices[3], 10, 64)
		v4 := Vertex{data.Vertices[indexInt][0], data.Vertices[indexInt][1]}



		fmt.Printf("(%g, %g)\n", v1.x, v1.y)
		fmt.Printf("(%g, %g)\n", v2.x, v2.y)
		fmt.Printf("(%g, %g)\n", v3.x, v4.y)
		fmt.Printf("(%g, %g)\n", v4.x, v4.y)
	}

	var area [16]float64
	area[0] = 5
	return area
}

// func FindArea(mapName string) [16]float64 {
// 	fmt.Println("Find Area Start")
// 	/* Open map json file */
// 	mapJson, err := os.Open("../../gameBoards/" + mapName + ".json")
//
// 	/* Make sure we opened a real map */
// 	if err != nil {
// 		fmt.Println(err)
// 	}
//
// 	/* Close the file after scope ends */
// 	defer mapJson.Close()
//
// 	mapJsonInByteForm, _ := ioutil.ReadAll(mapJson)
//
// 	var mapDataJson map[string]interface{}
// 	json.Unmarshal(mapJsonInByteForm, &mapDataJson)
//
// 	fmt.Println(mapDataJson["vertices"])
//
// 	squareString := mapDataJson["squares"].(string)
//
// 	splitSquares := strings.Split(squareString, " ")
//
// 	for i := 0; i < len(splitSquares); i++ {
// 		splitVertices := strings.Split(splitSquares[i], ",")
// 		v1 := splitVertices[0]
// 		v2 := splitVertices[1]
// 		v3 := splitVertices[2]
// 		v4 := splitVertices[3]
// 		fmt.Println(v1 + " : " + v2 + " : " + v3 + " : " + v4)
// 	}
//
// 	var area [16]float64
// 	area[0] = 5
// 	return area
// }
