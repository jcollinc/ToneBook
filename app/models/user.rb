class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true, if: :should_validate?
  validates :password, presence: true, if: :should_validate?
  validates :name, presence: true

  has_many :routines, dependent: :destroy
  has_many :exercises, through: :routines

  def should_validate?
    new_record?
  end

end
