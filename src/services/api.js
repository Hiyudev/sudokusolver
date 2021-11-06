export function imageInput(base64) {
  return new Promise((res, rej) => {
    const fetchheaders = new Headers();
    fetchheaders.append('Content-type', 'application/json');

    const options = {
      method: 'POST',
      headers: fetchheaders,
      mode: 'cors',
      body: {code: base64},
    };

    fetch('https://sudoku-solver-fast.herokuapp.com/image', options).then(
      async (response) => {
        const content = await response.json();
        if (content.board) {
          return res(content);
        } else if (content.detail) {
          return rej(content.detail);
        } else {
          return rej('Server error');
        }
      }
    );
  });
}

export function solveInput(grid) {
  return new Promise((res, rej) => {
    const fetchheaders = new Headers();
    fetchheaders.append('Content-type', 'application/json');

    const options = {
      method: 'POST',
      headers: fetchheaders,
      mode: 'cors',
      body: {table: grid},
    };

    fetch('https://sudoku-solver-fast.herokuapp.com/solve', options).then(
      async (response) => {
        const content = await response.json();
        if (content.board) {
          return res(content.board);
        } else if (content.detail) {
          return rej(content.detail);
        } else {
          return rej('Server error');
        }
      }
    );
  });
}
