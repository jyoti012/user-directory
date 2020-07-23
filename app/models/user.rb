class User < ApplicationRecord
  include ActiveModel::Serializers::JSON
  Rails.application.routes.default_url_options[:host] = "localhost:3000"
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable

  has_one_attached :avatar
  validates :firstname, presence: true, length: { minimum: 2 }
  validates :lastname, presence: true, length: { minimum: 2 }
  validates :username, presence: true, length: { maximum: 8 }
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :age, presence: true, numericality: true

  def attributes
    {
      'id' => nil,
      'firstname' => nil,
      'lastname' => nil,
      'username' => nil,
      'email' => nil,
      'age' => nil,
      'updated_at' => nil,
      'created_at' => nil,
      'attachment_url' => nil
    }
  end

  def attachment_url
    Rails.application.routes.url_helpers.rails_representation_url(
    avatar.variant(resize_to_limit: [500, 500]).processed, only_path: false
  )
  end
end
