Rails.application.routes.draw do
  root "homepage#index"

  get 'homepage/index'
  get '/init-boggle', to: 'boggle#init_boggle'
  post '/check', to: 'boggle#check_word'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
