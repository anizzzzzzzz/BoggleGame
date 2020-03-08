# require_relative '../trie/trie'

class BoggleSolver < ApplicationService
  DICTIONARY_FILEPATH = Rails.root.join('dictionary','skill_dictionary.txt')

  # attr_reader :trie # getter method

  # def initialize()
  #   self.initialize_trie
  # end

  ############### Trie Processes #################
  # def initialize_trie
  #   puts 'called trie'
  #   file = File.open(DICTIONARY_FILEPATH)
  #   skills = file.readlines.map { |line| line.gsub("\n","") }
  #   file.close
  #   @trie = Trie.new(skills)
  #   @trie.init
  #   @trie
  # end

  # def check_if_word_in_dictionary(word)
  #   @trie.check_if_present(word)
  # end
  ############### Trie Processes End #################

  ############### Boggle Solver #################
  def preprocess_board(board)
    dim = board.length
    board_map = {}
    (0...dim).each do |i|
      (0...dim).each do |j|
        if board_map.include?(board[i][j])
          board_map[board[i][j]].append(i * dim + j)
        else
          board_map[board[i][j]] = [i * dim + j]
        end
      end
    end
    board_map
  end

  def isvalid(i, j, curr_row, curr_col)
    (i>=0 && i<dim && j>=0 && j<dim && !(i==curr_row && j==curr_col))
  end

  def get_neighbors(index, dim)
    row = index / dim
    col = index % dim
    neighbors = Set.new
    ((row-1)...(row+2)).each do |i|
      ((col-1)...(col+2)).each do |j|
        if self.isvalid(i, j, row, col)
          neighbors << (i * dim + j)
        end
      end
    end
    neighbors
  end

  def check_if_on_board(board_map, word, dim, old_pos, poslist)
    if word.length == 0
      return true
    end
    if !board_map.include?(word[0])
      false
    else
      if old_pos == nil
        board_map[word[0]].each { |pos|
          poslist << pos
          if is_on_board(board_map, word[1..word.length], dim, pos, poslist)
            return true
          else
            poslist.delete(pos)
          end
        }
      else
        board_map[word[0]].each { |pos|
          if get_neighbors(old_pos, dim).include?(pos) && !poslist.include?(pos)
            poslist << pos
            if is_on_board(board_map, word[1..word.length], dim, pos, poslist)
              return true
            else
              poslist.delete(pos)
            end
          end
        }
      end
    end
    false
  end
  ############### Boggle Solver End #################
end