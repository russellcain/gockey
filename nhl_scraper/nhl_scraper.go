package nhl_scraper

import (
	"fmt"
	"github.com/gockey/util"
	"io/ioutil"
	"net/http"
	"os"
)

func GetAPI() {
	response, err := http.Get("https://api.nhle.com/stats/rest/en/team")

	if err != nil {
		util.ErrorLog.Print(err.Error())
		os.Exit(1)
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		util.ErrorLog.Println(err)
		return
	}
	fmt.Println(string(responseData))
	util.InfoLog.Println(string(responseData))
}
