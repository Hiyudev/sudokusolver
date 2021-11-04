export function imageInput(base64) {
  return new Promise((res, rej) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({code: base64}),
    };

    fetch('http://127.0.0.1:8000/image', options)
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

    fetch('http://127.0.0.1:8000/solve', options)
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
