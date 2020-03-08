class BoggleGenerator < ApplicationService
  # DICE_CONFIG = %w(LRYTTE VTHRWE EGHWNE SEOTIS ANAEEG IDSYTT OATTOW MTOICU AFPKFS XLDERI HCPOAS ENSIEU YLDEVR ZNRNHL NMIQHU OBBAOJ)
  DICE_CONFIG = %w(AAEEGN ABBJOO ACHOPS AFFKPS AOOTTW CIMOTU DEILRX DELRVY DISTTY EEGHNW EEINSU EHRTVW EIOSST ELRTTY HIMNUQ HLNNRZ)

  # Initializes a random 4-by-4 board, by random picker alphabet.
  def generate_boogle_board_random(dim=4)
    chars = ("A".."Z").to_a # to array
    (0...dim).map{
      (0...dim).map {
        chars[rand(chars.length - 1)] # will append the alphabet in matrix
        # rand_alpha = chars[rand(chars.length - 1)]
        # if rand_alpha == 'Q'
        #   'Qu'
        # else
        #   rand_alpha
        # end
      }
    }
  end

  # Initializes a random 4-by-4 board, by rolling the Hasbro dice.
  def generate_boggle_board_hasbro(dim=4)
    shuffled = DICE_CONFIG.shuffle!()
    # shuffled = shuffled.shuffle!()
    (0...dim).map do |i|
      (0...dim).map{ |j|
        letters = shuffled[dim * i + j]
        letters[rand(letters.length)] # will append the alphabet in matrix
        # random_char = letters[rand(letters.length)]
        # if random_char == 'Q'
        #   'Qu'
        # else
        #   random_char
        # end
      }
    end
  end
end
