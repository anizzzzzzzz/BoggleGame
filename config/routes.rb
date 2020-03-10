Rails.application.routes.draw do
  root "boggle#index"

  get 'boggle/index'
  get '/init-boggle', to: 'boggle#init_boggle'
  post '/check', to: 'boggle#check_word'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
