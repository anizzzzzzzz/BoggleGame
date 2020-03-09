require_relative "../../app/service/board/boggle_generator"
require_relative "../../app/service/board/boggle_checker"
require_relative "../../app/service/trie/trie_service"

class BoggleController < ApplicationController
  DIMENSION = 4
  before_action :load_trie, except: :init_boggle

  def init_boggle
    @boggle_generator = BoggleGenerator.new
    render json: {"items":@boggle_generator.generate_boggle_board_hasbro(DIMENSION)}
  end

  def check_word
    word = params[:word].upcase
    board = params[:board]
    already_submitted = params[:submittedWords]
    if word.empty?
      render json: {"word":word, "score":0, error:false, "message":"Empty String!!"}
      return
    else
      boggle_solver = BoggleChecker.new(board)
      if boggle_solver.check_if_on_board(word, DIMENSION, nil, Set.new)
        if already_submitted.include?(word)
          render json: {"word":word, "score":0, error:true, "message":"Duplicate!!"}
          return
        end
        if @@trie.check_if_present(word)
          render json: {"word":word, "score":word.length, error:false, "message":""}
          return
        else
          render json: {"word":word, "score":0, error:true, "message":"No such word."}
          return
        end
      else
        render json: {"word":word, "score":0, error:true, "message":"Cannot form this word from the given pattern."}
        return
      end
    end
  end

  private
  def load_trie
    @@trie ||= TrieStruct.new('')
  end
end
