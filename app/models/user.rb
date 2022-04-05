class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true

  has_many :routines, dependent: :destroy
  has_many :exercises, through: :routines
end
