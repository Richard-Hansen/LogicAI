package gameLogic

import (
	// http "net/http"
	// httptest "net/http/httptest"
	"testing"
)

func TestFindAreaMap1(t *testing.T) {
	area := FindArea("Map1")
	if area[0] != 6 {
		t.Errorf("FindArea(\"Map1\") = %g; want 5", area)
	}

}
