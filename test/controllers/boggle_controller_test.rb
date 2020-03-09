require 'test_helper'
require 'json'

class BoggleControllerTest < ActionDispatch::IntegrationTest
  DIMENSION = 4
  BOGGLE_DICE = [%w(N T L S), %w(I H M E), %w(O V Y S), %w(B L W E)].freeze

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

  test "validate when user submits an empty string" do
    post '/check', as: :json, params: {word:"", board:BOGGLE_DICE, submittedWords:[]}
    assert_response :success
    response = JSON.parse(@response.body)
    assert_not response['error']
    assert_equal 0, response['score']
    assert_equal "Empty String!!", response['message']
  end

  test "validate when user submits a word not present in boggle pattern" do
    post '/check', as: :json, params: {word:"NOTINBOGGLE", board:BOGGLE_DICE, submittedWords:[]}
    assert_response :success
    response = JSON.parse(@response.body)
    assert response['error']
    assert_equal 0, response['score']
    assert_equal "Cannot form this word from the given pattern.", response['message']
  end

  test "validate when user submits a word present in boggle pattern but not in dictionary" do
    post '/check', as: :json, params: {word:"NIHVY", board:BOGGLE_DICE, submittedWords:[]}
    assert_response :success
    response = JSON.parse(@response.body)
    assert response['error']
    assert_equal 0, response['score']
    assert_equal "No such word.", response['message']
  end

  test "validate when user submits a already submitted word" do
    post '/check', as: :json, params: {word:"YES", board:BOGGLE_DICE, submittedWords:["HIT","YES"]}
    assert_response :success
    response = JSON.parse(@response.body)
    assert response['error']
    assert_equal 0, response['score']
    assert_equal "Duplicate!!", response['message']
  end

  test "validate when user submits an appropriate word" do
    word = "HIT"
    post '/check', as: :json, params: {word:word, board:BOGGLE_DICE, submittedWords:[]}
    assert_response :success
    response = JSON.parse(@response.body)
    assert_not response['error']
    assert_equal word.length, response['score']
  end

end
