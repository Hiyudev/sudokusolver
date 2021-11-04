from image.predictor import Predictor
from image.processor import Processor, ProcessorError
from sudoku import Sudoku, SudokuError
from image.converter import byte_to_image

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SudokuModel(BaseModel):
    table: list


class ImageModel(BaseModel):
    code: str


@app.post("/solve")
def getSolution(sudoku: SudokuModel) -> Sudoku:
    try:
        s = Sudoku(sudoku.table)
        s.solve()
    except SudokuError as E:
        error = E.args[0]
        raise HTTPException(status_code=400, detail=error)

    return s


@app.post("/image")
def imageSudoku(image: ImageModel) -> dict:
    try:
        bytes_str = image.code
        img = byte_to_image(bytes_str)
        proc = Processor(img)
        pred = Predictor(proc.final)
        return {"board": pred.final}
    except ProcessorError as E:
        error = E.args[0]
        raise HTTPException(status_code=400, detail=error)
