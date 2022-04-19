class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :image, :bio, :is_private
  
  has_many :routines
  has_many :exercises
  has_many :calendar_dates
end
