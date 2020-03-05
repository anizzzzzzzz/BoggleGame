module HomepageHelper

  def generate_boogle_matrix(dim=4)
    chars = ("A".."Z").to_a # to array
    (0...dim).map{
      (0...dim).map {
        rand_alpha = chars[rand(chars.length - 1)]
        if rand_alpha == 'Q'
          'Qu'
        else
          rand_alpha
        end
      }
    }
  end

end
