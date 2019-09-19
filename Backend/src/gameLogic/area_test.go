package gameLogic

import (
// http "net/http"
// httptest "net/http/httptest"
// "testing"
)

/* This will make sure that 0, 1, 2, 13, 14, 15 areas are correct for map1. */
// func TestFindAreaMap1(t *testing.T) {
// 	area := FindArea("Map1")
// 	if area[0] != 0.045625000000000006 {
// 		t.Errorf("FindArea(\"Map1\") = %g; want 0.045625000000000006", area)
// 	}
// 	if area[1] != 0.07812499999999999 {
// 		t.Errorf("FindArea(\"Map1\") = %g; want 0.07812499999999999", area)
// 	}
// 	if area[2] != 0.08125000000000002 {
// 		t.Errorf("FindArea(\"Map1\") = %g; want 0.08125000000000002", area)
// 	}
// 	if area[13] != 0.090625 {
// 		t.Errorf("FindArea(\"Map1\") = %g; want 0.090625", area)
// 	}
// 	if area[14] != 0.06562499999999999 {
// 		t.Errorf("FindArea(\"Map1\") = %g; want 0.06562499999999999", area)
// 	}
// 	if area[15] != 0.04062500000000001 {
// 		t.Errorf("FindArea(\"Map1\") = %g; want 0.04062500000000001", area)
// 	}
// }
//
// /* This test will make sure that when you add up the area it will equal 1. */
// func TestFindAreaMap1AreaEquals1(t *testing.T) {
// 	area := FindArea("Map1")
// 	areaPer := 0.0
// 	for i := 0; i < 16; i++ {
// 		areaPer += area[i]
// 	}
// 	if areaPer > 1+.05 || areaPer < 1-.05 {
// 		t.Errorf("FindArea(\"Map1\") = %g; want 1", areaPer)
// 	}
// }
