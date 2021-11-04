import styled from 'styled-components';
import {useDropzone} from 'react-dropzone';
import {imageInput, solveInput} from 'src/services/api';
import {Fragment, useCallback, useRef, useState} from 'react';

import {Button, CorrectButton} from '@components/Button';
import Model from '@components/Model';
import Card from '@components/Card';
import Slot from '@components/Slot';
import Table from '@components/Table';

import {useOnClickOutside} from '@hooks/ClickOutside';

import Link from 'next/link';
import Image from 'next/image';

import logo from '@public/icons/logo.svg';
import fingersudoku from '@public/icons/FingerSudoku.svg';
import imageplaceholder from '@public/icons/Image.svg';
import Menu from '@components/Menu';
import Option from '@components/Option';

const Logo = () => {
  return (
    <Link href={'/'}>
      <a>
        <Image src={logo} />
      </a>
    </Link>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
`;

const Body = styled.div`
  background-color: ${({theme}) => theme.main.dark};
  color: ${({theme}) => theme.main.color};
  min-height: 100vh;
`;


export default function Solver() {
  const initialState = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [grid, setGrid] = useState(initialState);
  const [request, setRequest] = useState(false);
  const [solved, setSolved] = useState([]);
  const [error, setError] = useState('');
  const [hover, setHover] = useState(false);

  const modelRef = useRef(null);
  const handleModel = () => setError('');
  useOnClickOutside(modelRef, handleModel);

  const handleUpdateGrid = (el) => {
    const [y, x] = el.target.attributes[0].value.split('');

    const cgrid = [...grid];
    const value = cgrid[y][x] + 1;

    cgrid[y][x] = value > 9 ? 0 : value;
    setGrid(cgrid);
  };

  const resetGrid = () => {
    setGrid([...initialState]);
  };

  const resetSolved = () => {
    setSolved([]);
  };

  const solveGrid = () => {
    setRequest(true);

    solveInput(grid)
      .then((res) => {
        setSolved([...res]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setRequest(false);
      });
  };

  const onDragOver = () => setHover(true);
  const onDragLeave = () => setHover(false);
  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    setHover(false);

    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onabort = () => {
      setLoading(false);
    };
    reader.onerror = () => {
      setLoading(false);
      setError('Error on loading the image');
    };
    reader.onload = () => {
      const base64String = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');

      imageInput(base64String)
        .then((res) => {
          const board = res.board;
          if (board) {
            setGrid([...board]);
            setSelected('image');
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    onDragOver,
    onDragLeave,
    multiple: false,
  });
  const manualSelect = () => setSelected('manual');
  const resetSelect = () => setSelected('');

  function TableError({hidden}) {
    return (
      <Model hidden={hidden}>
        <Card ref={modelRef}>
          <h2>Um erro aconteceu</h2>

          <p>{error}</p>
        </Card>
      </Model>
    );
  }

  const unsolvedSlots = grid.map((row, y) => {
    return row.map((value, x) => {
      const cordinates = `${y}${x}`;
      const slotvalue = value === 0 ? ' ' : value;
      return (
        <Slot onClick={handleUpdateGrid} key={cordinates}>
          <span data-cord={cordinates}>{slotvalue}</span>
        </Slot>
      );
    });
  });

  const solvedSlots = solved.map((row, y) => {
    return row.map((value, x) => {
      const cordinates = `${y}${x}`;
      const slotvalue = value === 0 ? ' ' : value;
      const isoriginalNumber = grid[y][x] === solved[y][x];

      return (
        <Slot original={isoriginalNumber} key={cordinates}>
          <span>{slotvalue}</span>
        </Slot>
      );
    });
  });

  const Sudoku = () => (
    <Table>
      <Table.Header>
        <Logo />

        <Fragment>
          {solved.length === 0 ? (
            <Buttons>
              <Button onClick={resetSelect}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </Button>
              <CorrectButton disabled={request} onClick={solveGrid}>
                Solve
              </CorrectButton>
              <Button disabled={request} onClick={resetGrid}>
                Reset
              </Button>
            </Buttons>
          ) : (
            <Buttons>
              <Button onClick={resetSolved}>Back</Button>
            </Buttons>
          )}
        </Fragment>
      </Table.Header>

      <Table.Grid>
        {solved.length === 0 ? unsolvedSlots : solvedSlots}
      </Table.Grid>
    </Table>
  );

  return (
    <Body>
      <TableError hidden={error.length === 0} />

      {selected ? (
        <Sudoku />
      ) : (
        <Menu>
          <Option disabled={loading} onClick={manualSelect}>
            <Option.Img src={fingersudoku} width={100} height={100} />

            <p>Add numbers manually</p>
          </Option>
          or
          <Option
            bordered
            hover={hover}
            disabled={loading}
            {...getRootProps({refKey: 'innerRef'})}
          >
            <input {...getInputProps()} />
            <Option.Img src={imageplaceholder} width={100} height={100} />
            <p>Drag or select an image containing sudoku</p>
          </Option>
        </Menu>
      )}
    </Body>
  );
}
