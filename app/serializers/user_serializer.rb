class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :image, :bio, :is_private, :password_digest
  has_many :routines
  has_many :exercises
end
