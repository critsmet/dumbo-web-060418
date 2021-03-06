class User < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, maximum: 100 }
end
