Rails.application.routes.draw do
  get 'welcome/home'
  get '/add', to: 'welcome#add', as: 'add'
  get '/view/:id', to: 'welcome#view', as: 'view'
  get '/edit/:id', to: 'welcome#edit', as: 'edit'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :user
  root to: 'welcome#home'
  resources :users
end
