Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :user
  get '*page', to: 'directory#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root to: 'directory#index'
  resources :users
end
