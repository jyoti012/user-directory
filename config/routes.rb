Rails.application.routes.draw do
  devise_for :user
  root to: 'welcome#home'
  resources :users
  # match '*path', to: 'welcome#home', via: :all
end
