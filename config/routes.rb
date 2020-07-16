Rails.application.routes.draw do
  get 'welcome/home'
  get '/app', to: 'welcome#app', as: 'app'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :user
  get '*page', to: 'directory#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root to: 'welcome#home'
  resources :users
end
