Rails.application.routes.draw do
  devise_for :user
  scope "(:locale)", locale: /en|hi/ do
    root to: 'welcome#home'
    resources :users
  end
end
