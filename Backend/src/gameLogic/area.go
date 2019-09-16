package gameLogic

import (
	"fmt"
  "encoding/json"
  "os"
  "io/ioutil"
	// http "net/http"
	// "strings"
)

func FindArea(mapName string) [16]float64 {
  fmt.Println("Find Area Start");
  /* Open map json file */
  mapJson, err := os.Open("gameBoards/" + mapName + ".json")

  /* Make sure we opened a real map */
  if err != nil {
    fmt.Println(err)
  }

  /* Close the file after scope ends */
  defer mapJson.Close()

  mapJsonInByteForm, _ := ioutil.ReadAll(mapJson)

  var mapDataJson map[string]interface{}
  json.Unmarshal(mapJsonInByteForm, &mapDataJson)

  fmt.Println(mapDataJson["squares"].(string))

  var area [16]float64;
  area[0] = 5;
  return area;
}
