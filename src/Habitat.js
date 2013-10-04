
var Habitat = function(){
  this.cells = {};
}

Habitat.SEPERATOR = ';'

Habitat.prototype.addCell = function(x, y) {
  this.cells[x + Habitat.SEPERATOR + y] = true;
  return true;
}

Habitat.prototype.addCells = function(cells) {
  for(var x=0,len=cells.length;x<len;x++){
    this.cells[cells[x].join(Habitat.SEPERATOR)] = true;
  }
}

Habitat.prototype.getCell = function(x, y) {
  return this.cells[x + Habitat.SEPERATOR + y];
}

Habitat.prototype.getCells = function() {
  return this.cells;
}

Habitat.prototype.removeCell = function(x, y) {
  delete this.cells[x + Habitat.SEPERATOR + y];
}

Habitat.prototype.removeCells = function(cells) {
  for(var x=0,len=cells.length;x<len;x++){
    this.removeCell(cells[x][0], cells[x][1]);
  }
}

Habitat.prototype.reset = function() {
  this.cells = {};
}

Habitat.prototype.getSpaceAroundCells = function() {
  var spaceAroundCells = {};
  for(var cell in this.cells){
    var coord = cell.split(Habitat.SEPERATOR),
        x=parseInt(coord[0]),
        y=parseInt(coord[1])
    for(var bottom=y-1, top=y+1; bottom <= top; bottom++){
      for(var left=x-1, right=x+1; left <= right; left++){
        spaceAroundCells[left + Habitat.SEPERATOR + bottom] = true;
      }
    }
  }
  return spaceAroundCells
}


Habitat.prototype.getNeighborCells = function(x, y) {
  var neighborCells = 0;
  for(var bottom=y-1, top=y+1; bottom <= top; bottom++){
    for(var left=x-1, right=x+1; left <= right; left++){
      if(this.getCell(left, bottom) && !(x == left && y == bottom)){
        neighborCells++
      }
    }
  }
  return neighborCells
}

Habitat.prototype.evolve = function() {
  var spaceAroundCells = this.getSpaceAroundCells(),
      addCells = [],
      removeCells = []

  for(var cell in spaceAroundCells){

    var cellCoords = cell.split(Habitat.SEPERATOR),
        cellCoordX = parseInt(cellCoords[0]),
        cellCoordY = parseInt(cellCoords[1]),
        neighborCells = this.getNeighborCells(cellCoordX, cellCoordY)
    if(neighborCells < 2 && this.getCell(cellCoordX, cellCoordY)){
      removeCells.push(cellCoords)
    } else if (neighborCells == 3 && !this.getCell(cellCoordX, cellCoordY)){
      addCells.push(cellCoords)
    } else if (neighborCells > 3 && this.getCell(cellCoordX, cellCoordY)){
      removeCells.push(cellCoords)
    }

  }
  this.removeCells(removeCells);
  this.addCells(addCells);

  return {addCells:addCells, removeCells:removeCells}
}