class User < ApplicationRecord

  has_many :routines
  has_many :exercises, through: :routines
end
