class User < ApplicationRecord

  devise :database_authenticatable, :registerable,
         :recoverable, :validatable

  has_one_attached :avatar
  validates :firstname, presence: true, length: { minimum: 2 }
  validates :lastname, presence: true, length: { minimum: 2 }
  validates :username, presence: true, length: { maximum: 8 }
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :age, presence: true, numericality: true
end
