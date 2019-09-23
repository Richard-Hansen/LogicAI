package gameLogic

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"strconv"
	"strings"
)

/**
 * Here is where all the magic happens! We are laying out our MapData struct the same
 * way the json is layed out. As you can see, we even tell the struct what json values
 * to put where. This is important because once we read the map it will be places straight
 * into here! Very cool Golang :).
 */
type MapData struct {
	MapName     string      `json: "MapName"`
	Size        string      `json: "size"`
	Sizename    string      `json: "sizeName"`
	Vertices    [][]float64 `json: "vertices"`
	Connections string      `json: "connections"`
	Squares     string      `json: "squares"`
}

/* This is my makeshift vector. There is probably a better way but this will do. */
type Vertex struct {
	x float64
	y float64
}

func FindArea(mapName string) [16]float64 {
	/* This is the area array that will be returned at the end of the function */
	var area [16]float64

	/* Setting a area varible to 0.0 (aka a float64) */
	fullArea := 0.0

	/* Reading my gameBoard json file into the varible file */
	file, err := ioutil.ReadFile(mapName)

	if err != nil {
		area[0] = -1
		return area
	}
	fmt.Println(err)
	/* Creating an empty MapData object */
	data := MapData{}

	/**
	 * Here is a really neat trick that GoLang offers, we can read the json STRAIGHT
	 * into a struct that we made. In this case data, which is type MapData, will be
	 * the struct we read everything into. We do not care about the error Code.
	 */
	_ = json.Unmarshal([]byte(file), &data)

	/* This is a simple split of the data.Squares string. I am splitting it up by spaces
	because thats how they are in the json */
	splitSquares := strings.Split(data.Squares, " ")

	/**
	 * This loop will go by 4s, grabbing each square. We know that each of the squares
	 * can be split up by connecting a line from v1 to v4. Therefore, v1 v2 v4 make a trangle
	 * and v1 v3 v4 make the other triangle. From this we should be able to add the areas to find
	 * what % the box is of the game gameBoards
	 *
	 * First we need to find p.
	 * 				p = (a + b + c) / 2 where a,b,c are perimeter lengths
	 * Then we can use the Heron's Formula for the area of a triangle which is
	 * 				Area = sqrt(p(p-a)(p-b)(p-c))
	 */
	for i := 0; i < len(splitSquares); i += 1 {
		splitVertices := strings.Split(splitSquares[i], ",")

		/**
		 * Here I am placing the x and y cords into a custom struc names vertex.
		 * We are finding v1, v2, v3, v4.
		 *
		 * First We need to parseInt the strings inside splitVertices (because they strings),
		 * once we do this we can then use that for our index inside data.Vertices.
		 */
		indexInt, _ := strconv.ParseInt(splitVertices[0], 10, 64)
		v1 := Vertex{data.Vertices[indexInt][0], data.Vertices[indexInt][1]}

		indexInt, _ = strconv.ParseInt(splitVertices[1], 10, 64)
		v2 := Vertex{data.Vertices[indexInt][0], data.Vertices[indexInt][1]}

		indexInt, _ = strconv.ParseInt(splitVertices[2], 10, 64)
		v3 := Vertex{data.Vertices[indexInt][0], data.Vertices[indexInt][1]}

		indexInt, _ = strconv.ParseInt(splitVertices[3], 10, 64)
		v4 := Vertex{data.Vertices[indexInt][0], data.Vertices[indexInt][1]}

		/**
		 * First we are going to have to find the distance equation.
		 * 			dist = sqrt((x2 - x1)^2 + (y2 - y1)^2)
		 * Once this is done we will get the four side lengths.
		 *
		 * v1 - v2 = a
		 * v1 - v3 = b
		 * v2 - v4 = c
		 * v3 - v4 = d
		 * v1 - v4 = e (This is the distance that forms both the triangles)
		 */
		a := math.Sqrt(math.Pow(v1.x-v2.x, 2) + math.Pow(v1.y-v2.y, 2))
		b := math.Sqrt(math.Pow(v1.x-v3.x, 2) + math.Pow(v1.y-v3.y, 2))
		c := math.Sqrt(math.Pow(v2.x-v4.x, 2) + math.Pow(v2.y-v4.y, 2))
		d := math.Sqrt(math.Pow(v3.x-v4.x, 2) + math.Pow(v3.y-v4.y, 2))
		e := math.Sqrt(math.Pow(v1.x-v4.x, 2) + math.Pow(v1.y-v4.y, 2))

		/**
		 * So now we know our triangles are
		 * 					c
		 * 			a
		 * 					e
		 *
		 * and
		 *					d
		 *			b
		 *					e
		 * We can now find from the equation above. p = (a + b + c) / 2
		 */
		p1 := (a + c + e) / 2
		p2 := (b + d + e) / 2

		/**
		 * Now we can use the area function talked about above. We have a,b,c,d,e,p
		 * 			Area = sqrt(p(p-a)(p-b)(p-c))
		 */
		area1 := math.Sqrt(p1 * (p1 - a) * (p1 - c) * (p1 - e))
		area2 := math.Sqrt(p2 * (p2 - b) * (p2 - d) * (p2 - e))

		/* Adding both the triangles together to get the full area of the square */
		area[i] = ((area1 + area2) / 16)

		/* Adding my areas to the fullArea */
		fullArea += ((area1 + area2) / 16)
	}

	/* Return the [16]float64 arry that we created */
	return area
}
