require 'test_helper'
require_relative '../../../app/service/board/boggle_checker'

class BoggleCheckerTest < ActiveSupport::TestCase
  DIM = 4
  BOGGLE_DICE = [["N","T","L","S"],["I","H","M","E"],["O","V","Y","S"],["B","L","W","E"]]

  test "check if board checker initialization is successful" do
    boggle_solver = BoggleChecker.new(BOGGLE_DICE)
    assert_not_nil boggle_solver.board_map
  end

  test "check if board checker accepts adjacent row items" do
    word = 'ntls'.upcase
    boggle_solver = BoggleChecker.new(BOGGLE_DICE)
    assert boggle_solver.check_if_on_board(word, DIM, nil, Set.new)
  end

  test "check if board checker accepts adjacent col items" do
    word = 'niob'.upcase
    boggle_solver = BoggleChecker.new(BOGGLE_DICE)
    assert boggle_solver.check_if_on_board(word, DIM, nil, Set.new)
  end

  test "check if board checker accepts adjacent diagonal items" do
    word = 'nhye'.upcase
    boggle_solver = BoggleChecker.new(BOGGLE_DICE)
    assert boggle_solver.check_if_on_board(word, DIM, nil, Set.new)
  end

  test "check if board checker accepts adjacent zigzag items" do
    word = 'nhtlmvywe'.upcase
    boggle_solver = BoggleChecker.new(BOGGLE_DICE)
    assert boggle_solver.check_if_on_board(word, DIM, nil, Set.new)
  end
end
