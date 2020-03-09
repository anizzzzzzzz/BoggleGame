class BoggleChecker < ApplicationService
   attr_reader :board_map

   def initialize(board_dice)
     @board_dice = board_dice
     @board_map = preprocess_board
   end

   def check_if_on_board(word, dim, old_pos, poslist)
     if word.length == 0
       return true
     end
     if !@board_map.include?(word[0])
       false
     else
       if old_pos == nil
         @board_map[word[0]].each { |pos|
           poslist << pos
           if check_if_on_board(word[1..word.length], dim, pos, poslist)
             return true
           else
             poslist.delete(pos)
           end
         }
       else
         @board_map[word[0]].each { |pos|
           if get_neighbors(old_pos, dim).include?(pos) && !poslist.include?(pos)
             poslist << pos
             if check_if_on_board(word[1..word.length], dim, pos, poslist)
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

   private
   def preprocess_board
     dim = @board_dice.length
     board_map = {}
     (0...dim).each do |i|
       (0...dim).each do |j|
         if board_map.include?(@board_dice[i][j])
           board_map[@board_dice[i][j]].append(i * dim + j)
         else
           board_map[@board_dice[i][j]] = [i * dim + j]
         end
       end
     end
     board_map
   end

   def isvalid(i, j, curr_row, curr_col, dim)
     (i>=0 && i<dim && j>=0 && j<dim && !(i==curr_row && j==curr_col))
   end

   def get_neighbors(index, dim)
     row = index / dim
     col = index % dim
     neighbors = Set.new
     ((row-1)...(row+2)).each do |i|
       ((col-1)...(col+2)).each do |j|
         if isvalid(i, j, row, col, dim)
           neighbors << (i * dim + j)
         end
       end
     end
     neighbors
   end

end