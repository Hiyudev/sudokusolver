export function imageInput(base64) {
  return new Promise((res, rej) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({code: base64}),
    };

    fetch('https://sudoku-solver-fast.herokuapp.com/image', options)
      .then(async (response) => {
        const content = await response.json();
        if(content.board) {
          return res(content);
        } else if (content.detail) {
          return rej(content.detail);
        } else {
          return rej('Server error');
        }
      })
  })
}

export function solveInput(grid) {
  return new Promise((res, rej) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({table: grid}),
    };

    fetch('https://sudoku-solver-fast.herokuapp.com/solve', options)
      .then(async (response) => {
        const content = await response.json();
        if(content.board) {
          return res(content.board);
        } else if (content.detail) {
          return rej(content.detail)
        } else {
          return rej('Server error');
        }
      })
  });
}