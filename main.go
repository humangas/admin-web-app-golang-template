package main

import "github.com/labstack/echo"

func main() {
	e := echo.New()

	// Routing
	e.File("/", "assets/index.html")

	// Static files
	e.Static("/vendors", "assets/vendors")
	e.Static("/build", "assets/build")
	e.Static("/images", "assets/images")

	// Server
	e.Logger.Fatal(e.Start(":1323"))
}
