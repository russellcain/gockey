package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/mock"
)

type PlayersMock struct {
	mock.Mock
}

func TestGetPlayers(t *testing.T) {
	t.Run("Fetch All (Success)", func(t *testing.T) {
		// setup
		req, _ := http.NewRequest("", "", nil)
		w := httptest.NewRecorder()

		players := &PlayersMock{}
		players.On("")
	})
}
