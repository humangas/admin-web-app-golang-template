package main

import "github.com/labstack/echo"

func main() {
	e := echo.New()

	// Routing
	e.File("/", "assets/login.html")

	// Static files
	e.Static("/vendors", "assets/vendors")
	e.Static("/build", "assets/build")

	// Server
	e.Logger.Fatal(e.Start(":1313"))
}
