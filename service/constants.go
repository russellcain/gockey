package service

type PlayerNotFoundErr struct{}

func (m *PlayerNotFoundErr) Error() string {
	return "Player Not Found"
}
