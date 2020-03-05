class HomepageController < ApplicationController
  def index
  end

  def init_boggle
    render json: {"items":helpers.generate_boogle_matrix}
  end
end
