/* How to write tests. Run with `go test -bench=.` */
package routes

import (
	"testing"
)

/* Function tests. Just make sure the first word of test functions are `TestXxx` */
func TestLearnMultiple(t *testing.T) {
	sum, prod := learnMultiple(5, 8)
	if sum != 13 {
		t.Errorf("sum(5,8) = %d; want 13", sum)
	}
	if prod != 40 {
		t.Errorf("product(5,8) = %d; want 40", prod)
	}
}

/* Benchmark test */
func BenchmarkLearnMultiple(b *testing.B) {
	_, _ = learnMultiple(5, 8)
}
