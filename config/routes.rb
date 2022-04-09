Rails.application.routes.draw do
  
  resources :exercises
  resources :routines
  resources :users
  get "/exercises", to: "exercises#index"
  get "/current_user", to: "users#show"
  post "/login", to: "sessions#login"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#logout"



  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
