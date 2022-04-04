class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :image
end
