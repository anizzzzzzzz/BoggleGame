require_relative "../../app/service/board/boggle_generator"
require_relative "../../app/service/board/boggle_solver"
# require_relative "../../app/service/trie/trie"

class HomepageController < ApplicationController
  DIMENSION = 4

  def index
  end

  def init_boggle
    @boggle_generator = BoggleGenerator.new
    render json: {"items":@boggle_generator.generate_boggle_board_hasbro(DIMENSION)}
  end

  def check_if
    word = params[:word]
    board = params[:board]
    if word.empty?
      render json: {"message":"error"}
    else
      trie = Trie.new
      boggle_solver = BoggleSolver.new
      if boggle_solver.check_if_on_board(board, word, DIMENSION, nil, Set.new)
        if trie.add_word_to_trie(word)
          render json: {"message":"yes"}
        else
          render json: {"message":"no"}
        end
      end
    end
  end
end
