function Dec_To_Bin(rules_index) {
  //Converting Decimal to 8-bit Binary
  bin_index = Number(rules_index).toString(2);
  while (bin_index.length < 8)
    bin_index = '0' + bin_index;
    
  return bin_index;
}

function setup() {
  //Graphics Settings
  colorMode(HSL, 360)
  noStroke();
  frameRate(60);
  
  //Canvas Settings
  let pageBody = select('body');
  let pageHeight = pageBody.height;
  if (windowWidth >= 800) {
    let canva = createCanvas(windowWidth - 80, pageHeight);
    canva.position(40, 0);
    canva.style('z-index', -1);
  }
  else {
    noLoop();
    remove();
  }
  
  //Cells Settings and Setup
  cell_size = 10;
  rows = 100/cell_size;
  cols = height/cell_size;
  cells = new Array(rows);
  for (let i = 0; i < rows; i++) {
    if ((i >= (rows/2) - 1) && (i < rows/2))
      cells[i] = 1;
    else
      cells[i] = 0;
  }
  rules = Dec_To_Bin(57);
  y = 0;
}

function draw() {
  for (let i = 0; i < rows; i++) {
    //fill(1 + (cells[i])*360);
    if (cells[i] == 0)
      noFill();
    else
      fill(0, 0, 288);
    square(i*cell_size, y*cell_size, cell_size);
  }

  for (let i = rows - 1; i >= 0; i--) {
    //fill(1 + (cells[i])*360);
    if (cells[i] != 0)
      noFill();
    else
      fill(0, 0, 288);
    square(i*cell_size + windowWidth - 180, y*cell_size, cell_size);
  }
  
  new_cells = new Array(rows);
  for (let i = 0; i < rows; i++) {
    new_cells[i] = 0;
  }
  
  for (let i = 0; i < rows; i++) {
    if (cells[max(i - 1, 0)] == 0) {
      if (cells[i] == 0) {
        if (cells[(i + 1) % rows] == 0)
          new_cells[i] = rules[7];
        else
          new_cells[i] = rules[6];
      }
      else {
        if (cells[(i + 1) % rows] == 0)
          new_cells[i] = rules[5];
        else
          new_cells[i] = rules[4];
      }
    }
    else {
      if (cells[i] == 0) {
        if (cells[(i + 1) % rows] == 0)
          new_cells[i] = rules[3];
        else
          new_cells[i] = rules[2];
      }
      else {
        if (cells[(i + 1) % rows] == 0)
          new_cells[i] = rules[1];
        else
          new_cells[i] = rules[0];
      }
    }
  }
  
  cells = new_cells;
  y++;
  if(frameCount > cols)
    noLoop();
}