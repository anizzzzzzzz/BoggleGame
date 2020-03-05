require 'test_helper'
require 'json'

class HomepageControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get homepage_index_url
    assert_response :success
  end

  test "check if boggle returns success response code" do
    get '/init-boggle'
    assert_response :success
  end


  test "check if the response is json type" do
    get '/init-boggle'
    response_content_type = @response.content_type.to_s.downcase.gsub(' ','')
    assert_equal 'application/json;charset=utf-8', response_content_type
  end

  test "check if init-boggle method's response contains items keyword" do
    get '/init-boggle'
    response = JSON.parse(@response.body)
    assert response.key?("items")
  end

  test "check if response satisfies the items dimensionality" do
    get '/init-boggle'
    response = JSON.parse(@response.body)
    assert response.key?("items")

    boggle_items = response['items']
    assert_not_nil boggle_items
    assert_equal 4, boggle_items.length
    assert_equal 4, boggle_items[0].length
  end
end
