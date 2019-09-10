package routes

import (
	"C"
	"encoding/json"
	"fmt"
	"io/ioutil"
	http "net/http"
	"os"
)

/**
 * Should be called when the play makes a move.
 */
func MapHandler(w http.ResponseWriter, r *http.Request) {
	/* Print to stdout */
	fmt.Println("Start MapHandler")
	/* defer will run the line at the very end of the scope (i.e the function) */
	defer fmt.Println("End MapHandler")

	/* Reading the body of the request, r */
	reqBody, _ := ioutil.ReadAll(r.Body)

	/* Marshal data into a map */
	var mapData map[string]interface{}
	json.Unmarshal(reqBody, &mapData)

	/* Open map file @TODO */
	mapJson, err := os.Open("gameBoards/" + mapData["map"].(string) + ".json")
	/* Make sure we opened a real map */
	if err != nil {
		fmt.Println(err)
	}
	/* Close the file after scope ends */
	defer mapJson.Close()

	/* Read Map data */
	mapJsonInByteForm, _ := ioutil.ReadAll(mapJson)

	var mapDataJson map[string]interface{}
	json.Unmarshal(mapJsonInByteForm, &mapDataJson)

	data := mapDataJson["MapName"].(string) + " "
	data += mapDataJson["size"].(string) + " "
	data += mapDataJson["sizeName"].(string) + " "
	data += fmt.Sprintf("%v", mapDataJson["vertices"]) + " "
	data += mapDataJson["connections"].(string)

	/* Forming a response */
	fmt.Fprintf(w, "%s", data)
}
