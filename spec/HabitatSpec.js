describe('Habitat',function(){
  var habitat;
  beforeEach(function(){
    habitat = new Habitat();
  })

  describe('#evolve',function(){
    beforeEach(function(){
      habitat.addCell(1,0)
      habitat.addCell(1,1)
      habitat.addCell(1,2)
    })

    it('should remove cell if neighbors less than 2',function (){
      habitat.evolve()
      expect(habitat.getCell(1,0)).toBeUndefined()
    })

    it('should remove cell if neighbors more than 3', function(){
      habitat.addCell(0,0)
      habitat.addCell(0,1)
      habitat.addCell(0,2)
      habitat.evolve()
      expect(habitat.getCell(1,1)).toBeUndefined()
    })

    it('should add cell if neighbors equals 3',function(){
      habitat.evolve()
      expect(habitat.getCell(0,1)).toBeDefined()
    })

    it('should transform to next gen', function(){
      habitat.evolve()
      expect(habitat.getCell(0,1)).toBeDefined()
      expect(habitat.getCell(1,1)).toBeDefined()
      expect(habitat.getCell(2,1)).toBeDefined()
      expect(habitat.getCell(1,0)).toBeUndefined()
      expect(habitat.getCell(1,2)).toBeUndefined()
    });
  })

  describe('#addCell',function(){

    it('should add a Cell', function() {
      habitat.addCell(1,0)
      expect(habitat.getCell(1,0)).toBeDefined()
    });
  });

  describe('#getSpaceAroundCells',function(){
    it('should get neighbor spaces', function() {
      habitat.addCell(1,0)
      var keys = [
        '0;-1','1;-1','2;-1',
        '0;0' ,'1;0' ,'2;0',
        '0;1' ,'1;1' ,'2;1'
      ]
      expect(_.keys(habitat.getSpaceAroundCells())).toEqual(keys)
    });
  })

  describe('#removeCell',function(){
    it('should remove a Cell', function() {
      habitat.addCell(1,0)
      habitat.removeCell(1,0)
      expect(habitat.getCell(1,0)).toBeUndefined()
    });
  })
  describe('#reset',function(){
    it('should clear cells', function() {
      habitat.addCell(1,0)
      habitat.reset()
      expect(habitat.getCell(1,0)).toBeUndefined()
    });
  })
  describe('#getNeigbors',function(){
    it('should get two neighbors of cell 1,1 ',function (){
      habitat.addCell(1,0)
      habitat.addCell(1,1)
      habitat.addCell(1,2)
      expect(habitat.getNeighborCells(1,1)).toBe(2)
    })
    it('should get tree neighbors of cell 0,1 ',function (){
      habitat.addCell(1,0)
      habitat.addCell(1,1)
      habitat.addCell(1,2)
      expect(habitat.getNeighborCells(0,1)).toBe(3)
    })
  })
  describe('#getCell', function() {
    it('should return a cell of a specific position', function() {
       habitat.addCell(1, 0);
       expect(habitat.getCell(1, 0)).toBeDefined()
    });

  });
})