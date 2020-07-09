FactoryBot.define do
  factory :user do
    firstname { 'John' } 
    lastname { 'Doe' }
    username { 'johndoe' }
    email { "user#{rand(1000)}@factory.com" }
    password { 'test123' }
    age { '20' }
    role { 2 }
  end
end