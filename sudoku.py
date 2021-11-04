class SudokuError(Exception):
    pass


class Sudoku:
    '''
    Class for solving and validating the sudoku board
    '''
    def __init__(self, list_board):
        self.board = list_board
        self.board_x = len(list_board[0])
        self.board_y = len(list_board)

        # Check the length of board and if the numbers are valid
        if not self.check(list_board):
            raise SudokuError("Board length doesn't match the given values")

    def __str__(self) -> str:
        return str(self.board)


    def check(self, list_board: 'list[list[int]]') -> bool:
        """
        Check if all numbers of `list_board` are valid
        """
        for y in range(self.board_y):
            for x in range(self.board_x):
                if self.board[y][x] != 0 and not self.isValid(self.board[y][x], (y, x)):
                    raise SudokuError(f"Board has given invalid numbers")
                else:
                    continue

        return len(list_board[0]) == 9 and len(list_board) == 9

    def solve(self) -> bool:
        # There is empty space on the suoku ?
        find = self.findEmpty()
        if find:  # if yes
            y, x = find
        else:  # if no
            return True

        #               1~9
        for i in range(1, 10):
            # Check if its valid to put the number
            if self.isValid(i, (y, x)):
                # Put a number
                self.board[y][x] = i

                # Check if has possibility of keep going
                if self.solve():
                    return True

                # If not, reset to 0, and back to the previous
                self.board[y][x] = 0

        # Se não conseguir achar um número para o quadrado
        # retorna falso, para que o quadrado anterior procure um número melhor
        return False

    def isValid(self, number, position):
        # Check y
        y_valid = self.isYValid(number, position)

        # Check x
        x_valid = self.isXValid(number, position)

        # Check quadrant
        b_valid = self.isBoxvalid(number, position)

        return x_valid and y_valid and b_valid

    def isBoxvalid(self, number, position):
        y, x = position
        box_x = x // 3
        box_y = y // 3
        for i in range(box_y*3, box_y*3 + 3):
            for j in range(box_x * 3, box_x*3 + 3):
                if self.board[i][j] == number and (i, j) != position:
                    return False
        return True

    def isYValid(self, number, position):
        y, x = position
        for i in range(self.board_x):
            if x != i and self.board[y][i] == number:
                return False
        return True

    def isXValid(self, number, position):
        y, x = position
        for i in range(self.board_y):
            if y != i and self.board[i][x] == number:
                return False
        return True

    def findEmpty(self):
        for y in range(self.board_y):
            for x in range(self.board_x):
                if self.board[y][x] == 0:
                    return (y, x)

        return None
