
/* This will contain ALL metadata of a single vertice. */
function vertice(x, y) {
  /* These are the values stored in the json. all values will be between [0,5] in
     both this.x and this.y */
  this.x = x;
  this.y = y;
  /* Screen X cord. i.e 154.5 or some pixel value */
  this.screenX;
  /* Screen Y cord. i.e 254.6 or some pixel value */
  this.screenY;
  /* Contains all the connections that have no been clicked yet. This is stored
     as the index of the connection. i.e if you see '0' in this.connections, it means
     this vertice is connected to the 0 vertex */
  this.connections = [];
  /* Same format as this.connections but instead contains all the connections that HAVE
     been clicked */
  this.clickedConnections = [];
}
