Rails.application.routes.draw do
  root "homepage#index"

  get 'homepage/index'
  get '/init-boggle', to: 'homepage#init_boggle'
  post '/check', to: 'homepage#check_if'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
