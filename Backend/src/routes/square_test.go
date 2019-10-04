package routes


import (
	"bytes"
	"encoding/json"
	http "net/http"
	httptest "net/http/httptest"
	"testing"
)

type mapeNumber struct {
	Mapname string
}

func TestSquareData(t *testing.T) {
	t.Run("Post To SquareData", func(t *testing.T) {
  	data := mapeNumber{}
  	data.Mapname = "Map1"
  	jsonMoveData, _ := json.Marshal(data)

  	request, _ := http.NewRequest("POST", "/squareData", bytes.NewBuffer(jsonMoveData))

  	response := httptest.NewRecorder()

  	SquareData(response, request)

  	got := response.Body.String()
  	want := " -1.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000"
  	if got != want {
  		t.Errorf("got %q, want %q", got, want)
  	}
	})
}
