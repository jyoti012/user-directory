class User < ApplicationRecord
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :username, presence: true
  validates :email, presence: true
  validates :age, presence: true
end
