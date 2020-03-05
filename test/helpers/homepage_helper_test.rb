require 'test_helper'

class HomepageHelperTest < ActionView::TestCase
  test "check if the generated boggle items have 4x4 dimension" do
    dim = 4
    boggle_items = generate_boogle_matrix
    assert_equal dim, boggle_items.length # check row
    assert_equal dim, boggle_items[0].length # check col
  end

  test "check if the generated boggle items have custom dimension" do
    dim = 6
    boggle_items = generate_boogle_matrix(dim)
    assert_not_nil boggle_items
    assert_equal dim, boggle_items.length
    assert_equal dim, boggle_items[0].length
  end
end
