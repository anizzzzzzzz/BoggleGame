require 'test_helper'

class HomepageHelperTest < ActionView::TestCase
  test "check if the generated boggle items have 4x4 dimension" do
    dim = 4
    boggle_items = generate_boogle_board_random
    assert_equal dim, boggle_items.length # check row
    assert_equal dim, boggle_items[0].length # check col
  end

  test "check if the generated boggle items have custom dimension" do
    dim = 6
    boggle_items = generate_boogle_board_random(dim)
    assert_not_nil boggle_items
    assert_equal dim, boggle_items.length
    assert_equal dim, boggle_items[0].length
  end

  test "check if the generated boggle items via the hasbro dice have 4x4 dimension" do
    dim = 4
    boggle_items = generate_boggle_board_hasbro
    assert_equal dim, boggle_items.length # check row
    assert_equal dim, boggle_items[0].length # check col
  end

  test "check if generated boggle items is random" do
    # This test is to test whether the each row of boggle board is randomly generated or not.
    # Will check each row of two generated boggle board.
    dim = 4
    boggle_items_1 = generate_boggle_board_hasbro.map{|row| row.join('')}
    boggle_items_2 = generate_boggle_board_hasbro.map{|row| row.join('')}

    (0...dim).each{ |index| assert_not_equal boggle_items_1[index], boggle_items_2[index]}
  end
end
