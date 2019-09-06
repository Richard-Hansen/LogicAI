package routes

import (
	"bytes"
	"encoding/json"
	http "net/http"
	httptest "net/http/httptest"
	"testing"
)

type MoveData struct {
	X1 int
	Y1 int
	X2 int
	Y2 int
}

/**
* Test Type: Verfication Test
* What is it testing: Sends a move request from (1,1) to (1,2)
* Expected output: I expect a "valid" response, no error.
 */
func TestPOSTMove(t *testing.T) {
	t.Run("Post To Foo", func(t *testing.T) {
		moveData := &MoveData{
			X1: 1,
			Y1: 1,
			X2: 1,
			Y2: 2,
		}
		jsonMoveData, _ := json.Marshal(moveData)

		request, _ := http.NewRequest("POST", "/move", bytes.NewBuffer(jsonMoveData))

		response := httptest.NewRecorder()

		MoveHandler(response, request)

		got := response.Body.String()
		want := "Hello, you called \"/move\", &{\"X1\":1,\"Y1\":1,\"X2\":1,\"Y2\":2}"

		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})
}
